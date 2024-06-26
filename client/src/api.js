import { json } from "react-router-dom";

export const API_URL = "/api";

export const postToEndPoint = async (endpoint, bodyObj, token) => {
  try {
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(bodyObj),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("THIS WAS OUR ERROR", error);
  }
};

export const addProductToCart = async ({ productId, qty, token }) => {
  return await postToEndPoint("cart", { productId, qty }, token);
};

export async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "GET",
    });
    const result = await response.json();

    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const getCartProducts = async (token) => {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (ex) {
    console.error(ex);
  }
};

export const checkout = async (token, cartId) => {
  try {
    const response = await fetch(`${API_URL}/cart/${cartId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (ex) {
    console.error(ex);
  }
}

const updateProduct = async (id, token, available) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        available,
      }),
    });
    const result = await response.json();
    return result.product;
  } catch (error) {}
};

export const returnProduct = async (id, token) => {
  return await updateProduct(id, token, true);
};

export const checkoutProduct = async (id, token) => {
  return await updateProduct(id, token, false);
};

export const fetchSingleProduct = async (id) => {
  try {
    const singleProductResponse = await fetch(`${API_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const singleProductResult = await singleProductResponse.json();
    return singleProductResult;
  } catch (e) {
    console.error(e);
  }
};

export const getAccount = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    console.log(result);
    return result.products;
  } catch (error) {
    console.error(error);
  }
};