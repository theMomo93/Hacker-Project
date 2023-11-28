import React from 'react'
import { useLocation } from 'react-router-dom';
import { SearchBar } from '../component/SearchBar';

export default function SearchResults() {
    const { state } = useLocation();
    const searchResults = state && state.searchResults;
  
    return (
      <div>
        <h2 style={{color:'green', fontSize: "50px"}}className='title-container'>Search Results</h2>
        <div className='article-container'>
          {searchResults && searchResults.hits && (
            <ol className='list-container'>
              {searchResults.hits.map((hit) => {

                const createdAtDate = new Date(hit.created_at);
                const currentDate = new Date();
                const timeDifference = currentDate - createdAtDate;
                const hoursDifference = timeDifference / (1000*60*60)
                let currentTime
                let dating
                if( hoursDifference < 1 ){
                    currentTime = hoursDifference
                    dating = "Hour"
                }
                else if( hoursDifference <= 24 && hoursDifference > 1){
                    currentTime = hoursDifference
                    dating = "Hours"
                }
                else if (hoursDifference < 168){
                    currentTime = hoursDifference / 24
                    dating = "Days"
                }
                else if(hoursDifference >= 168  && hoursDifference < 730 ){
                   currentTime = hoursDifference / 168 // this defines weeks
                    dating = "Weeks"
                } else if ( hoursDifference > 730 && hoursDifference < 8760){
                    currentTime = hoursDifference / 730 // this defines months
                    dating = "Months"
                }
                else if (hoursDifference >= 8760 ){
                    currentTime = hoursDifference / 8760;
                    dating = "Years"
                }
             
                return (
                  <li className="titleSearch" key={hit.id}>
                 <a className='search-title' href={hit._highlightResult?.url?.value || '#'} target='_blank' rel='noopener noreferrer'>
                 {hit.title}
                 </a>
                  <div className='list-items'>
                   <p>{hit.points} points </p>
                  <p>|</p>
                 <p>{hit.author}</p>
                 <p>|</p>
                 <p>{currentTime.toFixed(0)} {dating} ago</p>
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
  