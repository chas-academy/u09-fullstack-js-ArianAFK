import { useProductsContext } from '../hooks/useProductsContext'
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from 'react-router-dom';

const ProductDetails = ({ product }) => {
    const { dispatch } = useProductsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        const response = await fetch('https://u09-fullstack-js-arianafk.onrender.com/api/products/' + product._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_PRODUCT', payload: json })
        }
    }

    return (
        <div className="product-card">
            <h4>{product.title}</h4>
            <p><strong>Includes: </strong>{product.description}</p>
            <p><strong>Price: </strong>{product.price} $/month</p>
            <div className='button-container'>
            <Link to={`/product/${product._id}`}>
                    <button className="view-service-button">View Service</button>
                </Link>
            {user && user.role === 'admin' && (
                <span className='delete-button' onClick={handleClick}>Delete</span>
            )}
            </div>
        </div>
    )
}

export default ProductDetails;