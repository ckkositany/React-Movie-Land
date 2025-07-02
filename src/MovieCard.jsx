import React from "react";


//props destructuring
function MovieCard({movie}) {
    return(
        <div className="movie">
                <div>
                    <p>{movie.Year}</p>
                </div>
                <div>
                    <img src={movie.Poster !=='N/A' ? movie.Poster : 'https://placehold.co/400x600'} alt={movie.Title} />
                </div>
                <div>
                    <h3>{movie.Title}</h3>
                    <span>{movie.Type}</span>
                </div>
            </div>
    )
}

export default MovieCard