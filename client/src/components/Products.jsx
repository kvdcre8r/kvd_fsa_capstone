import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api.js";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const productsResponse = await getProducts();
      console.log({ productsResponse }, "FROM WITHIN USEEFFECT");
      setProducts(productsResponse);
    };
    getAllProducts();
  }, []);

  return (
    <div className="products">
      <h2>Featured Products:</h2>
      <div className="product_map">
        {products.map((product) => (
          <div key={product.id} id="product_info">
            <p id="product_name">{product.name}</p>
            <img
              src={product.image}
              alt="product image"
              height={200}
            />
            <p>{product.is_available}</p>
            <Link to={`${product.id}`} className="details">
              see details
            </Link>
          </div>
        ))}
      </div>
      <h2>But wait!... there's more!...</h2>
    </div>
  );
}
