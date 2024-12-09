import { Link } from '@inertiajs/react';

const LandingPage = ({ auth }) => {
    return (
        <div className="text-center">
            <h1>Welcome to Our Application</h1>
            <Link href={route('products.index')} className='btn btn-danger'>
                       Products
            </Link>

            {auth ? (
                <Link href={route('dashboard')} className="btn btn-primary">
                    Dashboard
                </Link>
            ) : (
                <div>
                    <Link href={route('login')} className="btn btn-secondary">
                        Log in
                    </Link>

                    <Link href={route('register')} className="btn btn-secondary">
                        Register
                    </Link>
                   
                </div>
            )}
          
        </div>
    );
};

export default LandingPage;
