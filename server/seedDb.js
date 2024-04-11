const {
  createUserService,
  createUserCart,
} = require("./service/userService.js");
const { createProductService } = require("./service/productService.js");

const seedDb = async () => {
  //SEED USERS
  const [TED, BARNEY, MARSHALL] = await Promise.all([
    createUserService({
      name: "TED",
      email: "TMOSBY@KVD.IO",
      password: "1234567",
      is_admin: false,
    }),
    createUserService({
      name: "BARNEY",
      email: "BSTINSON@KVD.IO",
      password: "1234567",
      is_admin: false,
    }),
    createUserService({
      name: "MARSHALL",
      email: "MERIKSEN@KVD.IO",
      password: "1234567",
      is_admin: false,
    }),
  ]);

  //SEED PRODUCTS
  const [
    GRILLFATHER_APRON,
    LEGO_MILLENNIUM_FALCON,
    SUPER_MARIO_BROS,
    MARIO_KART_8,
    BEST_DAD_EVER_HAT,
    STAR_WARS_SURVIVAL_GUIDE,
    LEGO_INFINITY_GAUNTLET,
    DAD_JOKES_BOOK,
    DAD_FACTS_TUMBLER,
    GEEK_DAD_BOOK,
    DAD_MULTITOOL,
  ] = await Promise.all([
    createProductService({
      name: "GRILLFATHER_APRON",
      is_available: true,
      qty: 10,
      category: "accessories",
      description: "black cooking grilling dad humor apron with two pockets",
      image:
        "https://m.media-amazon.com/images/I/71t11VduLmL._AC_UL480_FMwebp_QL65_.jpg",
      price: 16.99,
      is_featured: true,
    }),
    createProductService({
      name: "LEGO_MILLENNIUM_FALCON",
      is_available: true,
      qty: 10,
      category: "entertainment",
      description:
        "7,541 piece expert starship model building set. Star Wars Millenium Falcon replica. Includes seven minifigs and multiple interactive features",
      image: "https://m.media-amazon.com/images/I/81kmuPJ9IOL._AC_SX679_.jpg",
      price: 849.99,
      is_featured: true,
    }),
    createProductService({
      name: "BEST_DAD_EVER_HAT",
      is_available: true,
      qty: 10,
      category: "accessories",
      description: "gray relaxed fit adjustable dad hat",
      image: "https://m.media-amazon.com/images/I/819yn9bXonL._AC_SX679_.jpg",
      price: 19.99,
      is_featured: true,
    }),
    createProductService({
      name: "GEEK_DAD_BOOK",
      is_available: true,
      qty: 10,
      category: "resources",
      description: "DIY project guide for geek dads to do with their kids",
      image:
        "https://m.media-amazon.com/images/I/41yK8hvjvBL._SX342_SY445_.jpg",
      price: 10.99,
      is_featured: true,
    }),
    createProductService({
      name: "SUPER_MARIO_BROS",
      is_available: true,
      qty: 3,
      category: "entertainment",
      description: "nintendo cartridge",
      image:
        "https://m.media-amazon.com/images/I/81AFwmGOQLL._AC_UY327_FMwebp_QL65_.jpg",
      price: 19.99,
      is_featured: false,
    }),
    createProductService({
      name: "MARIO_KART_8",
      is_available: true,
      qty: 6,
      category: "entertainment",
      description: "mario kart 8 wii disc",
      image:
        "https://m.media-amazon.com/images/I/81iJG2js5-S._AC_UY327_FMwebp_QL65_.jpg",
      price: 39.99,
      is_featured: false,
    }),
    createProductService({
      name: "STAR_WARS_SURVIVAL_GUIDE",
      is_available: true,
      qty: 10,
      category: "resources",
      description: "How Not to Get Eaten by Ewoks, hardcover",
      image:
        "https://m.media-amazon.com/images/I/81d0o1b3iGL._AC_UY327_FMwebp_QL65_.jpg",
      price: 8.99,
      is_featured: false,
    }),
    createProductService({
      name: "LEGO_INFINITY_GAUNTLET",
      is_available: true,
      qty: 3,
      category: "entertainment",
      description:
        "Marvel Avengers Infinity Gauntlet replica, 590 pieces, building set",
      image:
        "https://m.media-amazon.com/images/I/61iPG6i1miL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      price: 69.99,
      is_featured: false,
    }),
    createProductService({
      name: "DAD_JOKES_BOOK",
      is_available: true,
      qty: 6,
      category: "resources",
      description: "over 350 cringe-worthy dad jokes, hardcover",
      image: "https://m.media-amazon.com/images/I/81tDUnAboDL._SY522_.jpg",
      price: 12.99,
      is_featured: false,
    }),
    createProductService({
      name: "DAD_FACTS_TUMBLER",
      is_available: true,
      qty: 10,
      category: "accessories",
      description:
        "20 oz tumbler, dark gray, humor, dad nutrition facts, best dad ever",
      image: "https://m.media-amazon.com/images/I/811jScaN0+L._AC_SX679_.jpg",
      price: 19.99,
      is_featured: false,
    }),
    createProductService({
      name: "DAD_MULTITOOL",
      is_available: true,
      qty: 3,
      category: "gadgets",
      description:
        "6-inch multitool, Best Dad Ever inscription on case, screwdriver, wirecutter/stripper, plier",
      image: "https://m.media-amazon.com/images/I/81wNKxIs81L._AC_SX425_.jpg",
      price: 19.99,
      is_featured: false,
    }),
    createProductService({
      name: "MAGNETIC_WRISTBAND",
      is_available: true,
      qty: 6,
      category: "gadgets",
      description: "wrist magnet tool belt and screw holder",
      image: "https://m.media-amazon.com/images/I/81yZF2rN4VL._AC_SX679_.jpg",
      price: 16.99,
      is_featured: false,
    }),
  ]);

  //SEED CARTS
  const [TED_CART, BARNEY_CART, MARSHALL_CART] = await Promise.all([
    createUserCart({ user_id: TED.id }),
    createUserCart({ user_id: BARNEY.id }),
    createUserCart({ user_id: MARSHALL.id }),
  ]);

  //SEED CART_PRODUCTS
  console.log({ cartId: TED_CART.id, productId: GRILLFATHER_APRON.id });
  // 468116b4-81c2-41d6-96f7-ae0f4e32842e dba7dd48-0275-46bd-9547-bd2aac3d9888
};

module.exports = seedDb;
