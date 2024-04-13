import { useEffect } from "react";
import { addProductToCart } from "../api";
import useToken from "../useToken";


export default function ProductCard({ product, setProduct }) {
  const [token] = useToken();

  return (
    <div>
      <figure className="card_content">
        <img
          src={product.image}
          alt="product image"
          height={300}
        />
        <figcaption>
          <p id="product_name">{product.name}</p>
          <p id="price">${product.price}</p>
          <p>Category: {product.category}</p>
          <p>Description: {product.description}</p>
          <p>* Only {product.qty} left in stock! *</p>
      {product.is_available && (
        <button onClick={() => addProductToCart({productId: product.id, token, qty:1}).then(setProduct)}>
          Add to Cart
        </button>
      )}
        </figcaption>
      </figure>
      {/* checkout button here */}
      {/* <button onClick={handleDelete}>Delete Player</button> */}
    </div>
  );
}
