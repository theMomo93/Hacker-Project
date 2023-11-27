import React, { useState, useEffect } from 'react';

export function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

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

        setComments((prevComments) => [...prevComments, ...sortedComments]);
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
        <h1 className='loading'>PAGE LOADING ...</h1>
      ) : (
        <div className='comments-container'>
          <ol className='list-comments-container'>
            {comments.map((item) => {
              const createdAtDate = new Date(item.created_at);
              const currentDate = new Date();
              const timeDifference = currentDate - createdAtDate;
              const hoursDifference = timeDifference / (1000 * 60 * 60);

              return (
                <li className='comments-titles' key={`${item.story_id}-${item.story_id}`}>
                  {convertHtmlEntities(item.comment_text)}

                  <div className='comments-items'>
                    <p key={item.story_id}>{item.story_id} story Id |</p>
                    <p key={item.story_id}> {item.author} |</p>
                    <p key={item.story_id}> {hoursDifference.toFixed(0)} hours ago |</p>

                    <p key={item.story_id}>
                      <a href={item.story_url || '#'} target="_blank" rel="noopener noreferrer">
                        {item.story_title}
                      </a>
                    </p>
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
