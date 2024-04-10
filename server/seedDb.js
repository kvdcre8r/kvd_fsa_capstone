const {createUserService, createUserCart} = require('./service/userService.js');
const {createProductService} = require('./service/productService.js')

const seedDb = async () => {
  //SEED USERS
  const [TED, BARNEY, MARSHALL] = await Promise.all([
    createUserService({name:'TED', email:'TMOSBY@KVD.IO', password: '1234567', is_admin: false}),
    createUserService({name:'BARNEY', email:'BSTINSON@KVD.IO', password: '1234567', is_admin: false}),
    createUserService({name:'MARSHALL', email:'MERIKSEN@KVD.IO', password: '1234567', is_admin: false})
  ])

  //SEED PRODUCTS
  const [GRILLFATHER_APRON,LEGO_MILLENNIUM_FALCON,SUPER_MARIO_BROS,MARIO_CART] = await Promise.all([
    createProductService({name:'GRILLFATHER_APRON', is_available:true, qty:10, type:'grilling accessory', description:'black cooking grilling dad humor apron with two pockets', image: 'https://m.media-amazon.com/images/I/71t11VduLmL._AC_UL480_FMwebp_QL65_.jpg' }),
    createProductService({name:'LEGO_MILLENNIUM_FALCON', is_available:true, qty:10, type:'lego set', description:'7,541 piece expert starship model building set', image: 'https://m.media-amazon.com/images/I/81kmuPJ9IOL._AC_SX679_.jpg' }),
    createProductService({name:'SUPER_MARIO_BROS', is_available:true, qty:3, type:'video game', description:'nintendo cartridge' }),
    createProductService({name:'MARIO_CART', is_available:true, qty:6, type:'video game', description:'mario cart wii disc' })
  ])

  //SEED CARTS
  const [TED_CART, BARNEY_CART, MARSHALL_CART] = await Promise.all([
    createUserCart({user_id: TED.id}),
    createUserCart({user_id: BARNEY.id}),
    createUserCart({user_id: MARSHALL.id}),
  ])

  //SEED CART_PRODUCTS
  console.log({cartId: TED_CART.id, productId: GRILLFATHER_APRON.id});
  // 468116b4-81c2-41d6-96f7-ae0f4e32842e dba7dd48-0275-46bd-9547-bd2aac3d9888

}

module.exports = seedDb;