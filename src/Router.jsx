import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Navbar } from './component/Navbar';
import { Footer } from './component/Footer';



function Router() {
 
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>

      </Routes>
      <Footer/>
    </BrowserRouter>
  );





}

export default Router
