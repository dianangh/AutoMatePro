import { useState, useEffect } from 'react'

const TechnicianList = () => {
    const [technician, setTechnician] = useState([])

    const getdata = async () => {
        const response = await fetch('http://localhost:8080/api/technician/')
        if (response.ok) {
            const data = await response.json()
            setTechnician(data.technicians)
        }
    }
    useEffect(() => {
        getdata()
    }, [])

    const handleDelete = async (e) => {
        const url = `http://localhost:8080/api/technician/${e.target.id}`

        const fetchConfigs = {
            method: "Delete",
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(url, fetchConfigs)
        const data = await response.json()

        setTechnician(technician.filter(technician => String(technician.id) !== e.target.id))
    }

    return(
        <>
        <div className='row'>
            <div className='offset-3 col-6'>
                <div className='shadow p-4 mt-4'>
                    <h1 className='text-center'>Technician</h1>


        <table className="table table-striped">
        <thead>
            <tr>
            <th>Technician Name</th>
            <th>Employee Number</th>
            <th>Lay off</th>
            </tr>
        </thead>
        <tbody>
        {technician.map(tech => {
        return (
            <tr key={tech.id}>
            <td>{tech.technician_name}</td>
            <td>{tech.employee_number}</td>
            <td><button onClick={handleDelete} id={tech.id} className="btn btn-danger">Fire</button></td>
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
export default TechnicianList
