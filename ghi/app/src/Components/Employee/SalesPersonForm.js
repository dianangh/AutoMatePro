import React, { useState, useEffect } from "react";

function SalesPersonForm() {
    const [formData, setFormData] = useState({
        name: '',
        employee_number: '',
    });

    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = "http://localhost:8090/api/salesperson/";
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
                name: "",
                employee_number: "",
            });
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }
    }

    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
    }

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1 className="text-center">Create a new Employee</h1>
                        {showSuccess && (
                            <div className="alert alert-success" role="alert">
                                Employee created successfully!
                            </div>
                        )}
                        <form onSubmit={handleSubmit} id="create-customer-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.employee_number} placeholder="Employee Number" required type="text" name="employee_number" id="employee_number" className="form-control" />
                                <label htmlFor="employee_number">Employee Number</label>
                            </div>
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SalesPersonForm;
