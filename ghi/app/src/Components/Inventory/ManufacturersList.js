import { useState, useEffect } from 'react'

const ManufacturerList = () => {
    const [manufacturer, setManufacturer] = useState([])

    const getdata = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/')
        if (response.ok) {
            const data = await response.json()
            setManufacturer(data.manufacturers)
        }
    }
    useEffect(() => {
        getdata()
    }, [])


    return(
        <>
        <div className='row'>
            <div className='offset-3 col-5'>
                <div className='shadow p-4 mt-4'>
                    <h1 className='text-center'>Manufacturers</h1>


        <table className="table table-striped">
        <thead>
            <tr>
            <th>Name</th>
            <th>Id</th>

            </tr>
        </thead>
        <tbody>
        {manufacturer.map(manufacturer => {
        return (
            <tr key={manufacturer.id}>
            <td>{manufacturer.name}</td>
            <td>{manufacturer.id}</td>

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
export default ManufacturerList
