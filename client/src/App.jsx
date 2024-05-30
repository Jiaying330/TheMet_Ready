import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from "./components/Header";
import SearchArea from './pages/SearchPage';
import { CartProvider } from './context/CartContext'
import About from './pages/About'
import CartDetailPage from './pages/CartDetailPage'

function App() {

  return (
    <div>
      <CartProvider>
        < Header />
        <Routes>
          <Route path="/" element={< SearchArea />} />
          <Route path="/about" element={< About />} />
          <Route path="/cart-detail" element={< CartDetailPage />} />
        </Routes>
      </CartProvider>

    </div>
  )
}

export default App
