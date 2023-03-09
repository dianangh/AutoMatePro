import { useEffect, useState } from "react";

function SalesList(){

        const [sales_persons, setSalesPersons] = useState([]);


    const handleDelete = async (event) => {
        const url = `http://localhost:8090/api/salesrecords/${event.target.id}`;

        const fetchConfig = {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(url, fetchConfig);
        const data = await response.json();
        setSalesPersons(sales_persons.filter((sale_person) => String(sale_person.id) !== event.target.id));
    }

    const getData = async () => {
        const response = await fetch("http://localhost:8090/api/salesrecords/");
        if (response.ok) {
            const data = await response.json();
            setSalesPersons(data.sales_record)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1 className="text-center">List of Sales</h1>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Sales Person</th>
                                    <th>employee Number</th>
                                    <th>Purchaser Name</th>
                                    <th>VIN</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sales_persons.map(sale => {
                                        return (
                                            <tr key={sale.id}>
                                                <td>{ sale.sales_person.name }</td>
                                                <td>{ sale.sales_person.employee_number }</td>
                                                <td>{ sale.customer.name }</td>
                                                <td>{ sale.automobile.vin }</td>
                                                <td><button onClick={handleDelete} id={sale.id} className="btn btn-sm btn-danger">Delete</button></td>
                                            </tr>
                                        )}
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SalesList;
