import React, { useState, useRef} from "react";
import './App.css'
import SearchIcon from './Search.svg'
import MovieCard from "./MovieCard";
import FullDetailMovie from "./FullDetailMovie"
import FeaturedMovies from "./FeaturedMovies"
import {motion} from "framer-motion"
import Loader from "./Loader";
const API_URL = process.env.REACT_APP_API;
const YOUTUBE_API= process.env.REACT_APP_YOUTUBE_API_KEY;
const YOUTUBE_URL=process.env.REACT_APP_YOUTUBE_URL


function App() {
        //handles state of feteched movies
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm]= useState("")
    const [fullDetail, setFullDetail]= useState([])
    const [searchSubmitted, setSearchSubmitted] = useState(false)
    const [initialLoad, setInitialLoad] = useState(true);

    //function to handle rating
    async function getFullDetail(movieTitle,year) {
        const response= await fetch(`${API_URL}&t=${movieTitle}&y=${year}`)
        const resData= await response.json()
        setFullDetail(resData)
        console.log("Full details after click",resData.Director)
    }

    //function to handle movie fetching from api 
  async  function searchMovie(title) {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data=  await response.json()
        setMovies(data.Search)
        //console.log(data.Search)
    }


   
    function handleChange(event){
        const search = event.target.value
        setSearchTerm(previousSearch =>{
            return (
                previousSearch,
                search
            )
            
            
        })
        
    }
    //getMovieTrailer id
    async function getMovieTrailer(movieTitle) {
        try {
            const response = await fetch(`${YOUTUBE_URL}&q=${encodeURIComponent(movieTitle + " trailer")}&key=${YOUTUBE_API}`);

            const data = await response.json();
            // console.log("Raw YouTube Data:", data); // 💥 See what you're actually getting

            

            if (data.items && data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            console.log('Requested movie Id',videoId);
            
            return videoId;
            } else {
            console.warn("No trailer found for", movieTitle);
            return null;
            }
        } catch (error) {
            console.error("Error fetching trailer:", error);
            return null;
        }
}


   
    const resultsRef= useRef()

    function handleSearchClick() {
       if (searchTerm.trim() !== "") {
    setSearchSubmitted(true)
    searchMovie(searchTerm);
  }
  setSearchTerm("");
   setTimeout(() => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 200); // Wait for DOM to render
    }
   

    function handleMovie(mTitle,mYear) {
            getFullDetail(mTitle,mYear)
        //console.log(mTitle, mYear);
        
    }
       
   return (
  <div className="app">
    <h1>Movie Land</h1>

    {/* 🔍 Search Input (Always Showed) */}
    <div className="search">
      <input
        placeholder="Enter name of the movie"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={(e)=>{
          if (e.key === "Enter") {
             setInitialLoad(false)
            handleSearchClick()
           
          }
        }}
      />
      <img
        src={SearchIcon}
        alt="search icon"
        onClick={()=>{
          setInitialLoad(false)
          handleSearchClick()
        }}
      />
    </div>
        {/* Handles trending movies */}
   
        {/* <FeaturedMovies onDetail={handleMovie} /> */}
    {/* 🎬 Full Movie Detail (When Clicked) */}
    {fullDetail && fullDetail.Title ? (
      <div>
        <button className="back-button" onClick={() => setFullDetail(null)} style={{ marginBottom: "1rem" }}>
          ← Go Back
        </button>
        <FullDetailMovie fullMovie={fullDetail} onTrailer={getMovieTrailer} />
      </div>
    ) : (
      <>
          {/* ✅ Show featured movies only if it's initial load */}
            {initialLoad && (
        <section className="trending-section">
          <motion.h2
  className="trending-title"
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  🎬 Trending Right Now
</motion.h2>
          <FeaturedMovies onDetail={handleMovie} />
        </section>
      )}

        {/* Only show results or "not found" if user submitted a search */}
        {searchSubmitted && (
          movies?.length > 0 ? (
            <div className="container" ref={resultsRef}>
              {movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} onDetail={handleMovie} />
              ))}
            </div>
          )  : (
              <div className="empty">
                <h2>No movie found!!</h2>
              </div>
            )
        )}
      </>
    )}
  </div>
);

}

export default  App

