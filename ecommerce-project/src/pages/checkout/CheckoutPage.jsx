import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { PaymentSummary } from './PaymentSummary';
import { OrderSummary } from './OrderSummary';
import './CheckoutPage.css';

export function CheckoutPage({ cart, totalQuantity }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        const fetchCheckoutData = async () => {
            let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            setDeliveryOptions(response.data);

            response = await axios.get('/api/payment-summary')
            setPaymentSummary(response.data);
        }
        fetchCheckoutData();
    }, []);

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/svg+xml" href="src/assets/cart-icon.png" />

            <CheckoutHeader totalQuantity={totalQuantity} />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

                    <PaymentSummary paymentSummary={paymentSummary} />
                </div>
            </div>
        </>
    );
}