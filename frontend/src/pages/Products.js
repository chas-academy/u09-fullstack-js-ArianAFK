import { useEffect, useState } from 'react';
import { useProductsContext } from '../hooks/useProductsContext';

// components
import ProductDetails from '../components/ProductDetails';

const Products = () => {
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

    // Filtrera produkterna baserat på sökfältet
    const productsFiltered = products?.filter((product) =>
        product?.title.toLowerCase().includes(filter?.toLowerCase())
    );

    return (
        <div className="products">
            <input
                className='search'
                placeholder='Search for products...'
                onChange={filterProducts}
            />
            <div className='products-list'>
                {productsFiltered && productsFiltered.map((product) => (
                    <ProductDetails key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products;
