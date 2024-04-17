const uuid = require("uuid");
const bcrypt = require("bcrypt");
const client = require("../client.js");

const fetchProducts = async () => {
  try {
    const FETCH_PRODUCT_SQL = `SELECT * FROM products;`;
    const fetchProductResponse = await client.query(FETCH_PRODUCT_SQL);
    return fetchProductResponse.rows;
  } catch (e) {
    throw new Error(e);
  }
};

const fetchProductById = async (id) => {
  try {
    const FETCH_PRODUCT_BY_ID_QUERY = `
    SELECT * FROM products
    WHERE id = $1;
    `;
    const { rows } = await client.query(FETCH_PRODUCT_BY_ID_QUERY, [id]);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

const createProductService = async ({name, is_available, qty, category, description, image, price, is_featured}) => {
  try {
    const CREATE_PRODUCT_SQL_STR = `
        INSERT INTO products(id,name,is_available,qty,category,description,image,price,is_featured) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *;
        `;
    const createProductResponse = await client.query(CREATE_PRODUCT_SQL_STR, [
      uuid.v4(),
      name,
      is_available,
      qty,
      category,
      description,
      image,
      price,
      is_featured
    ]);
    return createProductResponse.rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

const fetchCartProductsByCartId = async (cartId) => {
  const SQL = `
  SELECT *
  FROM cart_products
  WHERE cart_id = $1;`
  const query = await client.query(
    SQL,
    [cartId]
  )
  return query.rows
}

const createCartProduct = async ({ cartId, productId, qty }) => {
  try {
    const CREATE_CARTPRODUCT_SQL_STR = `
    INSERT INTO cart_products(cart_id, product_id, qty) VALUES($1,$2,$3) RETURNING *;
    `;
    const createCartProductsResponse = await client.query(
      CREATE_CARTPRODUCT_SQL_STR,
      [cartId, productId, qty]
    );
    return createCartProductsResponse.rows[0];
  } catch (error) {
    throw new Error("CANT FIND IT");
  }
};

const validateProductAmount = async ({ productId, qty }) => {
  try {
    const VALIDATE_SQL_STR = `SELECT * from products WHERE id = $1;`;
    const validateProductAmtRes = await client.query(VALIDATE_SQL_STR, [
      productId,
    ]);
    if (validateProductAmtRes.rows[0].qty < qty) {
      throw new Error("Amount being request exceeds inventory");
    }

    return validateProductAmtRes.rows[0];
  } catch (e) {
    throw new Error("AMOUNT BEING REQUESTED EXCEEDS INVENTORY");
  }
};

//Subtracting from products table to add to cartsProduct Table
const addProductToCartProducts = async ({ productId, qty }) => {
  const UPDATE_PRODUCT_SQL_STR = `UPDATE products
  SET qty = qty - $1, is_available = (CASE WHEN qty - $1 > 0 THEN true ELSE false END) WHERE id = $2 RETURNING *`;
  const updateProductRes = await client.query(UPDATE_PRODUCT_SQL_STR, [
    qty,
    productId,
  ]);
  if (!updateProductRes)
    throw new Error("something went wrong in UpdateProduct");
  return updateProductRes.rows[0];
};

const updateCartProducts = async ({ cartId, productId, qty }) => {
  if (qty === 0) {
    const DELETE = `DELETE from cart_products
    where cart_id = $1 AND product_id = $2 RETURNING *;`;
    const deletedRow = await client.query(DELETE, [cartId, productId]);
    return deletedRow.rows[0];
  }
  const UPDATE =
    "INSERT INTO cart_products (cart_id, product_id, qty) VALUES ($1, $2, $3) ON CONFLICT (cart_id, product_id) DO UPDATE SET qty = $3 WHERE $3 > 0 RETURNING *;";
  const res = await client.query(UPDATE, [cartId, productId, qty]);
  return res.rows[0];
};

module.exports = {
  fetchProducts,
  createProductService,
  fetchProductById,
  createCartProduct,
  validateProductAmount,
  addProductToCartProducts,
  updateCartProducts,
  fetchCartProductsByCartId,
};
