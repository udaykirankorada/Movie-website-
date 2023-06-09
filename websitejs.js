// script.js

const API_KEY = 'e706998342ec620293343c8f8cfd6011';


function fetchMovieData(searchQuery = '') {
    let url;
    if (searchQuery === '') {
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    } else {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&include_adult=false`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching movie data');
            }
            return response.json();
        })
        .then(data => {
            const movies = data.results;
            if (movies.length === 0) {
                displayNoMoviesMessage();
            } else {
                displayMovieList(movies);
            }
        })
        .catch(error => {
            console.log('Error fetching movie data:', error);
        });
}


function displayMovieList(movies) {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <div class="movie-item-overlay">
                <h3 class="movie-title">Movie Name:<br>${movie.title}</h3>
                <p class="movie-genre">Genre:<br> ${getGenres(movie.genre_ids)}</p>
                <p class="movie-rating">Rating: ${movie.vote_average}/10</p>
            </div>
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}"alt="${movie.title}">
        `;

        movieItem.addEventListener('click', () => {
            displayMovieDetails(movie);
        });

        movieList.appendChild(movieItem);
    });
}


function getGenres(genreIds) {
    const genres = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation',
        35: 'Comedy',
        80: 'Crime',
        99: 'Documentary',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mystery',
        10749: 'Romance',
        878: 'Science Fiction',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'War',
        37: 'Western'
    };

    const genreNames = genreIds.map(id => genres[id]);
    return genreNames.join(', ');
}


function displayMovieDetails(movie) {
    const movieDetails = document.getElementById('movieDetails');
    movieDetails.innerHTML = '';

    const movieInfo = document.createElement('div');
    movieInfo.innerHTML = `
        <h2>${movie.title}</h2>
        <p><b>Release Date</b>: ${movie.release_date}</p>
        <p><b>Overview</b>: ${movie.overview}</p>
    `;

    movieDetails.appendChild(movieInfo);
    movieDetails.style.display = 'block';
}


function displayNoMoviesMessage() {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '<p>No movies found.</p>';
}


function searchMovies() {
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim();

    fetchMovieData(searchQuery);
}


const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchMovies();
    }
});


fetchMovieData();