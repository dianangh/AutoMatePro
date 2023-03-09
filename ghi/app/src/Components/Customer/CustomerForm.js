import React, { useState, useEffect } from "react";

function CustomerForm() {
    const [formData, setFormData] = useState ({
        name: '',
        address: '',
        phone_number: '',
    });

    const [showSuccess, setShowSuccess] = useState(false);

    const getData = async () => {
        const url = "http://localhost:8090/api/customers/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async(event) => {
        event.preventDefault();
        const url = "http://localhost:8090/api/customers/";
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setFormData({
                name: '',
                address: '',
                phone_number: '',
            });
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }
    };

    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
    };

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1 className="text-center">Create a new Customer</h1>
                        {showSuccess && (
                            <div className="alert alert-success" role="alert">
                                Customer created successfully!
                            </div>
                        )}
                        <form onSubmit={handleSubmit} id="create-customer-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.address} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                                <label htmlFor="address">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.phone_number} placeholder="phone_number" required type="text" name="phone_number" id="phone_number" className="form-control" />
                                <label htmlFor="phone_number">Phone Number</label>
                            </div>
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerForm;
