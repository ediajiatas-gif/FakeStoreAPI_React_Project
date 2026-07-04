// Orders.jsx
import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button, Modal } from "react-bootstrap";
import { getUserOrders, getOrder } from "../lib/orderService";
import { auth } from "../lib/firebase";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.currentUser) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const result = await getUserOrders(auth.currentUser.uid); // fetch this user's orders
      setOrders(result);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const openOrder = async (id) => {
    try {
      const data = await getOrder(id);
      setSelectedOrder(data);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to load order", err);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    return timestamp.toDate().toLocaleDateString(); // Firestore Timestamp needs .toDate() first
  };

  return (
    <Container className="py-4">
      <h2>My Orders</h2>

      {loading && <p>Loading...</p>}
      {!loading && orders.length === 0 && <p>No orders found.</p>}

      {!loading && orders.length > 0 && (
        <ListGroup>
          {orders.map((order) => (
            <ListGroup.Item
              key={order.id}
              action
              onClick={() => openOrder(order.id)}
            >
              Order #{order.id} — {formatDate(order.createdAt)} — $
              {order.totalPrice}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              <p>
                <strong>Order ID:</strong> {selectedOrder.id}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(selectedOrder.createdAt)}
              </p>
              <p>
                <strong>Total:</strong> ${selectedOrder.totalPrice}
              </p>
              <ul>
                {selectedOrder.items.map((item, index) => (
                  <li key={index}>
                    {item.title} — Qty: {item.count} — $
                    {(item.price * item.count).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Orders;
