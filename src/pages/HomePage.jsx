import React from 'react'
import { useState, useEffect } from "react";




export function HomePage() {
    const [news, setNews]=useState({});

    useEffect(()=>{
        async function getData(){
            try{
                const response = await fetch("https://hn.algolia.com/api");
                const data = await response.json();
                setNews(data);
                
            }catch(error){
                console.log("Error fetching random dog image:", error);
            }
          }
            getData();
        },{})

  return (
    <div>HomePage
        <ul>
            <li></li>
        </ul>
    </div>
  )
}
