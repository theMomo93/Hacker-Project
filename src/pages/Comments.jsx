import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);   //for creating Load More button
  const navigate = useNavigate();


  const convertHtmlEntities = (htmlString) => {
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(htmlString, 'text/html');
    return parsedHTML.body.textContent;
  };

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=comment&page=${page}`);
        const data = await response.json();

        // Filter current date
        const currentDate = new Date();
        const currentDateString = currentDate.toISOString().split('T')[0]; // Get YYYY-MM-DD part
        const currentComments = data.hits.filter(item => item.created_at.startsWith(currentDateString));

        // Sort the filtered comments by updated_at
        const sortedComments = currentComments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setComments((prevComments) => [...prevComments, ...sortedComments]); //this loads all  comments and sorted comments with ... dots
        setLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }

    getData();
  }, [page]); // runs on change(click)

  function handleClick(userName) {
    navigate(`/userName?name=${encodeURIComponent(userName)}`);
  }

  const handleLoadMore = () => { // that I had to google but set the page to page+1 so it doesnt repeat
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      {loading ? (
        <h1 className='loading'>PAGE LOADING ...</h1>
      ) : (
        <div className='comments-container'>
          <ol className='list-comments-container'>
            {comments.map((item) => {
              const createdAtDate = new Date(item.updated_at);
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
                <li className='comments-titles' key={item.story_id}>
                  {convertHtmlEntities(item.comment_text)}

                  <div className='comments-items'>
                  <p >{item.story_id} story Id |</p>
                  <p onClick={() => handleClick(item.author)}> {item.author}</p>
                  <p > {currentTime.toFixed(0)} {dating} ago |</p>
                  

                    <p >
                      <a href={item.story_url || '#'} target="_blank" rel="noopener noreferrer">
                        {item.story_title}
                      </a>
                    </p>
                  </div>
                </li>
              );
            })}
            <button className='loadMore-button' onClick={handleLoadMore}>Load More...</button> {/*THe button and function that handles the click*/}
          </ol>
        </div>
      )}
    </div>
  );
}
