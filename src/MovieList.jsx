import React, {useState, useEffect} from "react";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0N2U4NDYwNzgzMzNjZDA0ZjQwZjgyOGI1ZTM1MDc1YyIsInN1YiI6IjY1YjRkNWU1YjExMzFmMDE4ZDI5MTMyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KE5a2zdC9YqxuqJdpjIZ9YNyr-fFGBfG0oG89oiuP0w'
            }
          };
          
          if (search.length === 0) {
            fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => setMovies(response.results))
            .catch(err => console.error(err));
            return;
          } else {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => setMovies(response.results))
            .catch(err => console.error(err));
            }
            
    }, [search]);

    return (
        <div>
            <div className="header">
                <h1 className="title">Popular Movies</h1>
                <input type="text" className="search" name="search" placeholder="Search for a Movie" onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div className="container">
                {movies.map((movie) => (
                    
                    <div className="card" key={movie.id}>
                        <div className="card-content">
                            <div className="card-info">
                                <div className="image">
                                    <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt="img" className="card-img"/>
                                </div>
                                <div className="movie-info">
                                    <h3 className="movie-title">{movie.title}</h3>
                                    <p className="movie-release">
                                        Release Date : {movie.release_date}
                                    </p>
                                    <p className="movie-rating">
                                        Rating : {movie.vote_average} / 10
                                    </p>
                                </div>
                            </div>
                            <div className="overview">
                                <h3>Overview</h3>
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                    </div>
                )
                )}
            </div>
        </div>
    );
};


export default MovieList