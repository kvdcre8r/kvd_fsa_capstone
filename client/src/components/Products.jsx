import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from '../api.js'
import styles from './style.module.css';

export default function Products() {

    const [products, setProducts ] = useState([]);

    useEffect(() => {
        const getAllProducts = async () => {
            const productsResponse = await getProducts()
            console.log({ productsResponse }, 'FROM WITHIN USEEFFECT')
            setProducts(productsResponse);
        }
        getAllProducts();
    }, [])


    return (
        <div className="products">
            <h2 className={styles.h2style}>Browse Products:</h2>
            {products.map((product) =>
                (<h3 key={product.id}> {product.name}{product.is_available}
                <Link to={`${product.id}`} className={styles.linkstyle}>details</Link>
                </h3>)
            )}

        </div>
    )
}