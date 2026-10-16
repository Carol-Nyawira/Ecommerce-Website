import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Header } from "../../components/Header";
import './TrackingPage.css';


export function TrackingPage({ totalQuantity }) {
    const { orderId, productId } = useParams();
    const [ order, setOrder ] = useState(null);

    useEffect(() => {
        const fetchtrackingData = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        }
        fetchtrackingData();
    },[orderId]);

    if(!order) { 
        return null; 
    }

    const orderProduct = order.products.find((orderProduct) => {
        return orderProduct.productId === productId;
    });

    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
    const deliveryPercentage = (timePassedMs/totalDeliveryTimeMs) * 100;

    return (
        <>
            <title>Tracking</title>

            <Header totalQuantity={totalQuantity} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={orderProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className="progress-label">
                            Preparing
                        </div>
                        <div className="progress-label current-status">
                            Shipped
                        </div>
                        <div className="progress-label">
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{width: `${deliveryPercentage}`}}></div>
                    </div>
                </div>
            </div>
        </>
    );
}