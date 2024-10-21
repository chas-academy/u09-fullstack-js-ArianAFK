import { useEffect, useState } from 'react'
import { useProductsContext } from '../hooks/useProductsContext'

// components
import ProductDetails from '../components/ProductDetails'
import ProductForm from '../components/ProductForm'

const Home = () => {
    const { products, dispatch } = useProductsContext()
    const [filter, setFilter] = useState('');


    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/products') // make sure you change to CORS for launch
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_PRODUCTS', payload: json })
            }
        }

        fetchProducts()
    }, [])

    const filterProducts = (e) => {
        setFilter(e.target.value)
    }

    const productsFiltered = products?.filter((product) =>
        product?.title.toLowerCase().includes(filter?.toLowerCase())
    )

    return (
        <div className="home">
            <ProductForm />
            <input placeholder='Products...' onChange={filterProducts} />
            <div className='products'>
                {productsFiltered && productsFiltered.map((product) => (
                    <ProductDetails key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default Home;