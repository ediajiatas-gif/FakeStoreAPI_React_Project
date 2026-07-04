// ShoppingCart.jsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { clearCart, removeFromCart } from '../features/cart/cartSlice';
import { createOrder } from '../lib/orderService';
import { auth } from '../lib/firebase';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.count, 0);

  const handleCheckout = () => {
    const doCheckout = async () => {
      if (!auth.currentUser) {
        alert('Please log in to place an order.');
        return;
      }

      try {
        await createOrder(auth.currentUser.uid, items, totalPrice);
        dispatch(clearCart());
        sessionStorage.removeItem('cart');
        setCheckoutSuccess(true);
        window.setTimeout(() => {
          setCheckoutSuccess(false);
        }, 3000);
      } catch (err) {
        console.error('Checkout error:', err);
        alert('Failed to place order.');
      }
    };

    doCheckout();
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Shopping Cart</h2>

      {checkoutSuccess && <Alert variant="success">Your order has been placed!</Alert>}

      {items.length === 0 ? (
        <Alert variant="info">Your cart is empty.</Alert>
      ) : (
        <>
          <Card className="mb-4">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">Items: {totalItems}</h5>
                <p className="mb-0 text-muted">Total: ${totalPrice.toFixed(2)}</p>
              </div>
              <Button variant="success" onClick={handleCheckout} disabled={items.length === 0}>
                Checkout
              </Button>
            </Card.Body>
          </Card>

          <ListGroup variant="flush">
            {items.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row className="align-items-center">
                  <Col xs={3} md={2}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '100%', maxWidth: '90px', height: '90px', objectFit: 'contain' }}
                    />
                  </Col>
                  <Col xs={6} md={7}>
                    <h6 className="mb-1">{item.title}</h6>
                    <p className="mb-1">Count: {item.count}</p>
                    <p className="mb-0 fw-bold">${(item.price * item.count).toFixed(2)}</p>
                  </Col>
                  <Col xs={3} md={3} className="text-end">
                    <Button variant="outline-danger" onClick={() => dispatch(removeFromCart(item.id))}>
                      Remove
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </Container>
  );
};

export default ShoppingCart;
