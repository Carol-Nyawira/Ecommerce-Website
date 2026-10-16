import { Link } from 'react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './productsGrid';
import './HomePage.css';

export function HomePage({ totalQuantity}) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getHomeData = async () => {
            const response = await axios.get('/api/products')
            setProducts(response.data);
        }
        getHomeData();
    }, []);

    return (
        <>
            <Header totalQuantity={totalQuantity} />

            <title>Ecommerce Project</title>
            <link rel="icon" type="image/svg+xml" href="src/assets/icon.jpg" />

            <div className="home-page">
                <ProductsGrid products={products}/>
            </div>
        </>
    );
}