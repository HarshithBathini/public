import './App.css';
import React, { useState } from 'react';

// Display a search box with a button. The button click should call the API with the text entered and display the Box office number and imdbID. Do this for three movies and List the movies in the increasing order of Box office. On click of these movies, we should land in the imdb page of the respective movies.

// Imdb link - https://www.imdb.com/title/{imdbID}/

// Omdb API Link - http://www.omdbapi.com/?t={searchboxText}&y=2018&apikey=6e7e8e47

// http://www.omdbapi.com/?t={searchboxText}&apikey=6e7e8e47

// Movies - Avengers, Venom, Gravity

function App() {
  const [movie, setMovie] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const getValue = (a) => {
    if (typeof a === 'string') {
      return Number(a.replaceAll(',', '').slice(1));
    }
    return a;
  };

  const onSearch = (e) => {
    fetch(`http://www.omdbapi.com/?t=${movie}&y=2018&apikey=6e7e8e47`)
      .then((res) => res.json())
      .then((data) => {
        const { BoxOffice, imdbID, Error } = data;
        if (!Error) {
          const temValues = [...movies, { BoxOffice, imdbID }].sort(
            (a, b) => getValue(b.BoxOffice) - getValue(a.BoxOffice)
          );
          setMovies(temValues);
          setError(false);
        } else {
          setError(true);
        }
      });
  };

  const updateMovie = (e) => {
    const { value } = e.target;
    setMovie(value);
  };

  // const handleChild = (e) => {
  //   e.stopPropagation();
  //   console.log('Child');
  // };

  // const handleParent = (e) => {
  //   console.log('Parent');
  // };

  return (
    <div className='App'>
      <div>
        <input
          value={movie}
          onChange={updateMovie}
          className={error ? 'red' : ''}
        />
        <button onClick={onSearch}>Search</button>
      </div>
      <div>
        {movies.map(({ BoxOffice, imdbID }) => (
          <p>
            {imdbID} : {BoxOffice}
          </p>
        ))}
      </div>
      {/* <div onClick={handleParent}>
        <div data-id={1}> Child 1 </div>
        <div data-id={2}> Child 2 </div>
      </div> */}
    </div>
  );
}

export default App;
