import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Navbar } from './component/Navbar';
import { Footer } from './component/Footer';
import { New } from './pages/New';
import SearchResults from './pages/SearchResults';
import { Submit } from './pages/Submit';
import { Past } from './pages/Past';
import { Comments } from './pages/Comments';


function Router() {
 
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/new" element={<New/>}/>
        <Route path="/submit" element={<Submit/>}/>
        <Route path="/past" element={<Past/>}/>
        <Route path="/comments" element={<Comments/>}/>
        <Route path="SearchResults" element={<SearchResults/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );





}

export default Router
