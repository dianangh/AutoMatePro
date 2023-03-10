import { useState, useEffect } from 'react'

const VehicleList = () => {
    const [vehicle, setVehicle] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/models/');
        if (response.ok) {
            const data = await response.json();
            setVehicle(data.models);
        }
    };

    useEffect(() => {
        getData();
    }, [])

    return(
        <>
            <div className='row'>
                <div className='offset-3 col-6'>
                    <div className='shadow p-4 mt-4'>
                        <h1 className='text-center'>Vehicle models</h1>
                        <table className="table table-striped table-responsive-lg">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Manufacturer</th>
                                    <th>Picture</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicle.map(vehicle => {
                                    return (
                                        <tr key={vehicle.id}>
                                            <td>{vehicle.name}</td>
                                            <td>{vehicle.manufacturer.name}</td>
                                            <td className='w-25'><img src={vehicle.picture_url} className='img-fluid' alt='vehicle-pictures'/></td>
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
};

export default VehicleList;
