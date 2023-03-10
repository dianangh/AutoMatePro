import { useEffect, useState } from "react";

function SalesPeopleList(){
    const [salesPeople, setSalesPeople] = useState([]);

    const handleDelete = async (event) => {
        const url = `http://localhost:8090/api/salesperson/${event.target.id}`;

        const fetchConfig = {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(url, fetchConfig);
        const data = await response.json();
        setSalesPeople(salesPeople.filter((salesPerson) => String(salesPerson.id) !== event.target.id));
    }

    const getData = async () => {
        const response = await fetch("http://localhost:8090/api/salesperson/");
        if (response.ok) {
            const data = await response.json();
            setSalesPeople(data.sales_person);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1 className="text-center">Sales People List</h1>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Sales Person Name</th>
                                    <th>Sales Person Id</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    salesPeople.map(salesPerson => {
                                        return (
                                            <tr key={salesPerson.id}>
                                                <td>{ salesPerson.name }</td>
                                                <td>{ salesPerson.employee_number }</td>
                                                <td className="no-border-top"><button onClick={handleDelete} id={salesPerson.id} className="btn btn-sm btn-danger">Fire</button></td>
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

export default SalesPeopleList;
