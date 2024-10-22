import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://u09-fullstack-js-arianafk.onrender.com/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="product-detail-page">
            <div className="product-detail-card">
                <h2>{product.title}</h2>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Price:</strong> {product.price} $/month</p>
            </div>
            <div className="additional-info">
                <h3>Additional Information</h3>
                <p>Here you can provide more details about the product, including its features, benefits, and any other relevant information that might interest potential customers.</p>
            </div>
            <div className="customer-reviews">
                <h3>Customer Reviews</h3>
                <p>"This product has changed my life!" - Happy Customer</p>
                <p>"Excellent service and great quality!" - Satisfied Client</p>
                <p>"I can't recommend this enough." - Loyal Customer</p>
            </div>
        </div>
    );
};

export default ProductDetailPage;
