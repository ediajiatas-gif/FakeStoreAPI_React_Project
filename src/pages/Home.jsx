import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import CategorySelect from '../components/CategorySelect';
import { getAllProducts } from '../lib/productService';
import { addToCart } from '../features/cart/cartSlice';

// products are loaded from Firestore

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();

  const handleImageError = (event) => {
    const placeholder = 'https://via.placeholder.com/200x200?text=No+Image';
    if (event.currentTarget.src !== placeholder) {
      event.currentTarget.src = placeholder;
      event.currentTarget.onerror = null;
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => {
      return getAllProducts();
    },
    enabled: selectedCategory !== undefined,
  });

  const allProducts = data || [];
  const products = selectedCategory
    ? allProducts.filter((p) => p.category === selectedCategory)
    : allProducts;

  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <h1 className="mb-3">Featured Products</h1>
        <p className="text-muted">Browse our latest items.</p>
      </div>

      <CategorySelect
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {isLoading && <Alert variant="info">Loading products...</Alert>}
      {error && <Alert variant="danger">Failed to load products.</Alert>}

      {!isLoading && !error && (
        <Row xs={1} md={2} lg={3} className="g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.title}
                  onError={handleImageError}
                  style={{ height: '220px', objectFit: 'contain', padding: '1rem' }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="text-muted mb-2">{product.category}</Card.Text>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text className="fw-bold">${product.price}</Card.Text>
                  <Card.Text>Rate: {product.rating?.rate}</Card.Text>
                  <Button
                    variant="primary"
                    className="mt-auto"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Home