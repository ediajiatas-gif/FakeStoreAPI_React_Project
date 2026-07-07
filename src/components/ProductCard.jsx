
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const fallbackImage = 'https://via.placeholder.com/200x200?text=No+Image'
  const [imageSrc, setImageSrc] = useState(product.image)

  const handleImageError = (event) => {
    if (imageSrc !== fallbackImage) {
      setImageSrc(fallbackImage)
      event.currentTarget.onerror = null
    }
  }

  return (
    <div className="card h-100">
      <img
        src={imageSrc}
        className="card-img-top p-3"
        alt={product.title}
        onError={handleImageError}
        style={{ height: 200, objectFit: 'contain' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text fw-bold mt-auto">${product.price?.toFixed(2)}</p>
        <div className="d-flex gap-2 mt-2">
          <Link to={`/products/${product.id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
