// Displays a welcome message and introduction to the store.

// Contains a button to navigate to the Product Listing page.

// Styled using React Bootstrap.

// (https://fakestoreapi.com/products)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate();

  return (

    <div
      className="d-flex align-items-center justify-content-center text-white"
      style={{
        backgroundImage: "url(https://images.pexels.com/photos/6956917/pexels-photo-6956917.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >

    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto text-center">
          <h1 className="mb-4">Welcome to FakeStore</h1>
          <p className="lead mb-4">
            Explore products, view details, and try creating or editing items with the FakeStoreAPI test project.
          </p>
          <Button variant="primary" size="lg" onClick={() => navigate('/products')}>
            View Products
          </Button>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Home