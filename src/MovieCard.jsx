import React from "react";


//props destructuring
function MovieCard({movie,onDetail}) {
    return(
        <div className="movie" onClick={()=>{onDetail(movie.Title,movie.Year)}}>
                <div>
                    <p>{movie.Year}</p>
                </div>
                <div>
                    <img loading="lazy" src={movie.Poster !=='N/A' ? movie.Poster : 'https://placehold.co/400x600'} alt={movie.Title} />
                </div>
                <div>
                    <h3>{movie.Title}</h3>
                    <span>{movie.Type}</span>
                </div>
            </div>
    )
}

export default MovieCard