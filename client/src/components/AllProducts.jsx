import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api.js";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const productsResponse = await getProducts();
      const allProducts = productsResponse.sort(
        (productA, productB) => productA.name > productB.name ? 1 : -1
      );
      setProducts(allProducts);
    };
    getAllProducts();
  }, []);

  return (
    <div className="products">
      <h2>All Products (A-Z)</h2>
      <div className="product_map">
        {products.map((product) => (
          <div key={product.id} id="product_info">
            <p id="product_name">{product.name}</p>
            <img src={product.image} alt="product image" height={200} />
            <p>{product.is_available}</p>
            <Link to={`${product.id}`} className="details">
              see details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
