import { Link } from "react-router-dom";
import styles from './style.module.css';

/* TODO - create a functional React component that renders a navigation bar for the different views in the SPA.
conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

export default function Nav() {
    return (
        <div className="nav">
            <Link to="/" className={styles.homestyle}>Home</Link>
            <Link to="/Login" className={styles.linkstyle}>Login</Link>
            <Link to="/register" className={styles.linkstyle}>Register</Link>
            <Link to="/account" className={styles.linkstyle}>Account</Link>
        </div>
    )
}