import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="error-page">
            <div className="title">
                <h2>404</h2>
                <h3>Page not found</h3>
            </div>
            <Link to="/" id="home-link"><p>Click to go back home</p></Link>
        </div>
    );
}
 
export default ErrorPage;