import { useState, useEffect } from "react";
import useToken from "../useToken.js";
import {getCartProducts} from "../api.js"

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [token, setToken] = useToken();

  useEffect(() => {
    if (token) {
      const fetchReso = async () => {
        const resoRes = await getCartProducts(token);
        setCartProducts(resoRes);
      };
      fetchReso();
    }
  }, []);

  return (
    <div className="cart">
      <h2>Cart details:</h2>
      <ul>
        {cartProducts.map((product) => (
          <li key={product.id}>
            <p>{product.name}{" "}</p>
            <p>qty: {product.qty}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
