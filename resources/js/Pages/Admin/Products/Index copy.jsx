import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import '@shopify/polaris/build/esm/styles.css';

const Index = ({ products }) => {
    const { delete: deleteProduct } = useForm();

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(route('products.destroy', id));
        }
    };

    return (
        <>
            <div>
                <h1>Product List</h1>
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            {product.title} - {product.price} tk

                            {/* Edit Button */}
                            <Link href={route('products.edit', product.id)} className="btn btn-primary btn-sm">
                                Edit
                            </Link>

                            {/* Delete Button */}
                            <form 
                                onSubmit={(e) => { 
                                    e.preventDefault(); 
                                    handleDelete(product.id); 
                                }}
                                style={{ display: 'inline' }}
                            >
                                <button type="submit" className="btn btn-danger btn-sm">
                                    Delete
                                </button>
                            </form>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Index;
