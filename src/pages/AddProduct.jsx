// A form to create a new product using FakeStoreAPI (POST request).

// The form should include fields for:

// Product title

// Price

// Description

// Category

// Submitting the form should send data to FakeStoreAPI.

// Displays a confirmation message when the product is "created."

// Note: FakeStoreAPI will return a successful response to your POST request, allowing you to test how your app handles product creation. However, the new product will not actually be saved or appear in the product list on future API calls, since this API is for testing purposes only.

// Uses React Bootstrap form components.
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: product.title,
          price: parseFloat(product.price),
          description: product.description,
          category: product.category,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create product.');
      }

      await response.json();
      setSubmitted(true);
      setProduct({ title: '', price: '', description: '', category: '' });
    } catch (submitError) {
      setError(submitError.message || 'Error creating product.');
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Add Product</h2>

      {submitted && <Alert variant="success">Product created successfully!</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="addProductTitle">
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Enter product title"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="addProductPrice">
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

        <Form.Group className="mb-3" controlId="addProductDescription">
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

        <Form.Group className="mb-3" controlId="addProductCategory">
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

        <Button type="submit" variant="primary">
          Create Product
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
