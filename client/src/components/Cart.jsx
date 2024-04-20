import { useState, useEffect } from "react";
import useToken from "../useToken.js";
import {getCartProducts, checkout} from "../api.js"
import { useNavigate, Navigate } from "react-router-dom";

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  console.log({token})
    if (!token) {
      return <Navigate to="/messages/cart_error"/>
    }
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
      <h3>Cart details:</h3>
      <ul>
        {cartProducts.map((product) => (
          <li key={product.product_id}>
            <p>{product.name}{" "}</p>
            <p>qty: {product.qty}</p>
          </li>
        ))}
        <button onClick={(() => navigate("/"))}>
          Continue Shopping
        </button>
        <button onClick={(() => checkout(token, cartProducts[0].cart_id).then(() => navigate("/messages/order_confirmation")))}>
          CHECKOUT
        </button>
      </ul>
      <div className="spacer"></div>
    </div>
  );
}
