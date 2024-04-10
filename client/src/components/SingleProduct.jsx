import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../api";
import ProductCard from "./ProductCard";

export default function SingleProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState(undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getSingleProduct() {
      const APIResponse = await fetchSingleProduct(id);
      if (APIResponse.error) {
        setError(error.message);
      } else {
        setProduct(APIResponse);
      }
    }
    getSingleProduct()
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <p>{}</p> 
      
      {(product) && <ProductCard product={product} setProduct={setProduct} />}

    </div>
  );
}