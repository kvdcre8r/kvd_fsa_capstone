import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import { TokenContext } from './TokenContext.js'
import Heading from './components/Heading.jsx'
import Nav from "./components/Nav.jsx"
import Products from "./components/Products.jsx"
import Account from "./components/Account.jsx"
import SingleProduct from "./components/SingleProduct.jsx"
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
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
          <Route path='/account' element={<Account />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/:id' element={<SingleProduct />} />
        </Routes>
      </TokenContext.Provider>
    </div>
  )
}

export default App
