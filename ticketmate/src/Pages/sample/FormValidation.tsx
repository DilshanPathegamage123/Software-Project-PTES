import React, { useState } from 'react';

function FormValidation() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isValid = true;
        const newErrors = {
            name: '',
            email: '',
            message: ''
        };

        // Validation logic
        if (formData.name.trim() === '') {
            newErrors.name = 'Name is required';
            isValid = false;
        }
        if (formData.email.trim() === '') {
            newErrors.email = 'Email is required';
            isValid = false;
        }
        if (formData.message.trim() === '') {
            newErrors.message = 'Message is required';
            isValid = false;
        }

        if (isValid) {
            // Form submission logic here
            console.log('Form submitted:', formData);
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div>
            <h2>Sample Form with Validation</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div>
                    {/* <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows={4} cols={50} value={formData.message} onChange={handleChange}></textarea>
                    {errors.message && <span className="error">{errors.message}</span>} */}
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default FormValidation;
