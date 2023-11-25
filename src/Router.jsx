import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Navbar } from './component/Navbar';
import { Footer } from './component/Footer';
import { New } from './pages/New';



function Router() {
 
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/new" element={<New/>}/>

      </Routes>
      <Footer/>
    </BrowserRouter>
  );





}

export default Router
