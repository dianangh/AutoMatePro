import React, {useState, useEffect} from 'react'

function VehicleForm() {
    const [manufacturer, setmanufacturer] = useState([])
    const [formData, setFromData] = useState({

        name: '',
        picture_url: '',
        manufacturer_id:'',
    })

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/'
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setmanufacturer(data.manufacturers)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const url = 'http://localhost:8100/api/models/'

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
                picture_url: '',
                manufacturer_id: '',
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
                <form onSubmit={handleSubmit} id="create-model-form">
                    <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.name} placeholder="Technician Name" required type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="Manufacturer">Manufacturer Name</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.picture_url} placeholder="Picture Url" required type="text" name="picture_url" id="picture_url" className="form-control" />
                    <label htmlFor="Picture Url">Picture Url</label>
                    </div>
                    <div className="mb-3">
                    <select onChange={handleFormChange} value={formData.manufacturer_id} required name="manufacturer_id" id="manufacturer_id" className="form-select">
                        <option value="">Choose a Manufacturer</option>
                        {manufacturer.map(manufacturer => {
                        return (
                            <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
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
export default VehicleForm
