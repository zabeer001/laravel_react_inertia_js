import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Edit = ({ product }) => {
    const [formData, setFormData] = useState({
        title: product.title || '',
        description: product.description || '',
        price: product.price || ''
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Get CSRF token from the page meta tag (ensure it exists in your Blade template)
            const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

            // Make the PUT request to update the product
            const response = await fetch(`/products/update/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken // Send CSRF token with the request
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Product updated successfully!');
                // Optionally redirect or reset form data
            } else {
                console.error('Failed to update product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Edit Product</h1>
            <Link href={route('products.index')} className='btn btn-danger'>
                       Products
            </Link>
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
                    <button type="submit" className="btn btn-success">Update Product</button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
