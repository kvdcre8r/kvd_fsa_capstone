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
        </Routes>
      </TokenContext.Provider>
    </div>
  )
}

export default App
