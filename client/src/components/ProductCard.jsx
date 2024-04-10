import { useEffect } from "react";
import { checkoutProduct } from "../api";
import useToken from "../useToken";


export default function ProductCard({ product, setProduct }) {
  const [token] = useToken();

  return (
    <div>
      <figure>
        <img
          src={product.image}
          alt="An image of the product"
          height={300}
        />
        <figcaption>
          <p id="product_name">{product.name}</p>
          <p>- {product.type}</p>
          <p>Description: {product.description}</p>
          <p>* Only {product.qty} left in stock! *</p>
        </figcaption>
      </figure>
      {product.available && (
        <button onClick={() => checkoutProduct(product.id, token).then(setProduct)}>
          CHECKOUT
        </button>
      )}
      {/* checkout button here */}
      {/* <button onClick={handleDelete}>Delete Player</button> */}
    </div>
  );
}
