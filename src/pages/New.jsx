import React, { useState, useEffect } from 'react';



export function New() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('http://hn.algolia.com/api/v1/search_by_date?tags=story');
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
        <p key={item.id}> {item.num_comments} comments </p>      
        <p>|</p>
        </div>
        </li>
      ))}

      </ol>
      
    </div>
    </div>
  );
}
