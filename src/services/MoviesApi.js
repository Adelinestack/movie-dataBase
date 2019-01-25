import axios from 'axios';

const API_KEY = 'c06055f57e454430ce3a469ce1c5e899';

const API_MOVIES_URL = 'https://api.themoviedb.org/3/movie/';
const API_SEARCH_URL = 'https://api.themoviedb.org/3/search/movie';
const API_PEOPLE_URL = 'https://api.themoviedb.org/3/person/';

const getUpcomingMovies = () =>
  axios.get(`${API_MOVIES_URL}upcoming?api_key=${API_KEY}`);

async function getUpcoming() {
  const {
    data: { results },
  } = await getUpcomingMovies();
  return results;
}

const getMovieById = movieId =>
  axios.get(`${API_MOVIES_URL}${movieId}?api_key=${API_KEY}`);

async function getMovieDatasById(movieId) {
  const { data } = await getMovieById(movieId);
  return data;
}

const getCastByMovieId = movieId =>
  axios.get(`${API_MOVIES_URL}${movieId}/credits?api_key=${API_KEY}`);

async function getCastDatasByMovieId(movieId) {
  const {
    data: { cast },
  } = await getCastByMovieId(movieId);
  return cast;
}

const getMoviesByKeywords = keywords =>
  axios.get(`${API_SEARCH_URL}?api_key=${API_KEY}&query=${keywords}`);

async function getMoviesDatasByKeyword(keywords) {
  const {
    data: { results },
  } = await getMoviesByKeywords(keywords);
  return results;
}

const getPeopleById = peopleId =>
  axios.get(`${API_PEOPLE_URL}${peopleId}?api_key=${API_KEY}`);

async function getPeopleDatasById(peopleId) {
  const { data } = await getPeopleById(peopleId);
  return data;
}

export {
  getUpcoming,
  getMovieDatasById,
  getCastDatasByMovieId,
  getMoviesDatasByKeyword,
  getPeopleDatasById,
};
