const uuid = require("uuid");
const bcrypt = require("bcrypt");
const client = require("../client.js");
const jwt_secret = require("../config.js");
const jwt = require("jsonwebtoken")

const fetchUsers = async () => {
  try {
    const FETCH_USER_SQL = `SELECT * FROM users;`;
    const fetchUserResponse = await client.query(FETCH_USER_SQL);
    return fetchUserResponse.rows;
  } catch (e) {
    throw new Error(e);
  }
};

const createUserService = async ({ name, email, password, is_admin }) => {
  try {
    const CREATE_USER_SQL_STR = `
        INSERT INTO users(id,name,email,password,is_admin) VALUES($1,$2,$3,$4,$5) RETURNING *;
        `;
    const createUserResponse = await client.query(CREATE_USER_SQL_STR, [
      uuid.v4(),
      name,
      email,
      await bcrypt.hash(password, 5),
      is_admin,
    ]);
    return createUserResponse.rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

const createCart = async () => {
  try {
    const CREATE_CART_SQL = `
      INSERT INTO carts(id) VALUES($1) RETURNING *;
    `;
    const createCart = await client.query(CREATE_CART_SQL, [
      uuid.v4()
    ]);
  } catch (e) {
    throw new Error(e);
  }
}

const createUserCart = async ({ user_id }) => {
  try {
    const CREATE_CART_SQL = `
      INSERT INTO carts(id,user_id) VALUES($1,$2) RETURNING *;
    `;
    const createUserCart = await client.query(CREATE_CART_SQL, [
      uuid.v4(),
      user_id,
    ]);
    return createUserCart.rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

const fetchCartByUserId = async ({ user_id }) => {
    const FETCH_CART_SQL = `
      SELECT id FROM carts WHERE user_id = $1`
      const cartResponse = await client.query(FETCH_CART_SQL, [ user_id ])
      return cartResponse.rows[0]
  }

const authenticateUser = async ({ email, password }) => {
  const SQL = `SELECT id, password, is_admin from users WHERE email = $1`;
  const response = await client.query(SQL, [email]);
  if (
    !response.rows.length ||
    (await bcrypt.compare(password, response.rows[0].password) === false)
  ) {
    const error = new Error("not authorized");
    error.status = 401;
    throw error;
  }
  const token = await jwt.sign(
    {
      id: response.rows[0].id,
      is_admin: response.rows[0].is_admin
    },
    jwt_secret
  );
  return { token };
};

//isLoggedIn
const fetchUserByTokenId = async(token)=> {
  let user;
  try{
    
    token = token.split(" ")[1]
    const payload = jwt.verify(token, jwt_secret);
    user = payload
    return user;

  }catch(ex){
    console.error(ex)
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
};


module.exports = {
  fetchUsers,
  createUserService,
  createUserCart,
  authenticateUser,
  fetchCartByUserId,
  createCart,
  fetchUserByTokenId
};
