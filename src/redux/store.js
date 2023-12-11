import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeLatest('GET_MOVIE', getMovie);
  yield takeEvery('GET_GENRES', getGenres);
  yield takeLatest('ADD_MOVIE', addMovie);
}

function* fetchAllMovies() {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}

// Get a single movie
function* getMovie(action) {
  try {
    // Grab the movie ID from the payload
    const movieID = action.payload;
    // GET request to movies at a specific ID
    const movie = yield axios.get(`/api/movies/${movieID}`);
    // Set value of movie reducer
    yield put({
      type: 'SET_MOVIE',
      payload: movie.data
    });

  } catch (error) {
    console.log('getMovie ERROR:', error);
  }
}

// Get all the genres from the server
function* getGenres() {
  try {
    const genresResponse = yield axios.get('/api/genres');
    // Set genres reducer
    yield put({
      type: 'SET_GENRES',
      payload: genresResponse.data
    });
  } catch (error) {
    console.log("Error in getGenres:", error);
  }
}

function* addMovie(action) {
  try {
    const newMovie = action.payload;
    // POST request
    const response = yield axios({
      method: 'POST',
      url: '/api/movies',
      data: newMovie
    })
    yield put({
      type: 'FETCH_MOVIES'
    })
  } catch (error){
    console.log("Error in addMovie:", error);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Movies reducer to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    case 'ADD_MOVIE':
      return [...state, action.payload];
    default:
      return state;
  }
}

// Stores the id of the movie for the details page
const movieID = (state = '', action) => {
  switch (action.type) {
    case 'SET_MOVIE_ID':
      return action.payload;
    default:
      return state;
  }
}

// Reducer stores the single movie for the details page
const movie = (state = '', action) => {
  switch(action.type) {
    case 'SET_MOVIE':
      return action.payload;
    default:
      return state;
  }
}

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    movieID,
    movie,
    genres,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;