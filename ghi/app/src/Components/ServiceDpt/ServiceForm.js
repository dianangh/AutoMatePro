import React, {useState, useEffect} from 'react'

function ServiceForm() {
    const [technician, setTechnician] = useState([])

    const [formData, setFormData] = useState({
        vin: '',
        name: '',
        appointment_date: '',
        reason: '',

        technician: '',

    })

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technician/'
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setTechnician(data.technicians)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const url = 'http://localhost:8080/api/service/'

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(url, fetchConfig)

        if (response.ok) {
            setFormData({
                vin: '',
                name: '',
                appointment_date: '',
                reason: '',

                technician: '',

            })
        }
    }
    const handleFormChange = (e) => {
        const value = e.target.value
        const inputName = e.target.name

        setFormData({
            ...formData,

            [inputName]:value
        })
    }
    return (
        <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a service</h1>
          <form onSubmit={handleSubmit} id="create-service-form">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.vin} placeholder="VIN" required type="number" name="vin" id="vin" className="form-control" />
              <label htmlFor="VIN">VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
              <label htmlFor="Name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.appointment_date} placeholder="Appointment Date" required type="date" name="appointment_date" id="appointment_date" className="form-control" />
              <label htmlFor="Appointment Date">Appointment Date</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.reason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
              <label htmlFor="Reason">Reason for vist</label>
            </div>

            <div className="mb-3">
              <select onChange={handleFormChange} value={formData.technician} required name="technician" id="technician" className="form-select">
                <option value="">Choose a Technician</option>
                {technician.map(technician => {
                  return (
                    <option key={technician.id} value={technician.id}>{technician.technician_name}</option>
                  )
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>




        )

}

export default ServiceForm
