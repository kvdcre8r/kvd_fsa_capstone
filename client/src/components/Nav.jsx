import { Link } from "react-router-dom";

/* TODO - create a functional React component that renders a navigation bar for the different views in the SPA.
conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

export default function Nav() {
    return (
        <div className="nav">
            <Link to="/" className="homelink">Home</Link>
            <Link to="/cart" className="rightlink">Cart</Link>
            <Link to="/register" className="rightlink">Register</Link>
            <Link to="/Login" className="rightlink">Login</Link>
            <Link to="/all_products" className="leftlink">All Products</Link>
            <Link to="/categories" className="leftlink">Categories</Link>
        </div>
    )
}