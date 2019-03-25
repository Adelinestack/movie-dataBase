import axios from 'axios';
import {
  API_MOVIES_URL,
  API_SEARCH_URL,
  API_PEOPLE_URL,
} from '../utils/APIConst';
import { API_KEY } from '../utils/APIKey';

const getUpcomingMovies = language =>
  axios.get(
    `${API_MOVIES_URL}upcoming?api_key=${API_KEY}&language=${language}`
  );

async function getUpcoming(language) {
  const {
    data: { results },
  } = await getUpcomingMovies(language);
  return results;
}

const getMovieById = (movieId, language) =>
  axios.get(
    `${API_MOVIES_URL}${movieId}?api_key=${API_KEY}&language=${language}`
  );

async function getMovieDatasById(movieId, language) {
  const { data } = await getMovieById(movieId, language);
  return data;
}

const getCastByMovieId = (movieId, language) =>
  axios.get(
    `${API_MOVIES_URL}${movieId}/credits?api_key=${API_KEY}&language=${language}`
  );

async function getCastDatasByMovieId(movieId, language) {
  const {
    data: { cast },
  } = await getCastByMovieId(movieId, language);
  return cast;
}

const getMoviesByKeywords = (keywords, language) =>
  axios.get(
    `${API_SEARCH_URL}?api_key=${API_KEY}&query=${keywords}&language=${language}`
  );

async function getMoviesDatasByKeyword(keywords, language) {
  const {
    data: { results },
  } = await getMoviesByKeywords(keywords, language);
  return results;
}

const getPeopleById = (peopleId, language) =>
  axios.get(
    `${API_PEOPLE_URL}${peopleId}?api_key=${API_KEY}&language=${language}`
  );

async function getPeopleDatasById(peopleId, language) {
  const { data } = await getPeopleById(peopleId, language);
  return data;
}

export {
  getUpcoming,
  getMovieDatasById,
  getCastDatasByMovieId,
  getMoviesDatasByKeyword,
  getPeopleDatasById,
};
