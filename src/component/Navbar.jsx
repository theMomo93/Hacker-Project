import React from 'react'
import { SearchBar } from './SearchBar'
import { NavLink } from 'react-router-dom'

export function Navbar() {
  return (
    <div className='navbar-elements'>
        
        <div className='navbar-list'>
        <h2><NavLink className={({ isActive }) => (isActive ? 'green' : 'white')}to="/" >Hacker News</NavLink></h2> 
         <NavLink className={({ isActive }) => (isActive ? 'green' : 'white')} to="/new" >New</NavLink><p>|</p>
         <NavLink className={({ isActive }) => (isActive ? 'green' : 'white')}to="/past" >Past</NavLink><p>|</p>
         <NavLink className={({ isActive }) => (isActive ? 'green' : 'white')}to="/comments" >Comments</NavLink><p>|</p>
         <NavLink className={({ isActive }) => (isActive ? 'green' : 'white')}to="/ask" >Ask</NavLink><p>|</p>
         <NavLink className={({ isActive }) => (isActive ? 'green' : 'white')}to="/show" >Show</NavLink><p>|</p>
         <NavLink className={({ isActive }) => (isActive ? 'green' : 'white')}to="/jobs" >Jobs</NavLink><p>|</p>
         <NavLink className={({ isActive }) => (isActive ? 'green' : 'white')}to="/submit" >Submit</NavLink><p>|</p>
        </div>
        
        <SearchBar/>
    </div>
  )
}
