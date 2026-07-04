// Edit an existing product stored in Firestore.

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { getProduct, updateProduct } from '../lib/productService';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
  });
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setFetchError('');

      try {
        const data = await getProduct(id);
        setProduct({
          title: data?.title || '',
          price: data?.price?.toString() || '',
          description: data?.description || '',
          category: data?.category || '',
        });
      } catch (error) {
        setFetchError(error.message || 'Error fetching product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSuccessMessage('');
    setIsUpdating(true);

    try {
      await updateProduct(id, {
        title: product.title,
        price: parseFloat(product.price),
        description: product.description,
        category: product.category,
      });

      setSuccessMessage('Product updated successfully.');
    } catch (error) {
      setSubmitError(error.message || 'Error updating product.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-4">
        <h3>Loading product...</h3>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="container py-4">
        <Alert variant="danger">{fetchError}</Alert>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2>Edit Product</h2>

      {submitError && <Alert variant="danger">{submitError}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="productTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Enter product title"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter product price"
            required
            min="0"
            step="0.01"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Enter product category"
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Product'}
        </Button>

        {successMessage && (
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => navigate(`/product/${id}`)}
          >
            View Product Details
          </Button>
        )}
      </Form>
    </div>
  );
};

export default EditProduct;