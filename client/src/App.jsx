import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import { TokenContext } from './TokenContext.js'
import Heading from './components/Heading.jsx'
import Nav from "./components/Nav.jsx"
import Products from "./components/Products.jsx"
import Cart from "./components/Cart.jsx"
import SingleProduct from "./components/SingleProduct.jsx"
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import AllProducts from './components/AllProducts.jsx'
import Categories from './components/Categories.jsx'
import OrderConfirmation from './components/messages/OrderConfirmation.jsx'
import RegisterConfirmation from './components/messages/RegisterConfirmation.jsx'
import CartError from './components/messages/CartError.jsx'
import LoginError from './components/messages/LoginError.jsx'
import RegisterError from './components/messages/RegisterError.jsx'
import "./App.css"

function App() {
  const [token, setToken] = useState(null)

  return (
    <div id="container">
      <TokenContext.Provider value={[token, setToken]}>
        <Heading />
        <Nav />
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/:id' element={<SingleProduct />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/all_products' element={<AllProducts />} />          
          <Route path='/messages/order_confirmation' element={<OrderConfirmation />} />          
          <Route path='/messages/register_confirmation' element={<RegisterConfirmation />} />          
          <Route path='/messages/cart_error' element={<CartError />} />          
          <Route path='/messages/login_error' element={<LoginError />} />          
          <Route path='/messages/register_error' element={<RegisterError />} />          
        </Routes>
      </TokenContext.Provider>
    </div>
  )
}

export default App
