import React, {useState,useEffect} from "react";
import axios from "axios"
import MovieCard from "./MovieCard";
import {motion} from "framer-motion"
import Loader from "./Loader"


const API_URL = process.env.REACT_APP_API;
const TMDB_TOKEN=process.env.REACT_APP_TMDB_AUTH


//const featuredTitles = ["Squid Game", "Avengers", "Inception", "Interstellar", "Barbie", "Dune","The Shawshank Redemption", "The Godfather", "The Dark Knight", "Pulp Fiction", "Schindler's List", "The Lord of the Rings: The Return of the King", "12 Angry Men", "Inception", "Star Wars: Episode V - The Empire Strikes Back", "Fight Club", "Forrest Gump", "The Matrix", "Goodfellas", "One Flew Over the Cuckoo's Nest", "Seven", "The Silence of the Lambs", "Saving Private Ryan", "City of God", "Spirited Away", "Life is Beautiful", "Interstellar", "The Green Mile", "Se7en", "The Usual Suspects", "The Lion King", "The Intouchables", "WALL-E", "Gladiator", "The Prestige", "Parasite", "Rear Window", "Casablanca", "Psycho", "Vertigo", "Citizen Kane", "2001: A Space Odyssey", "Singin' in the Rain", "Sunset Boulevard", "E.T. the Extra-Terrestrial", "Back to the Future", "Jaws", "Raiders of the Lost Ark", "Jurassic Park", "Terminator 2: Judgment Day", "The Departed", "Toy Story", "Memento", "Eternal Sunshine of the Spotless Mind", "Oldboy", "Reservoir Dogs", "Léon: The Professional"]
function FeaturedMovies({ onDetail }) {
    const [featured, setFeatured]= useState([])
    const [tmdData, setTmdData]= useState([])
    const [loading, setLoading]= useState(true)

    useEffect(()=>{
        const fetchMovies = async () => {
          try {
          const config = {
            headers: {
               accept: 'application/json',
              Authorization: `Bearer ${TMDB_TOKEN}`
            }
          };

          const response = await axios.get('https://api.themoviedb.org/3/trending/all/day', config); // Replace with your API endpoint
          const data = await response.data
          console.log("Data from TMDB",data.results);
          const resultData= await data.results
          const featuredNames= await resultData.map(obj => obj.name || obj.title || "Unnamed")
          console.log("^^^^^^^^^>>>>>>",featuredNames);
          
          
         setTmdData(featuredNames);
        } catch (err) {
          console.error(err)
        }
      
        }
        fetchMovies()
        console.log(tmdData);
        
      },[])

    useEffect(() => {
    const fetchFeatured = async () => {
      try {
           setLoading(true)
      const results = await Promise.all(
        tmdData.map(async (title) => {
           const response= await fetch(`${API_URL}&t=${title}`)
          const data = await response.json();
          //console.log(data)
          return data && data.Response === "True" ? data : null;
        })
      );
      setFeatured(results.filter(Boolean));
      } catch (error) {
        console.error("Failed to add Featured movies", error)
      } finally {
        setLoading(false)
        console.log("Loading finally stopped");
        
      }
     
    };

    fetchFeatured();
    //console.log("featured movies>>>>>", featured)
  }, [tmdData]);
  //if loading
  if (loading) {
    return (
     <Loader type="movie" count={6} />
    );
  }
 return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {featured.map((movie, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <MovieCard movie={movie} onDetail={onDetail} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default FeaturedMovies