import React, { useState, useEffect } from 'react';

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
  }, []);

  return (
    <ol>
     {news.map((item) => (
        <li key={item.objectID}>{item.title}</li>
      ))}
    </ol>
  );
}
