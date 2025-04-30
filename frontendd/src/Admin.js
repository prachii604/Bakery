import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('http://localhost:5000/order')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  };

  const updateStatus = (orderId) => {
    axios.put(`http://localhost:5000/order/${orderId}`, { status: 'completed' })
      .then(() => {
        alert('Order status updated!');
        fetchOrders();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="app-container">
      <h1 className="bakery-title">Admin Dashboard</h1>
      <Link to="/" className="button">Back to Home</Link>
      <div className="section">
        <h2 className="section-title">All Orders</h2>
        <ul className="menu-list">
          {orders.map(order => (
            <li key={order.order_id} className="menu-item">
              <span>Order #{order.order_id} — Product ID: {order.product_id} — Status: {order.status}</span>
              {order.status !== 'completed' && (
                <button onClick={() => updateStatus(order.order_id)} className="button">Mark as Complete</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
