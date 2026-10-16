import { Routes, Route } from 'react-router';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import {TrackingPage} from './pages/tracking/TrackingPage';
import './App.css';
import { ErrorPage } from './pages/error/ErrorPage';

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getAppData = async () => {
      const response = await axios.get('/api/cart-items?expand=product')
      setCart(response.data);
    }
    getAppData();
  }, [])

  let totalQuantity = 0;

    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    });

  return (
    <Routes>
      <Route index element={<HomePage totalQuantity={totalQuantity} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} totalQuantity={totalQuantity} />} />
      <Route path="orders" element={<OrdersPage totalQuantity={totalQuantity} />} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage totalQuantity={totalQuantity} />} />
      <Route path='*' element={<ErrorPage totalQuantity={totalQuantity} />} />
    </Routes>
  );
}

export default App
