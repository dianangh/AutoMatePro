import React, { useState, useEffect } from "react";

function SalesForm() {
    const [automobile, setAutomobile] = useState('');
    const [automobiles, setAutomobiles] = useState([]);
    const [sales_person, setSalesPerson] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [price, setPrice] = useState('');

    const fetchDataAutomobile = async () => {
        const urlAutomobile = "http://localhost:8100/api/automobiles/";
        const responseAuto = await fetch(urlAutomobile);
        console.log("response line 12 auto", responseAuto)
        if (responseAuto.ok) {
            const dataAuto = await responseAuto.json();
            console.log("data line 14", dataAuto.autos)
            setAutomobiles(dataAuto.autos);
        }
    }

    const fetchDataSalesPerson = async () => {
        const urlSalesPerson = "http://localhost:8090/api/salesperson/";
        const responseSalesPerson = await fetch(urlSalesPerson);
        console.log("response line 23", responseSalesPerson);
        if (responseSalesPerson.ok) {
            const dataSalesPerson = await responseSalesPerson.json();
            console.log("data line 26 salesperson", dataSalesPerson.sales_person);
            setSalesPerson(dataSalesPerson.sales_person)
        }
    }

    const fetchDataCustomer = async () => {
        const urlCustomer = "http://localhost:8090/api/customers/";
        const responseCustomer = await fetch(urlCustomer);
        console.log("response line 38 customer----->", responseCustomer);
        if (responseCustomer.ok) {
            const dataCustomer = await responseCustomer.json();
            console.log("data line 37", dataCustomer.customer);
            setCustomers(dataCustomer.customer)
        }
    }

    useEffect(() => {
        fetchDataAutomobile();
        fetchDataCustomer();
        fetchDataSalesPerson();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.price = price;
        // data.automobile = document.getElementById("automobile").value;

        const salesUrl = "http://localhost:8090/api/salesrecords/";
        const fetchSales = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },

        };

        const SalesRecordsResponse = await fetch(salesUrl, fetchSales);
        if (SalesRecordsResponse.ok) {
            setPrice('');
        }
        console.log("data ------>", data);
    }

    const handlePriceChange = (event) => {
        const value = event.target.value;
        console.log("value line 68" , value)
        setPrice(value);
    }


    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1 className="text-center">Record a new sale</h1>
                    <form onSubmit={handleSubmit} id="create-location-form">
                    <div className="form-floating mb-3">
                        <select
                        required
                        name="automobile"
                        id="automobile"
                        className="form-select"
                        >
                        <option value="">Choose an automobile</option>
                        {automobiles.map((automobile) => {
                            return (
                            <option key={automobile.id} value={automobile.href}>
                                {automobile.vin}
                            </option>
                            );
                        })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <select
                        required
                        name="sales_person"
                        id="sales_person"
                        className="form-select"
                        >
                        <option value="">Choose a sales person</option>
                        {sales_person.map((salesperson) => {
                            return (
                            <option key={salesperson.id} value={salesperson.href}>
                                {salesperson.name}
                            </option>
                            );
                        })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <select
                        required
                        name="customer"
                        id="customer"
                        className="form-select"
                        >
                        <option value="">Choose a customer</option>
                        {customers.map((customer) => {
                            return (
                            <option key={customer.id} value={customer.href}>
                                {customer.name}
                            </option>
                            );
                        })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                    <input
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
