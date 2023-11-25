import React, { useState, useEffect } from 'react';

export function HomePage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page');
        const data = await response.json();
        setNews(data.hits);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error);
        
      }
    }

    getData();
  }, []); 

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
                {item.title}
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
        </ol>
      </div>
       )}
    </div>
     
  );
}
