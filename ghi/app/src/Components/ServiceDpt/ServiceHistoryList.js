import { useState, useEffect } from 'react'

const ServiceHistoryList=()=> {
    const [service, setService] = useState([])
    const [searchService, setSearch] = useState('')

    const getdata = async () => {
        const response = await fetch('http://localhost:8080/api/service/history')
        if (response.ok) {
            const data = await response.json()
            setService(data.history)
        }
    }
    useEffect(()=> {
        getdata()
    }, [])

    const handleSearchInput =(event) => {
        setSearch(event.target.value)
    }
    const filteredService = service.filter((service) => {
        return service.vin.includes(searchService)
    })


    return(
    <>
    <div className='row'>
    <div className='col-12'>
        <div className='shadow p-4 mt-4'>
            <h1 className='text-center'>Service History List</h1>
    <div className='input-group'>
    <input onChange={handleSearchInput} value={searchService} type="search" placeholder='Search by VIN' className ="form-control"/>
    <button type="button" className='btn btn-outline-primary'>Search VIN</button>
    </div>
    <table className="table table-striped">

        <thead>
            <tr>
            <th>VIN</th>
            <th>Customer Name</th>
            <th>Appointment Date</th>
            <th>Reason</th>
            <th>Technician</th>
            </tr>
        </thead>
        <tbody>
            {filteredService.map((service) => {
            return (
                <tr key={service.id}>
                <td>{service.vin}</td>
                <td>{service.name}</td>
                <td>{service.appointment_date}</td>
                <td>{service.reason}</td>
                <td>{service.technician.technician_name}</td>

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
export default ServiceHistoryList
