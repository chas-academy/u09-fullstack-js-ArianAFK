import { useState } from "react"
import { useProductsContext } from '../hooks/useProductsContext'
import { useAuthContext } from "../hooks/useAuthContext";

const ProductForm = () => {
    const { dispatch } = useProductsContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const product = { title, description, price }

        const response = await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setDescription('')
            setPrice('')
            setError(null)
            setEmptyFields([])
            console.log('new product added', json)
            dispatch({ type: 'CREATE_PRODUCT', payload: json })
        }
    }

    return (
    <div>
        {user && user.role === 'admin' && (
            <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Product</h3>

            <label>Product Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Description:</label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
            />

            <label>Price:</label>
            <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className={emptyFields.includes('price') ? 'error' : ''}
            />

            <button>Add Product</button>
            {error && <div className="error">{error}</div>}
        </form>
        )}
        </div>
        
    )
}

export default ProductForm;