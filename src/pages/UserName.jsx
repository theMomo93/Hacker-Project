import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function UserName() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userName = new URLSearchParams(location.search).get('name');
  
        console.log((userName)); // Convert to string before logging
  
        const userResponse = await fetch(`https://hn.algolia.com/api/v1/search?tags=author_${userName}`);
        const userData = await userResponse.json();
  
        setUserData(userData);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [location.search]);

  let totalPoints = 0;

if (Array.isArray(userData.hits)) {
  userData.hits.forEach((item) => {
    if (item.points) {
      totalPoints += item.points;
    }
  });
}

  function formatMonthYear(dateString) {
    const options = { year: 'numeric', month: 'long' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }
  return (
    <div>
       
      {loading ? (
        <h1 className='loading'>PAGE LOADING ...</h1>
      ) : (
        <div className='profile'>
    
   
  <div className="userPara">
    <p> <strong>Author:</strong> <span style={{ color: 'lightgray' }}>{userData.hits[0].author}</span></p>
    <p> <strong>Karma: </strong><span style={{ color: 'lightgray' }}> {totalPoints}</span></p>
    <p><strong>Created at:</strong> <span style={{ color: 'lightgray' }}>{formatMonthYear(userData.hits[userData.hits.length - 1].created_at)}</span></p>
    <p> <strong>Number of comments:</strong> <span style={{ color: 'lightgray' }}>{userData.hits[0].num_comments}</span></p>
  </div>
  <h2 className ="userName-titles">Contributions:</h2>
  <ul>
    <div className='userTitles'>
    {userData.hits.map((item) => (
      <li key={item.objectID}>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      </li>
      
    ))}
    </div>
  </ul>
  

          <button onClick={() => navigate('/')}>Go back to Home</button>
        </div>
      )}
    </div>
  );
}