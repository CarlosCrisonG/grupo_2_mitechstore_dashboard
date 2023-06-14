import { Routes, Route } from "react-router-dom"
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/Home/Home'
import Error from './components/Error'
import SideMenu from './components/SideMenu/SideMenu'
import Users from "./pages/Users/Users"
import UserProfile from "./pages/Users/UserProfile"
import Products from "./pages/Products/Products"
import PorductDetail from "./pages/Products/ProductDetail"
import Categories from "./pages/Categories/Categories"

function App() {
  return (
    <>
      <div id="wrapper">
      {/* <!-- Sidebar --> */}
      <SideMenu />
      {/* <!-- End of Sidebar --> */}

      {/* <!-- Content Wrapper --> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/userProfile" element={<UserProfile />}/>
        <Route path="/products" element={<Products />} />
        <Route path="/productDetail" element={<PorductDetail />}/>
        <Route path="/categories" element={<Categories />} />
        <Route path="*" element={<Error />} /> {/* 404 Route */}
      </Routes>
      {/* <!-- End of Content Wrapper --> */}
    </div>
    </>
  )
}

export default App
