import React from 'react'
import { useLocation } from 'react-router-dom';
import { SearchBar } from '../component/SearchBar';


export default function SearchResults() {
    const { state } = useLocation();
    const searchResults = state && state.searchResults


  return (
    <div>
    <h2 className='title-container'>Search Results</h2>
    <div className='article-container'>
   
        {searchResults && searchResults.hits && (
            <ol className='list-container'>
                {searchResults.hits.map((hit) => (
                    <li key={hit.objectID}>
                    {hit.title}
                        <div className='list-items'>
                        <p key={hit.objectIDid}>{hit.points} points </p>
                        <p>|</p>
                        <p key={hit.objectIDid}> {hit.author}</p>
                        <p>|</p>
                        <p key={hit.objectIDid}>{} hours ago</p>
                        <p>|</p>
                        <p>Hide </p>
                        <p>|</p>
                        <p key={hit.objectIDid}> {hit.num_comments} Comments</p>
                        <p>|</p>
                        </div>
                    </li>
                ))}
            </ol>
        )}
    </div>
    </div>
  )
}
