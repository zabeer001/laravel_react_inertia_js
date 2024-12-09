import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Create = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: ''
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Get CSRF token from the page meta tag (ensure it exists in your Blade template)
            const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

            // Make the POST request to your Laravel route
            const response = await fetch('/products/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken // Send CSRF token with the request
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle successful response
                console.log('Product created successfully!');
                // Reset form
                setFormData({
                    title: '',
                    description: '',
                    price: ''
                });
            } else {
                // Handle error response
                console.error('Failed to create product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Link href={route('products.index')} className='btn btn-danger'>
                       Products
            </Link>
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <button type="submit" className="btn btn-danger">Create Product</button>
                </div>
            </form>
        </div>
    );
};

export default Create;
