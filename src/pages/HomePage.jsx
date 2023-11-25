import React, { useState, useEffect } from 'react';




export function HomePage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page');
        const data = await response.json();
        setNews(data.hits);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }

    getData();
  }, [news]);

  return (
    <div>
  <div>

  </div>
    <div className='article-container'>
        
        <ol className='list-container'>

        {news.map((item) => (
            
        <li key={item.id}>{item.title}
        <div className='list-items'>
        <p key={item.id}>{item.points} points </p>
        <p>|</p>
        <p key={item.id}> {item.author}</p>
        <p>|</p>
        <p key={item.id}> {item.created_at}</p>
        <p>|</p>
        <p>Hide </p>
        <p>|</p>
        <p key={item.id}> {item.num_comments}Comments</p>      
        <p>|</p>
        </div>
        </li>
      ))}

      </ol>
      
    </div>
    </div>
  );
}
