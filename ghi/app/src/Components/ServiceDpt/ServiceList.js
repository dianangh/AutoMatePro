import { useState, useEffect } from 'react'

const ServiceList = () => {
    const [service, setService] = useState([])

    const getData = async () => {
        const response = await fetch("http://localhost:8080/api/service/");

        if (response.ok) {
            const data = await response.json();
            setService(data.services);
        }
    };

    useEffect(()=> {
        getData()
    }, [])

    const handleDelete = async (e) => {
        const url = `http://localhost:8080/api/service/${e.target.id}`;

        const fetchConfigs = {
            method: "Delete",
            headers: {
                "Content-Type": "application/json"
            }
        };
        const response = await fetch(url, fetchConfigs);
        const data = await response.json();

        setService(service.filter(technician => String(technician.id) !== e.target.id))
    }

    const handleUpdate = async (e) => {
        const url = `http://localhost:8080/api/service/${e.target.id}/`;

        const fetchConfigs = {
            method: "PUT",
            body: JSON.stringify({ completed: true }),
            headers: {
              "Content-Type": "application/json",
            },
        };
      const response = await fetch(url, fetchConfigs);
      const data = await response.json();

      setService(service.filter(service=>String(service.id) !== e.target.id));
    };

    return(
        <>
            <div className='row'>
                <div className='col-12'>
                    <div className='shadow p-4 mt-4'>
                        <h1 className='text-center'>Service List</h1>
                        <table className="table table-striped table-responsive-lg">
                            <thead>
                                <tr>
                                    <th>VIN</th>
                                    <th>Customer Name</th>
                                    <th>Appointment Date</th>
                                    <th>Time</th>
                                    <th>Reason</th>
                                    <th>Technician</th>
                                    <th>VIP Status</th>
                                    <th>Delete</th>
                                    <th>Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {service.filter(item => !item.completed).map(service => {
                                    return (
                                        <tr key={service.id}>
                                            <td>{service.vin}</td>
                                            <td>{service.name}</td>
                                            <td>{new Date(service.appointment_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                            <td>{new Date(service.appointment_date).toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' })}</td>
                                            <td>{service.reason}</td>
                                            <td>{service.technician.technician_name}</td>
                                            <td>{service.vip ? "Yes": "No"}</td>
                                            <td><button onClick={handleDelete} id={service.id} className="btn btn-danger">Delete</button></td>
                                            <td><button onClick={handleUpdate} id={service.id} className="btn btn-success">Complete</button></td>
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

export default ServiceList;
