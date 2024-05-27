import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Header from "./components/Header";
import SearchArea from './pages/SearchPage';
import Cart from './components/Cart';
import About from './pages/About'

function App() {

  return (
    <div>
      < Header />
      <Routes> 
        <Route path="/" element={< SearchArea />} />
        <Route path="/about" element={< About />} />
      </Routes>
      
      {/* < Cart /> */}
    </div>
  )
}

export default App
