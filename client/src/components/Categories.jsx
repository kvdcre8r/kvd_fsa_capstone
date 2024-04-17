import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api.js";

export default function Products() {
  const [catAccessories, setCatAccessories] = useState([]);
  const [catEntertainment, setCatEntertainment] = useState([]);
  const [catResources, setCatResources] = useState([]);
  const [catGadgets, setCatGadgets] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const productsResponse = await getProducts();
      const accessories = productsResponse.filter(
        (product) => product.category == "accessories"
      );
      const entertainment = productsResponse.filter(
        (product) => product.category == "entertainment"
      );
      const resources = productsResponse.filter(
        (product) => product.category == "resources"
      );
      const gadgets = productsResponse.filter(
        (product) => product.category == "gadgets"
      );
      setCatAccessories(accessories);
      setCatEntertainment(entertainment);
      setCatResources(resources);
      setCatGadgets(gadgets);
    };
    getAllProducts();
  }, []);

  return (
    <div className="products">
      <h2>CATEGORIES</h2>
      <h2>Accessories:</h2>
      <div className="product_map">
        {catAccessories.map((product) => (
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
      <h2>Entertainment:</h2>
      <div className="product_map">
        {catEntertainment.map((product) => (
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
      <h2>Resources:</h2>
      <div className="product_map">
        {catResources.map((product) => (
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
      <h2>Gadgets:</h2>
      <div className="product_map">
        {catGadgets.map((product) => (
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
