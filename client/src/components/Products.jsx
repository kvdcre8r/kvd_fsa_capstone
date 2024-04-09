import { useState, useEffect } from "react";
import { products } from '../api.js'
import styles from './style.module.css';

export default function Products() {

    const [products, setProducts ] = useState([]);

    useEffect(() => {
        const getAllProducts = async () => {
            const productResponse = await products()
            console.log({ productResponse }, 'FROM WITHIN USEEFFECT')
            setProducts(productResponse);
        }
        getAllProducts();
    }, [])


    return (
        <div className="products">
            <h2 className={styles.h2style}>Browse Library:</h2>
            {products.map((product) =>
                (<h3 key={product.title} author={product.author}> {product.title} by {product.author}
                <Link to={`${product.id}`} className={styles.linkstyle}>details</Link>
                </h3>)
            )}

        </div>
    )
}