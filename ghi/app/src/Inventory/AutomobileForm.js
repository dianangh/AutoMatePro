import React, {useState, useEffect} from 'react'

function AutomobileForm() {
    const [vehicle, setVehicle] = useState([])
    const [formData, setFromData] = useState({

        color: '',
        year: '',
        vin:'',
        model_id: '',
    })

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/'
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setVehicle(data.models)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const url = 'http://localhost:8100/api/automobiles/'

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

                color: '',
                year: '',
                vin: '',
                model_id: '',
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
                <h1>Add a vehicle</h1>
                <form onSubmit={handleSubmit} id="create-automobile-form">
                    <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                    <label htmlFor="Manufacturer">Color</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.year} placeholder="Year" required type="number" name="year" id="year" className="form-control" />
                    <label htmlFor="Year">Year</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control" />
                    <label htmlFor="Picture Url">Vin</label>
                    </div>
                    <div className="mb-3">
                    <select onChange={handleFormChange} value={formData.model_id} required name="model_id" id="model_id" className="form-select">
                        <option value="">Choose a Model</option>
                        {vehicle.map(vehicle => {
                        return (
                            <option key={vehicle.manufacturer.id} value={vehicle.manufacturer.id}>{vehicle.name}</option>
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
export default AutomobileForm
