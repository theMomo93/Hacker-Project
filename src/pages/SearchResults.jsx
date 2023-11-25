import React from 'react'
import { useLocation } from 'react-router-dom';
import { SearchBar } from '../component/SearchBar';


export default function SearchResults() {
    const { state } = useLocation();
    const searchResults = state && state.searchResults
  return (
    <div>
        <h2>Search Results</h2>
        {searchResults && searchResults.hits && (
            <ul>
                {searchResults.hits.map((hit) => (
                    <li key={hit.objectID}>{hit.title}</li>
                ))}
            </ul>
        )}
    </div>
  )
}
