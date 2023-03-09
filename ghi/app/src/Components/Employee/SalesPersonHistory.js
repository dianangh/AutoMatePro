import { useEffect, useState } from "react";

function SalesPersonHistory() {

    const [salesPerson, setSalesPerson] = useState([]);
    const [sales, setSales] = useState([]);
    const [filterSalesEmployeeId, setFilterSalesEmployeeId] = useState('Choose a Sales Person');

    const handleDelete = async (event) => {
        setSales(sales.filter((sale) => String(sale.id) !== event.target.id));
    }

    const getDataEmployee = async () => {
        const response = await fetch("http://localhost:8090/api/salesperson/");
        if(response.ok){
            const data = await response.json();
            const employees = data.sales_person.map((employee) => {
                return {
                    employeeName: employee.name,
                    employeeId: employee.employee_number
                };
            });
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
        const value = event.target.value
        setFilterSalesEmployeeId(value);
    };


    const filterSalesByEmployee = (sales, filterSalesEmployeeId) => {
        if (filterSalesEmployeeId === 'Choose a Sales Person') { // added this condition to return all sales if default value is selected
            return sales;
        }
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
                                id="filterSalesEmployeeId" className="form-select" value={filterSalesEmployeeId}>
                            <option value="Choose a Sales Person">Choose a Sales Person</option>
                            {salesPerson.map((employee) => {
                                return (
                                    <option key={employee.employeeId} value={employee.employeeName}>
                                        {employee.employeeName}
                                    </option>
                                );
                            })}
                            </select>
                        </div>
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
