import { useEffect, useState } from "react";

function SalesPersonHistory() {

    const [salesPerson, setSalesPerson] = useState([]);
    const [sales, setSales] = useState([]);
    const [filterSalesEmployeeId, setFilterSalesEmployeeId] = useState('');
    const [filterCategory, setFilterCategory] = useState("employeeId");
    // const [showModal, setShowModal] = useState(false);

    const handleDelete = async (event) => {
        console.log("The item will be deleted", typeof(event.target.id));
        const url = `http://localhost:8090/api/salesrecords/${event.target.id}`;

        const fetchConfig = {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(url, fetchConfig);
        const data = await response.json();
        setSales(sales.filter((sale) => String(sale.id) !== event.target.id));
        // setShowModal(true);
        // setTimeout(() => setShowModal(false), 3000);
        }

    const getDataEmployee = async () => {
        const response = await fetch("http://localhost:8090/api/salesperson/");
        if(response.ok){
            const data = await response.json();
            console.log(data.sales_person)
            const employees = data.sales_person.map((employee) => {

                return {
                    employeeName: employee.name,
                    employeeId: employee.employee_number
                };

            });
            console.log('employees', employees);
            // setSalesPerson(data.sales_person)
            setSalesPerson(employees)
        }
    }

    const getData = async () => {
        const response = await fetch("http://localhost:8090/api/salesrecords/");
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales_record)
        }
    };

    useEffect(() => {
        getDataEmployee();
        getData();
    }, []);

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        const value = event.target.value
        setFilterSalesEmployeeId(value);
    };

    const handleFilterCategoryChange= (event) => {
        const value = event.target.value;
        setFilterCategory(value)
    };

    const filterSalesByEmployee = (sales, filterSalesEmployeeId) => {
        return sales.filter((sale) =>
            sale.sales_person.name.toLowerCase().includes(filterSalesEmployeeId.toLowerCase())
        );
    };

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1 className="text-center">Sales Person History</h1>
                        <div className="mb-3">
                            <select onChange={handleFilterChange} name="filterSalesEmployeeId"
                                id="filterSalesEmployeeId" className="form-select">
                            <option value="employeeName">Choose a Sales Person</option>
                            {salesPerson.map((employee) => {
                                return (
                                    <option key={employee.employeeId} value={employee.employeeName}>
                                        {employee.employeeName}
                                    </option>
                                );
                            })}
                            </select>
                        </div>
                        {/* {showModal && (
                            <div className="alert alert-success" role="alert">
                                Sales record deleted successfully!
                            </div>
                        )} */}
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Sales Person</th>
                                    <th>Customer</th>
                                    <th>VIN</th>
                                    <th>Sale Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterSalesByEmployee(sales, filterSalesEmployeeId).map((sale) => {
                                    return (
                                        <tr key={sale.id}>
                                        <td>{sale.sales_person.name}</td>
                                        <td>{sale.customer.name}</td>
                                        <td>{sale.automobile.vin}</td>
                                        <td>{sale.price}</td>
                                        <td>
                                            <button onClick={handleDelete} id={sale.id} className="btn btn-sm btn-danger">
                                            Delete
                                            </button>
                                        </td>
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

export default SalesPersonHistory;
