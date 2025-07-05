import React, {useEffect, useState} from "react";
import './App.css'
import SearchIcon from './Search.svg'
import MovieCard from "./MovieCard";
import FullDetailMovie from "./FullDetailMovie";
const API_URL = process.env.REACT_APP_API;
const YOUTUBE_API= process.env.REACT_APP_YOUTUBE_API_KEY;
const YOUTUBE_URL=process.env.REACT_APP_YOUTUBE_URL
const youTubeParams='&q=You trailer&type=video&key=YOUR_KEY'

const fullMovie={
    "Title": "You",
    "Year": "2018–2025",
    "Rated": "TV-MA",
    "Released": "09 Sep 2018",
    "Runtime": "45 min",
    "Genre": "Crime, Drama, Romance",
    "Director": "N/A",
    "Writer": "Greg Berlanti, Sera Gamble",
    "Actors": "Penn Badgley, Victoria Pedretti, Charlotte Ritchie",
    "Plot": "A dangerously charming, intensely obsessive young man goes to extreme measures to insert himself into the lives of those he is transfixed by.",
    "Language": "English",
    "Country": "United States",
    "Awards": "4 wins & 11 nominations total",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTVlYmRhMWQtNmE0Yi00ODM1LWEzMWEtNTQzZGZhODRmZTE0XkEyXkFqcGc@._V1_SX300.jpg",
    "Ratings": [
        {
            "Source": "Internet Movie Database",
            "Value": "7.6/10"
        }
    ],
    "Metascore": "N/A",
    "imdbRating": "7.6",
    "imdbVotes": "341,394",
    "imdbID": "tt7335184",
    "Type": "series",
    "totalSeasons": "5",
    "Response": "True"
}


function App() {
        //handles state of feteched movies
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm]= useState("")
    //function to handle rating
    async function getFullDetail(movieTitle,year) {
        const response= await fetch(`${API_URL}&t=${movieTitle}&y=${year}`)
        const resData= await response.json()
        console.log(resData)
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
    console.log("Raw YouTube Data:", data); // 💥 See what you're actually getting

    

    if (data.items && data.items.length > 0) {
      const videoId = data.items[0].id.videoId;
      console.log('Yoo',videoId);
      
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


     useEffect(()=>{
          const videoId =  getMovieTrailer("You");

                if (videoId) {
                //const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                // Render iframe or set it to state
                console.log(videoId);
                
                }

    }, [])
    

    function handleSearchClick() {
        searchMovie(searchTerm);
        setSearchTerm("");
    }

    function handleMovie(mTitle,mYear) {
            getFullDetail(mTitle,mYear)
        console.log(mTitle, mYear);
        
    }
       
    return(
        <div className="app">
             <h1>Movie Land</h1>
         <div className="search">
            <input 
                placeholder="Enter name of the movie"
                value={searchTerm}
                onChange={handleChange}

            />
            <img 
                src={SearchIcon} 
                alt="search icon"
                onClick={handleSearchClick}
              />
         </div>
         {
            movies?.length > 0 
                ? (
                    <div className="container">
                        {
                            movies.map((movie,index)=>{
                                console.log(movie,index);
                                return  <MovieCard key={index} movie={movie} onDetail={handleMovie} />
                                
                            })
                        }
                        
                    </div>
                ) 
                : (
                <div className="empty">
                    <h2>No movie found!!</h2>
                </div>
                )
         }     
           <FullDetailMovie fullMovie={fullMovie}  />
           {/* {console.log(videoId)} */}
           
         
         </div>
        
    )
}

export default  App

