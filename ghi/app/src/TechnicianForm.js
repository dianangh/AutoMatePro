import React, {useState, useEffect} from 'react'

function TechnicianForm() {
    const [technician, setTechnician] = useState([])
    const [formData, setFromData] = useState({

        technician_name: '',
        employee_number: '',
    })

    const handleSubmit = async (event) => {
        event.preventDefault()

        const url = 'http://localhost:8080/api/technician/'

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url,fetchConfig)

        if (response.ok) {
            setFromData({

                technician_name: '',
                employee_number: '',
            })
        }
    }
    const handleFormChange = (e) => {
        const value = e.target.value
        const inputName = e.target.name

        setFromData({
            ...formData,
            [inputName]: value
    })
    }
    return(
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add a Technician</h1>
                <form onSubmit={handleSubmit} id="create-shoe-form">
                    <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.technician_name} placeholder="Technician Name" required type="text" name="technician_name" id="technician_name" className="form-control" />
                    <label htmlFor="Technician Name">Technician Name</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.employee_number} placeholder="Employee Number" required type="text" name="employee_number" id="employee_number" className="form-control" />
                    <label htmlFor="Employee Number">Employee Number</label>
                    </div>

                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>
    )
}
export default TechnicianForm
