import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


export function Past() {
  const [past, setPast] = useState(null);
  const [start, setStart] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();


  const getData = async () => {
    setLoading(true);

    try {
      const response = await fetch(`https://hn.algolia.com/api/v1/search?query=${start}`);
      const data = await response.json();

      if (response.ok) {
        setPast(data);
      } else {
        console.log("Error fetching data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  function handleClick(userName) {
    navigate(`/userName?name=${encodeURIComponent(userName)}`);
  }

  const handleSearch = () => {
    if (start) {
      setButtonClicked(true);
      getData();
    }
  };

  return (
    <div>
      {loading ? (
        // Show loading message or spinner
        <h1 className="loading">PAGE LOADING ...</h1>
      ) : (
        <>
          <br />
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="start"
            pattern="\d{4}-\d{2}-\d{2}" // Pattern for yyyy-mm-dd from chatGPT of course
          />
          <button onClick={handleSearch}>Search</button>

          {buttonClicked && (
            <>
              {loading ? (
                <h1 className="loading">PAGE LOADING ...</h1>
              ) : (
                past && past.hits && (
                  <div className="article-container">
                    <ol className="list-container">
                      {past.hits.map((item) => {
                        // Check if item.title is not empty
                        if (!item.title) {
                          return null; // Skip rendering if title is empty
                        }

                        // Calculations inside the loop
                        const createdAtDate = new Date(item.created_at);
                        const currentDate = new Date();
                        const timeDifference = currentDate - createdAtDate;
                        const hoursDifference = timeDifference / (1000 * 60 * 60);

                        return (
                          <li className="past-list-items" key={item.objectID}>
                            {item.url ? (
                              <a href={item.url} target="_blank" rel="noopener noreferrer">
                                {item.title}
                              </a>
                            ) : (
                              <span>{item.title}</span>
                            )}
                            <div className="past-items">
                              <p >{item.points} points </p>
                              <p>|</p>
                              <p onClick={() => handleClick(item.author)}> {item.author}</p>
                              <p>|</p>
                              <p >{hoursDifference.toFixed(0)} hours ago</p>
                              <p>|</p>
                              <p>Hide </p>
                              <p>|</p>
                              <p > {item.num_comments} Comments</p>
                              <p>|</p>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                )
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
