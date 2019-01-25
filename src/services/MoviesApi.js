import axios from 'axios';

const API_KEY = 'c06055f57e454430ce3a469ce1c5e899';

const API_MOVIES_URL = 'https://api.themoviedb.org/3/movie/';

const getUpcomingMovies = () =>
  axios.get(`${API_MOVIES_URL}upcoming?api_key=${API_KEY}`);

async function getUpcoming() {
  const {
    data: { results },
  } = await getUpcomingMovies();
  return results;
}

export { getUpcoming };
