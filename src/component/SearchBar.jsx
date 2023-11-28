import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [searchResults, setSearchResults] = useState({});
  const navigate = useNavigate(); // new hook, we havent learned yet but essencily help us to link something from one page to another

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${searchInput}`
      );
      const data = await response.json();
      setSearchResults(data);

      navigate('/SearchResults', {state:{searchResults: data}});
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    if (searchButtonClicked) {
      fetchData();       // Reset the search button state after fetching data

      setSearchButtonClicked(false);
    }
  }, [searchInput, searchButtonClicked]);

  return (
    <div className='searchBar'>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={() => setSearchButtonClicked(true)}>Search</button>
      {/*     {searchResults.hits && (
        <ul>
        {searchResults.hits.map((hit) => (
          <li key={hit.objectID}>{hit.title}</li>
        ))}
      </ul>
        )}*/}
    </div>
  );
}
