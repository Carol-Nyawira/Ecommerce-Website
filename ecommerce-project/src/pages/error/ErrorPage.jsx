import { Header } from "../../components/Header";
import './ErrorPage.css';

export function ErrorPage({ totalQuantity }) {
    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" type="image/svg+xml" href="src/assets/icon.jpg" />

            <Header totalQuantity={totalQuantity} />

            <div className="error-message">
                Page not found
            </div>
        </>
    );
}