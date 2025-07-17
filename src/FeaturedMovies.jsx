import React, {useState,useEffect} from "react";
import MovieCard from "./MovieCard";

function FeaturedMovies({movie}) {
    const [featured, setFeatured]= useState([])
    useEffect(() => {
    const fetchFeatured = async () => {
      const results = await Promise.all(
        featuredTitles.map(async (title) => {
          const res = await fetch(`https://www.omdbapi.com/?apikey=YOUR_API_KEY&t=${title}`);
          const data = await res.json();
          return data && data.Response === "True" ? data : null;
        })
      );
      setFeatured(results.filter(Boolean));
    };

    fetchFeatured();
  }, []);
}