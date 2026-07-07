import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'

const ProductDetailCard = ({ product, onDelete, isDeleting }) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  return (
    <div className="card">
      <img
        src={product.image}
        className="card-img-top p-3"
        alt={product.title}
        style={{ height: 300, objectFit: 'contain' }}
      />
      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>
        <div className="mb-3">
          <h6 className="text-muted">Category</h6>
          <p>{product.category}</p>
        </div>
        <div className="mb-3">
          <h6 className="text-muted">Description</h6>
          <p>{product.description}</p>
        </div>
        <div className="mb-3">
          <h5 className="fw-bold">${product.price?.toFixed(2)}</h5>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-success flex-grow-1" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <Link
            to={`/edit-product/${product.id}`}
            className="btn btn-outline-secondary"
          >
            Edit
          </Link>

          <button
            className="btn btn-danger"
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailCard