import { useState, useEffect } from 'react'

const AutomobileList = () => {
    const [automobile, setAutomobile] = useState([])

    const getdata = async () => {
        const response = await fetch('	http://localhost:8100/api/automobiles/')
        if (response.ok) {
            const data = await response.json()
            setAutomobile(data.autos)
        }
    }
    useEffect(() => {
        getdata()
    }, [])

    const handleDelete = async (e) => {
      const url = `http://localhost:8100/api/manufacturers/${e.target.id}/`

      const fetchConfigs = {
          method: "Delete",
          headers: {
              "Content-Type": "application/json"
          }
      }
      const response = await fetch(url, fetchConfigs)
      const data = await response.json()

      setAutomobile(automobile.filter(technician => String(technician.id) !== e.target.id))
  }

    return(

      <>
      <div className='row'>
          <div className='offset-3 col-6'>
              <div className='shadow p-4 mt-4'>
                  <h1 className='text-center'>Automobile List</h1>
        <table className="table table-striped table-responsive-lg">
      <thead>
        <tr>
          <th>Vin</th>
          <th>Color</th>
          <th>Year</th>
          <th>Model</th>
          <th>Manufacturer</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {automobile.map(vehicle => {
          return (
            <tr key={vehicle.id}>
              <td>{vehicle.vin}</td>
              <td>{vehicle.color}</td>
              <td>{vehicle.year}</td>
              <td>{vehicle.model.name}</td>
              <td>{vehicle.model.manufacturer.name}</td>
              <td><button onClick={handleDelete} id={vehicle.id} className="btn btn-danger">Delete</button></td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
    </div>
    </div>
    </>
    )
}
export default AutomobileList
