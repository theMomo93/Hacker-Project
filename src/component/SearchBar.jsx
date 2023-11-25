import React, { useState, useEffect } from 'react';

export function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [searchResults, setSearchResults] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${searchInput}&tags=${selectedTag}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    if (searchButtonClicked) {
      fetchData();       // Reset the search button state after fetching data

      setSearchButtonClicked(false);
    }
  }, [searchInput, selectedTag, searchButtonClicked]);

  return (
    <div>
      <p>Search Bar</p>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={() => setSearchButtonClicked(true)}>Search</button>
      <select
        name="tags"
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
      >
        <option value="all"></option>
        <option value="story">Story</option>
        <option value="comment">Comment</option>
        <option value="user">User</option>
      </select>
      {searchResults.hits && (
        <div className='search-results'>
        <ul className='list-results'>
          {searchResults.hits.map((hit) => (
            <li key={hit.objectID}>{hit.title}</li>
          ))}
        </ul>
        </div>
      )}
    </div>
  );
}
