// Displays detailed information for a single product.

// Uses useParams() to extract the product ID from the URL.

// Displays detailed information for a single product fetched from Firestore.

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetailCard from "../components/ProductDetailCard";
import { getProduct, deleteProduct } from "../lib/productService";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data || {});
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error fetching product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProduct(id);
      setSuccessMessage("Product deleted successfully!");
      setShowDeleteModal(false);
      setTimeout(() => {
        navigate("/products");
      }, 1500);
    } catch (err) {
      setError(err.message || "Error deleting product");
      setIsDeleting(false);
    }
  };

  if (loading) return <div className="container py-4"><h3>Loading product...</h3></div>;
  if (error && !successMessage) return <div className="container py-4"><div className="alert alert-danger">{error}</div></div>;

  return (
    <div className="container py-4">
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show">
          {successMessage}
        </div>
      )}
      <div className="row">
        <div className="col-md-6">
          <ProductDetailCard
            product={product}
            onDelete={handleDeleteClick}
            isDeleting={isDeleting}
          />
        </div>
      </div>

      {showDeleteModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this product?</p>
                <p className="text-muted"><strong>{product.title}</strong></p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;