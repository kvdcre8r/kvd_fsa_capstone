//IMPORTS
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const path = require("path");
const client = require("./client.js");
const SCHEMA = require("./schema.js");
const seedDb = require("./seedDb.js");

//SERVICES
const {
  fetchUsers,
  createUserService,
  authenticateUser,
  createUserCart,
  fetchCartByUserId,
  createCart,
  fetchUserByTokenId,
} = require("./service/userService.js");
const {
  fetchProducts,
  fetchProductById,
  createCartProduct,
  validateProductAmount,
  addProductToCartProducts,
  removeProductFromCartProducts,
  updateCartProducts,
  fetchCartProductsByCartId,
  checkout
} = require("./service/productService.js");

//MIDDLEWARE
const isLoggedIn = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    req.user = await fetchUserByTokenId(req.headers.authorization);
    console.log(req.user);
    next();
  } catch (ex) {
    next(ex);
  }
};

app.use(express.json());
app.use(require("morgan")("dev"));
// STATIC ROUTES
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/dist/index.html"))
);

// APP ROUTES
app.get("/api/products", async (req, res, next) => {
  try {
    const productResponse = await fetchProducts();
    res.send(productResponse);
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await fetchProductById(id);
    res.send(product);
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/users", async (req, res, next) => {
  try {
    const userReponse = await fetchUsers();
    res.send(userReponse);
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/users/register", async (req, res, next) => {
  try {
    const newUser = await createUserService(req.body);
    res.send(newUser);
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/users/login", async (req, res, next) => {
  try {
    res.send(await authenticateUser(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/cart", isLoggedIn, async (req, res, next) => {
  try {
    let cart = await fetchCartByUserId({ user_id: req.user.id });

    const productInCart = await fetchCartProductsByCartId(cart.id);

    const productPromises = productInCart.map(
      async ({ product_id }) => await fetchProductById(product_id)
    );
    const productNames = (await Promise.all(productPromises)).map(
      (product) => product.name
    );
    console.log(productNames);
    const products = productInCart.map((product, i) => {
      return {
        ...product,
        name: productNames[i],
      };
    });

    res.send(products);
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/cart", isLoggedIn, async (req, res, next) => {
  try {
    let cart = await fetchCartByUserId({ user_id: req.user.id });
    if (!cart) {
      cart = await createUserCart({ user_id: req.user.id });
    }
    const cartProductRes = await createCartProduct({
      cartId: cart.id,
      productId: req.body.productId,
      qty: req.body.qty,
    });
    res.send(cartProductRes);
  } catch (error) {
    console.error(error);
  }
});

app.post(
  "/api/cart/:cartId/product/:productId",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const { cartId, productId } = req.params;
      const { qty } = req.body;
      if ((await validateProductAmount({ productId, qty })) === false) {
        res.send(new Error("NOT ENOUGH QUANTITIES"));
      }
      const updatedProd = await addProductToCartProducts({ productId, qty }); // SHOULD
      console.log({ updatedProd }, "THIS IS WHAT WE UPDATED");
      res.send(await createCartProduct({ cartId, productId, qty }));
    } catch (ex) {
      next(ex);
    }
  }
);

app.put(
  "/api/cart/:cartId/product/:productId",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const { cartId, productId } = req.params;
      const { qty } = req.body;
      res.send(await updateCartProducts({ cartId, productId, qty }));
    } catch (e) {
      next(e);
    }
  }
);

app.delete(
  "/api/cart/:cartId",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const {cartId} = req.params;
      await checkout({cartId});
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
)

//INIT FUNCTION
const init = async () => {
  await client.connect();
  await client.query(SCHEMA);

  await seedDb();
  // console.log("data seeded");

  const users = await fetchUsers();
  // console.log({ users });
  const products = await fetchProducts();
  // console.log({ products });

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
