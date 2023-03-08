import { useEffect, useState } from "react";

function CustomerList(){

    const [customers, setCustomers] = useState([]);


    const handleDelete = async (event) => {
        console.log("The item will be deleted", typeof(event.target.id));
        const url = `http://localhost:8090/api/customers/${event.target.id}`;

        const fetchConfig = {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(url, fetchConfig);
        const data = await response.json();
        setCustomers(customers.filter((customer) => String(customer.id) !== event.target.id));
    }

    const getData = async () => {
        const response = await fetch("http://localhost:8090/api/customers/");
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customer)
            console.log("data line 27 ----->", data.customer)
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
                    <h1 className="text-center">Customer's List</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Customer Address</th>
                                <th>Customer Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customers.map(customer => {
                                    return (
                                        <tr key={customer.id}>
                                            <td>{ customer.name }</td>
                                            <td>{ customer.address }</td>
                                            <td>{ customer.phone_number }</td>
                                            <td><button onClick={handleDelete} id={customer.id} className="btn btn-sm btn-danger">Delete</button></td>
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

export default CustomerList;
