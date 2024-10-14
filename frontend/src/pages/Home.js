import { useEffect, useState } from 'react'

// components
import ProductDetails from '../components/ProductDetails'
import ProductForm from '../components/ProductForm'

const Home = () => {
    const [products, setProducts] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/products') // make sure you change to CORS for launch
            const json = await response.json()

            if (response.ok) {
                setProducts(json)
            }
        }

        fetchProducts()
    }, [])

    return (
        <div className="home">
            <ProductForm />
            <div className='products'>
                {products && products.map((product) => (
                    <ProductDetails key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default Home;