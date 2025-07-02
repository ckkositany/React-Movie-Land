import React, {useEffect, useState} from "react";
import './App.css'
import SearchIcon from './Search.svg'
import MovieCard from "./MovieCard";
const API_URL = process.env.REACT_APP_API;



function App() {
        //handles state of feteched movies
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm]= useState("")

    //function to handle movie fetching from api 
  async  function searchMovie(title) {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data=  await response.json()
        setMovies(data.Search)
        console.log(data.Search)
    }


    useEffect(()=>{
            
    }, [])
    
    function handleChange(event){
        const search = event.target.value
        setSearchTerm(previousSearch =>{
            return (
                previousSearch,
                search
            )
            
            
        })
        
    }

    function handleSearchClick() {
        searchMovie(searchTerm);
        setSearchTerm("");
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
                                return  <MovieCard key={index} movie={movie}  />
                                
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

         {/* <div className="container">
            <MovieCard movie={movieResult}/>
         </div> */}
         </div>
        
    )
}

export default  App