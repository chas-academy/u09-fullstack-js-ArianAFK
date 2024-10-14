const ProductDetails = ({ product }) => {
    return (
        <div className="product-details">
            <h4>{product.title}</h4>
            <p><strong>Includes: </strong>{product.description}</p>
            <p><strong>Price: </strong>{product.price} $/month</p>
        </div>
    )
}

export default ProductDetails;