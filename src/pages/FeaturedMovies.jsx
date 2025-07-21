import React, {useState,useEffect} from "react";
import axios from "axios"
import {useQuery} from "@tanstack/react-query"
import { logError } from "../utils/logger"
import MovieCard from "../components/MovieCard";
import {motion} from "framer-motion"
import Loader from "../components/Loader"


const API_URL = process.env.REACT_APP_API;
const TMDB_TOKEN=process.env.REACT_APP_TMDB_AUTH



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
          // console.log("Data from TMDB",data.results);
          const resultData= await data.results
          const featuredNames= await resultData.map(obj => obj.name || obj.title || "Unnamed")
          // console.log("^^^^^^^^^>>>>>>",featuredNames);
          
          
         setTmdData(featuredNames);
        } catch (err) {
          logError("Failed to trending movieNames from TMDB: ",err)
          console.error(err)
        }
      
        }
        fetchMovies()
        // console.log(tmdData);
        
      },[])

    useEffect(() => {
  if (!tmdData.length) return; // 🚫 Avoid unnecessary fetch

  const controller = new AbortController(); // ✅ For cancellation if component unmounts

  const fetchFeatured = async () => {
    try {
      setLoading(true);

      const results = await Promise.allSettled(
        tmdData.map(async (title) => {
          try {
            const response = await fetch(`${API_URL}&t=${encodeURIComponent(title)}`, {
              signal: controller.signal,
            });

            const data = await response.json();
            if (data?.Response === "True") return data;
            return null;
          } catch (error) {
            console.warn(`Error fetching title "${title}":`, error);
            return null;
          }
        })
      );

      // ✅ Filter only fulfilled and non-null results
      const filtered = results
        .filter((r) => r.status === "fulfilled" && r.value)
        .map((r) => r.value);

      setFeatured(filtered);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Unexpected error in fetchFeatured:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchFeatured();

  return () => {
    controller.abort(); // ✅ Cleanup
  };
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