import React, {useState, useEffect} from 'react'

function ManufacturerForm() {
    const [manufacturer, setManufacturer] = useState([])
    const [formData, setFromData] = useState({

        name: '',
    })

    const handleSubmit = async (event) => {
        event.preventDefault()

        const url = 'http://localhost:8100/api/manufacturers/'

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

                name: '',
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
                <h1>Add a manufacturer</h1>
                <form onSubmit={handleSubmit} id="create-manufacturer-form">
                    <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.name} placeholder="Technician Name" required type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="Manufacturer">Manufacturer Name</label>
                    </div>

                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>
    )
}
export default ManufacturerForm
