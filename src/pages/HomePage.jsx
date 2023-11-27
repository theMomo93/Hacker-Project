import React, { useState, useEffect } from 'react';

export function HomePage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`https://hn.algolia.com/api/v1/search?query=React&page=${page}`);
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
                    <p key={item.id}>{hoursDifference.toFixed(0)} hours ago</p>
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
