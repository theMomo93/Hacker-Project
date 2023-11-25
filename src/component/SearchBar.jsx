import React from 'react'
import {useState, useEffect} from 'react'

export function SearchBar() {
  const [search, setSearch] = useState({});

  useEffect(() =>{
    fetch('')
    .then((response) => response.json())
    .then((data) =>setSearch(data))
    .catch((error) => console.log("Error fetching Data: ", error))
  })
  return (
    <div>
        <p>Search Bar</p>
        <input type="text" />
        <button>Search</button>


    </div>
  )
}
