import React, { useState, useEffect } from 'react';

export function HomePage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`https://hn.algolia.com/api/v1/search?tags=front_page&page=${page}`);
        const data = await response.json();
        setNews((prevNews) => [...prevNews, ...data.hits]);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }

    getData();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      {loading ? (
        // Show loading message or spinner
        <h1 className='loading'>PAGE LOADING ...</h1>
      ) : (
        <div className='article-container'>
          <ol className='list-container'>
            {news.map((item) => {
              // calculations inside the loop
              const createdAtDate = new Date(item.created_at);
              const currentDate = new Date();
              const timeDifference = currentDate - createdAtDate;
              const hoursDifference = timeDifference / (1000 * 60 * 60);
              
              let currentTime
              let dating
              if( hoursDifference < 1 ){
                  currentTime = hoursDifference
                  dating = "Hour"
              }
              else if( hoursDifference <= 24 && hoursDifference > 1){
                  currentTime = hoursDifference
                  dating = "Hours" // this define hours
              }
              else if (hoursDifference < 168){
                  currentTime = hoursDifference / 24 // this defines days
                  dating = "Days"
              }
              else if(hoursDifference >= 168  && hoursDifference < 730 ){
                 currentTime = hoursDifference / 168 // this defines weeks
                  dating = "Weeks"
              } else if ( hoursDifference > 730 && hoursDifference < 8760){
                  currentTime = hoursDifference / 730 // this defines months
                  dating = "Months"
              }
              else if (hoursDifference >= 8760 ){ // this defines years
                  currentTime = hoursDifference / 8760;
                  dating = "Years"
              }
              return (
                <li key={item.id}>
                  <a className='homePage-titles' href={item._highlightResult?.url?.value || '#'} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                  <div className='list-items'>
                    <p key={item.id}>{item.points} points </p>
                    <p>|</p>
                    <p key={item.id}> {item.author}</p>
                    <p>|</p>
                    <p key={item.id}>{currentTime.toFixed(0)} {dating} ago</p>
                    <p>|</p>
                    <p>Hide </p>
                    <p>|</p>
                    <p key={item.id}> {item.num_comments} Comments</p>
                    <p>|</p>
                  </div>
                </li>
              );
            })}
            <button className='loadMore-button' onClick={handleLoadMore}>Load More...</button>
          </ol>
          
        </div>
      )}
    </div>
  );
}
