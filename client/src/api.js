import { json } from "react-router-dom";

export const API_URL = "http://localhost:3000/api";

//API_URL,'user/register',{email:email,password:password}
export const postToEndPoint = async (API_URL, endpoint, bodyObj) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObj),
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.e("THIS WAS OUR ERROR", error);
  }
};

export async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "GET",
    });
    const result = await response.json();

    console.log(result);
    return result
  } catch (error) {
    console.error(error);
  }
}

const updateProduct = async (id, token, available) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
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
    return await updateProduct(id, token, true)
}

export const checkoutProduct = async (id, token) => {
    return await updateProduct(id, token, false)
}


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
  // write GET books/:bookId
  // return book from this function
};

export const getAccount = async (token) => {
    try {
        const response = await fetch(`${API_URL}/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
    
        });
        const result = await response.json();
    
        console.log(result);
        return result.products;
      } catch (error) {
        console.error(error);
      }
}

export const deleteReservation = async (id, token) => {
    try {
      const singleProductResponse = await fetch(`${API_URL}/reservations/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      await singleProductResponse.json();
    } catch (e) {
      console.error(e);
    }
    // write GET books/:bookId
    // return book from this function
  };
// hit /api/cart in url,create cart