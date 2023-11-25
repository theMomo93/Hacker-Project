import React from 'react'
import { SearchBar } from './SearchBar'

export function Navbar() {
  return (
    <div className='navbar-elements'>
        <h2>Hacker News</h2>
        <ul>
         <li>New</li>
         <li>Past</li>
         <li>Comments</li>
         <li>Ask</li>
         <li>Show</li>
         <li>Jobs</li>
         <li>Submit</li>
        </ul>
        <SearchBar/>
      
    </div>
  )
}
