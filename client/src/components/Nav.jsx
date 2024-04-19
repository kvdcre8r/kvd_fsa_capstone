import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <div className="nav">
            <Link to="/" className="leftlink">HOME</Link>
            <Link to="/categories" className="leftlink">Categories</Link>
            <Link to="/all_products" className="leftlink">All Products</Link>
            <Link to="/cart" className="rightlink">Cart</Link>
            <Link to="/Login" className="rightlink">Login</Link>
            <Link to="/register" className="rightlink">Register</Link>
        </div>
    )
}