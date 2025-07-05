import React from "react";

function FullDetailMovie({fullMovie}) {
    return (
        <div>
        <div className="movie-detail">
        <div>
        <img
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
  </div>
</div>


    <iframe
    height="300"
    src={<iframe
  src={`https://www.youtube.com/embed/`}
/>}
    frameBorder="0"
    allow="autoplay; encrypted-media"
    allowFullScreen
    title="Trailer"
    />
    </div>

    </div> 
    )
}
export default  FullDetailMovie



