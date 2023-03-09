import React, { useState, useEffect } from "react";

function SalesForm() {
    const [automobiles, setAutomobiles] = useState([]);
    const [sales_person, setSalesPerson] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        automobile: '',
        sales_person: '',
        customer: '',
        price: '',
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [vinError, setVinError] = useState("");

    const getDataAutomobile = async () => {
        const url = "http://localhost:8100/api/automobiles/";
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos);
        }
    };

    const getDataSalesPerson = async () => {
        const url = "http://localhost:8090/api/salesperson/";
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setSalesPerson(data.sales_person)
        }
    };

    const getDataCustomer = async () => {
        const url = "http://localhost:8090/api/customers/";
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customer)
        }
    };

    useEffect(() => {
        getDataAutomobile();
        getDataSalesPerson();
        getDataCustomer();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = "http://localhost:8090/api/salesrecords/";
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers : {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setFormData({
                automobile: '',
                sales_person: '',
                customer: '',
                price: '',
                vin: '',
            });
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
            console.log(formData.automobile)
            console.log(formData)
        }
    }



    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        })
    }

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1 className="text-center">Record a new sale</h1>
                    {showSuccess && (
                            <div className="alert alert-success" role="alert">
                                Sale record created successfully!
                            </div>
                        )}
                    <form onSubmit={handleSubmit} id="create-sale-form">
                    <div className="form-floating mb-3">
                        <select
                        onChange={handleFormChange}
                        value={formData.vin}
                        required
                        name="automobile"
                        id="automobile"
                        className="form-select"
                        >
                        <option value="">Choose an automobile</option>
                        {automobiles.map((automobile) => {
                            return (
                            <option key={automobile.id} value={automobile.vin}>
                                {automobile.vin}
                            </option>
                            );
                        })}
                        </select>
                        {vinError && <div className="text-danger">{vinError}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <select
                        onChange={handleFormChange}
                        value={formData.sales_person}
                        required
                        name="sales_person"
                        id="sales_person"
                        className="form-select"
                        >
                        <option value="">Choose a sales person</option>
                        {sales_person.map((salesperson) => {
                            return (
                            <option key={salesperson.id} value={salesperson.id}>
                                {salesperson.name}
                            </option>
                            );
                        })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <select
                        onChange={handleFormChange}
                        value={formData.customer}
                        required
                        name="customer"
                        id="customer"
                        className="form-select"
                        >
                        <option value="">Choose a customer</option>
                        {customers.map((customer) => {
                            return (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                            );
                        })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                    <input
                    onChange={handleFormChange}
                    value={formData.price}
                    placeholder="Sale Price"
                    required
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    />
                    <label htmlFor="price">Sale Price</label>
                </div>
                    <button className="btn btn-primary">Create</button>
                    </form>
                </div>
                </div>
            </div>
        </>
    );
}

export default SalesForm;
