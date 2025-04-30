// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [products, setProducts] = useState([]);
//   const [orderId, setOrderId] = useState('');
//   const [status, setStatus] = useState('');
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = () => {
//     axios.get('http://localhost:5000/products')
//       .then(res => setProducts(res.data))
//       .catch(err => console.error(err));
//   };

//   const placeOrder = (productId) => {
//     axios.post('http://localhost:5000/order', { product_id: productId })
//       .then(res => {
//         alert(`Order placed! Your Order ID is ${res.data.order_id}`);
//         setOrderId(res.data.order_id);
//       })
//       .catch(err => console.error(err));
//   };

//   const checkStatus = () => {
//     if (!orderId) return;
//     axios.get(`http://localhost:5000/order/${orderId}`)
//       .then(res => setStatus(`Status: ${res.data.status}`))
//       .catch(err => {
//         setStatus("Order not found");
//         console.error(err);
//       });
//   };

//   const handleAddProduct = (e) => {
//     e.preventDefault();
//     const product = { name, price: parseFloat(price) };

//     axios.post('http://localhost:5000/products', product)
//       .then(res => {
//         alert('Product added!');
//         setName('');
//         setPrice('');
//         fetchProducts();
//       })
//       .catch(err => console.error(err));
//   };

//   return (
//     <div className="app-container">
//       {/* New Welcome Banner */}
//       <div className="welcome-banner">
//         <span className="welcome-text">Welcome To</span>
//       </div>
      
//       <h1 className="bakery-title">Prachita's Bakery</h1>
      
//       {/* Add Product Section */}
//       <div className="section">
//         <h2 className="section-title">+ Add New Product</h2>
//         <form onSubmit={handleAddProduct}>
//           <div className="input-group">
//             <span className="input-label">- Product Name</span>
//             <input
//               type="text"
//               className="input-field"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <span className="input-label">- Price</span>
//             <input
//               type="number"
//               step="0.01"
//               className="input-field"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="button">
//             Add Product
//           </button>
//         </form>
//       </div>

//       <hr className="divider" />

//       {/* Menu Section */}
//       <div className="section">
//         <h2 className="section-title">Menu</h2>
//         <ul className="menu-list">
//           {products.map((product) => (
//             <li key={product.id} className="menu-item">
//               <span>
//                 {product.name} {product.price.toFixed(2)}
//               </span>
//               <button 
//                 onClick={() => placeOrder(product.id)}
//                 className="button order-button"
//               >
//                 Order
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <hr className="divider" />

//       {/* Order Status Section */}
//       <div className="section">
//         <h2 className="section-title">Check Your Order Status</h2>
//         <div>
//           {status && (
//             <div className="status-item">
//               {status}
//             </div>
//           )}
//           <div className="input-group">
//             <input
//               type="text"
//               className="input-field"
//               placeholder="Enter Order ID"
//               value={orderId}
//               onChange={(e) => setOrderId(e.target.value)}
//             />
//           </div>
//           <button 
//             onClick={checkStatus}
//             className="button"
//           >
//             Check Status
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;









// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Admin from './Admin';

// function Home() {
//   const [products, setProducts] = useState([]);
//   const [orderId, setOrderId] = useState('');
//   const [status, setStatus] = useState('');
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = () => {
//     axios.get('http://localhost:5000/products')
//       .then(res => setProducts(res.data))
//       .catch(err => console.error(err));
//   };

//   const placeOrder = (productId) => {
//     axios.post('http://localhost:5000/order', { product_id: productId })
//       .then(res => {
//         alert(`Order placed! Your Order ID is ${res.data.order_id}`);
//         setOrderId(res.data.order_id);
//       })
//       .catch(err => console.error(err));
//   };

//   const checkStatus = () => {
//     if (!orderId) return;
//     axios.get(`http://localhost:5000/order/${orderId}`)
//       .then(res => setStatus(`Status: ${res.data.status}`))
//       .catch(err => {
//         setStatus("Order not found");
//         console.error(err);
//       });
//   };

//   const handleAddProduct = (e) => {
//     e.preventDefault();
//     const product = { name, price: parseFloat(price) };

//     axios.post('http://localhost:5000/products', product)
//       .then(res => {
//         alert('Product added!');
//         setName('');
//         setPrice('');
//         fetchProducts();
//       })
//       .catch(err => console.error(err));
//   };

//   return (
//     <div className="app-container">
//       <div className="header">
//         <div className="welcome-banner">
//           <span className="welcome-text">Welcome To</span>
//         </div>
//         <Link to="/admin" className="admin-button">Admin</Link>
//       </div>

//       <h1 className="bakery-title">Prachita's Bakery</h1>

//       <div className="section">
//         <h2 className="section-title">+ Add New Product</h2>
//         <form onSubmit={handleAddProduct}>
//           <div className="input-group">
//             <span className="input-label">- Product Name</span>
//             <input type="text" className="input-field" value={name} onChange={(e) => setName(e.target.value)} required />
//           </div>
//           <div className="input-group">
//             <span className="input-label">- Price</span>
//             <input type="number" step="0.01" className="input-field" value={price} onChange={(e) => setPrice(e.target.value)} required />
//           </div>
//           <button type="submit" className="button">Add Product</button>
//         </form>
//       </div>

//       <hr className="divider" />

//       <div className="section">
//         <h2 className="section-title">Menu</h2>
//         <ul className="menu-list">
//           {products.map((product) => (
//             <li key={product.id} className="menu-item">
//               <span>{product.name} ₹{product.price.toFixed(2)}</span>
//               <button onClick={() => placeOrder(product.id)} className="button order-button">Order</button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <hr className="divider" />

//       <div className="section">
//         <h2 className="section-title">Check Your Order Status</h2>
//         <div>
//           {status && <div className="status-item">{status}</div>}
//           <div className="input-group">
//             <input type="text" className="input-field" placeholder="Enter Order ID" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
//           </div>
//           <button onClick={checkStatus} className="button">Check Status</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/admin" element={<Admin />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;








import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Admin from './Admin';

function Home() {
  const [products, setProducts] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const placeOrder = async (productId) => {
    try {
      const res = await axios.post('http://localhost:5000/order', { product_id: productId });
      alert(`Order placed! Your Order ID is ${res.data.order_id}`);
      setOrderId(res.data.order_id);
    } catch (err) {
      console.error('Failed to place order:', err);
    }
  };

  const checkStatus = async () => {
    if (!orderId) 
      {
        alert("Please Enter Order ID");
        return;
      }
    try {
      const res = await axios.get(`http://localhost:5000/order/${orderId}`);
      setStatus(`Status: ${res.data.status}`);
    } catch (err) {
      setStatus('Order not found');
      console.error('Error fetching order status:', err);
    }
  };


  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const newProduct = { name, price: parseFloat(price) };
      await axios.post('http://localhost:5000/products', newProduct);
      alert('Product added!');
      setName('');
      setPrice('');
      fetchProducts();
    } catch (err) {
      console.error('Failed to add product:', err);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="welcome-banner">
          <span className="welcome-text">Welcome To</span>
        </div>
        <Link to="/admin" className="admin-button">Admin</Link>
      </header>

      <h1 className="bakery-title">Prachita's Bakery</h1>

      {/* Add Product Section */}
      <section className="section">
        <h2 className="section-title">+ Add New Product</h2>
        <form onSubmit={handleAddProduct}>
          <div className="input-group">
            <label className="input-label">- Product Name</label>
            <input type="text" className="input-field" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="input-group">
            <label className="input-label">- Price</label>
            <input type="number" step="0.01" className="input-field" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <button type="submit" className="button">Add Product</button>
        </form>
      </section>

      <hr className="divider" />

      {/* Menu Section */}
      <section className="section">
        <h2 className="section-title">Menu</h2>
        <ul className="menu-list">
          {products.map(product => (
            <li key={product.id} className="menu-item">
              <span>{product.name} ₹{product.price.toFixed(2)}</span>
              <button onClick={() => placeOrder(product.id)} className="button order-button">Order</button>
            </li>
          ))}
        </ul>
      </section>

      <hr className="divider" />

      {/* Order Status Section */}
      <section className="section">
        <h2 className="section-title">Check Your Order Status</h2>
        {status && <div className="status-item">{status}</div>}
        <div className="input-group">
          <input
            type="text"
            className="input-field"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
        </div>
        <button onClick={checkStatus} className="button">Check Status</button>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
