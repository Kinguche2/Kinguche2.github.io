import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemovieFavorite';
import logo from './logo.png';

//state objects that holds values
const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  //Makes a request to the API
  const getMovieRequest = async () => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=95ba243d`

    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search) {
    setMovies(responseJson.Search);
    }
  };

  //Calls the getMovieRequest
  useEffect(() =>{
    getMovieRequest(searchValue);
  }, [searchValue]);

  //Gets the favorites from local storage
  useEffect(() => {
    const moviefavorites = JSON.parse(
      localStorage.getItem('react-movie-mine-favorites')
    );

    if (moviefavorites) {
      setFavorites(moviefavorites);
    };
  }, []);

  //Saves to storage
  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-mine-favorites', JSON.stringify(items));
  };

  //creates the favorites and saves to storage
  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  //removes items from the favorites list and updates storage
  const removefavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );

    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  return (
      <div className='container-fluid movie-app'>
        <img src={logo} alt="Logo" className='image-container' />
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading='Movies'/>
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
        </div>
        <div className='row'>
          <MovieList 
            movies={movies} 
            handleFavoritesClick={addFavoriteMovie} 
            favoriteComponent={AddFavorites} 
            />
        </div>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading='Favourites'/>
        </div>
        <div className='row'>
          <MovieList 
            movies={favorites} 
            handleFavoritesClick={removefavoriteMovie} 
            favoriteComponent={RemoveFavorites} />
        </div>
      </div> 
  );
};
 
export default App;
