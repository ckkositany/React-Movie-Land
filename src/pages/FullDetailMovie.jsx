import React, { useState, useEffect } from "react";

function FullDetailMovie({fullMovie,onTrailer}) {
    
    const [videoId, setVideoId]= useState(null)

    useEffect(()=>{
        async function fetchTrailerId() {
            if(fullMovie?.Title){
                const id = await onTrailer(fullMovie.Title)
                setVideoId(id)
            }
            
        }

        fetchTrailerId();

    }, [fullMovie,onTrailer])

    return (
        <div>
        <div className="movie-detail">
        <div>
        <img loading="lazy"
        src={
        fullMovie.Poster !== "N/A"
        ?fullMovie.Poster
        : "https://placehold.co/400x600"
        }
        alt={fullMovie.Title}
        />
    </div>

    <div className="movie-detail-info">
    <h3>{fullMovie.Title}</h3>
    <span>{fullMovie.Type}</span>

    {fullMovie.Type === "series" && (
        <p>
        📺 <strong>Total Seasons:</strong> {fullMovie.totalSeasons}
        </p>
    )}

    <p>{fullMovie.Plot}</p>

    <div className="movie-meta-grid">
        <div><strong>🎭 Genre:</strong> {fullMovie.Genre}</div>
        <div><strong>🧑 Actors:</strong> {fullMovie.Actors}</div>
        <div><strong><p>
        🎬 Directed by <strong>
            {fullMovie.Director !=="N/A"
                ?fullMovie.Director
                : ""
            }
            </strong>
        </p></strong></div>
        <div><strong>🗣 Language:</strong> {fullMovie.Language}</div>
        <div><strong>⏱ Runtime:</strong> {fullMovie.Runtime}</div>
        <div><strong>🌍 Country:</strong> {fullMovie.Country}</div>
        <div><strong>⭐ Rating:</strong> {fullMovie.imdbRating}</div>
         <div><strong>⭐ Year:</strong> {fullMovie.Year}</div>
        
  </div>
</div>
{/* ✅ Trailer Embed */}
        {videoId ? (
          <iframe
            width="100%"
            height="300"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={`${fullMovie.Title} Trailer`}
            style={{ borderRadius: "10px", marginTop: "1.5rem" }}
          />
        ) : (
          <p style={{ color: "#f0f0f0" }}>Loading trailer...</p>
        )}

    </div>

    </div> 
    )
}
export default  FullDetailMovie



