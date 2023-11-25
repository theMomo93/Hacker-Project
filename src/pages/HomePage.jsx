import React, { useState, useEffect } from 'react';
import { Navbar } from '../component/Navbar';


export function HomePage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('https://hn.algolia.com/api/v1/search?query=react');
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
    <Navbar/>
  </div>
    <div className='article-container'>
        
        <ol className='list-container'>

        {news.map((item) => (
        <li key={item.id}>{item.title}
        <div className='list-items'>
        <p>Hide </p>
        <p>|</p>
        <p key={item.id}>  {item.num_comments} comments </p>
        <p>|</p>
        </div>
        </li>
      ))}

      </ol>
      
    </div>
    </div>
  );
}
