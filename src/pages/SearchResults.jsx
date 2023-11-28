import React from 'react'
import { useLocation } from 'react-router-dom';
import { SearchBar } from '../component/SearchBar';

export default function SearchResults() {
    const { state } = useLocation();
    const searchResults = state && state.searchResults;
  
    return (
      <div>
        <h2 className='title-container'>Search Results</h2>
        <div className='article-container'>
          {searchResults && searchResults.hits && (
            <ol className='list-container'>
              {searchResults.hits.map((hit) => {

                const createdAtDate = new Date(hit.created_at);
                const currentDate = new Date();
                const timeDifference = currentDate - createdAtDate;
                const hoursDifference = timeDifference / (1000*60*60)
                console.log(hoursDifference)
                return (
                  <li key={hit.id}>
                 {hit.title}
                  <div className='list-items'>
                   <p>{hit.points} points </p>
                  <p>|</p>
                 <p>{hit.author}</p>
                 <p>|</p>
                 <p>{hoursDifference.toFixed(0)} hours ago</p>
                 <p>|</p>
                 <p>Hide </p>
                 <p>|</p>
                  <p>{hit.num_comments} Comments</p>
                  <p>|</p>
                </div>
              </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    );
  }
  