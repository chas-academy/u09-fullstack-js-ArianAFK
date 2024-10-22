import { useEffect, useState } from 'react';
import { useProductsContext } from '../hooks/useProductsContext';

// components
import ProductDetails from '../components/ProductDetails';
import ProductForm from '../components/ProductForm';
import { Link } from 'react-router-dom';

const Home = () => {
    const { products, dispatch } = useProductsContext();
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://u09-fullstack-js-arianafk.onrender.com/api/products');
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_PRODUCTS', payload: json });
            }
        };

        fetchProducts();
    }, [dispatch]);

    const filterProducts = (e) => {
        setFilter(e.target.value);
    };

    const productsFiltered = products?.filter((product) =>
        product?.title.toLowerCase().includes(filter?.toLowerCase())
    );

    return (
        <div className="home">
            <header className='home-header'>
                <h1>Welcome to Boss Media</h1>
                <p>Your one-stop solution for digital marketing and website creation!</p>
            </header>

            <input
                className='search'
                placeholder='Search for products...'
                onChange={filterProducts}
            />

            {/* Product Form for Admin */}
            <ProductForm />

            <section className="featured-products">
                <h2>Featured Products</h2>
                <div className="products">
                    {productsFiltered && productsFiltered.map((product) => (
                        <ProductDetails key={product._id} product={product} />
                    ))}
                </div>
            </section>

            <section className="cta">
                <h2>Get Started with Us!</h2>
                <p>Join our community today and unlock exclusive benefits!</p>
                <Link to="/signup">
                <button className="cta-button">Sign Up Now</button>
            </Link>
            </section>
        </div>
    );
};

export default Home;
