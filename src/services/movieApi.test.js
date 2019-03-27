import mockAxios from 'jest-mock-axios';
import {
  API_MOVIES_URL,
  API_SEARCH_URL,
  API_PEOPLE_URL,
} from '../utils/APIConst';
import { API_KEY } from '../utils/APIKey';
import {
  getUpcoming,
  getMovieDatasById,
  getCastDatasByMovieId,
  getMoviesDatasByKeyword,
  getPeopleDatasById,
} from './MoviesApi';

describe('Test get upcoming movies', () => {
  afterAll(() => {
    mockAxios.reset();
  });

  test('Should destructure axios response', async () => {
    mockAxios.get.mockResolvedValue({ data: { results: [] } });
    const movies = await getUpcoming('fr-FR');
    expect(movies).toEqual([]);
  });

  test('Should call axios', async () => {
    await getUpcoming('fr-FR');
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${API_MOVIES_URL}upcoming?api_key=${API_KEY}&language=fr-FR`
    );
  });
});

describe('Test get movie by ID', () => {
  afterAll(() => {
    mockAxios.reset();
  });

  test('Should destructure axios response', async () => {
    mockAxios.get.mockResolvedValue({ data: {} });
    const movie = await getMovieDatasById(458723, 'fr-FR');
    expect(movie).toEqual({});
  });

  test('Should call axios', async () => {
    await getMovieDatasById(458723, 'fr-FR');
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${API_MOVIES_URL}458723?api_key=${API_KEY}&language=fr-FR`
    );
  });
});

describe('Test get cast by movie ID', () => {
  afterAll(() => {
    mockAxios.reset();
  });

  test('Should destructure axios response', async () => {
    mockAxios.get.mockResolvedValue({ data: { cast: [] } });
    const movie = await getCastDatasByMovieId(458723, 'fr-FR');
    expect(movie).toEqual([]);
  });

  test('Should call axios', async () => {
    await getCastDatasByMovieId(458723, 'fr-FR');
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${API_MOVIES_URL}458723/credits?api_key=${API_KEY}&language=fr-FR`
    );
  });

  describe('Test get movies datas by keyword', () => {
    afterAll(() => {
      mockAxios.reset();
    });

    test('Should destructure axios response', async () => {
      mockAxios.get.mockResolvedValue({ data: { results: [] } });
      const movie = await getMoviesDatasByKeyword('born', 'fr-FR');
      expect(movie).toEqual([]);
    });

    test('Should call axios', async () => {
      await getMoviesDatasByKeyword('born', 'fr-FR');
      expect(mockAxios.get).toHaveBeenCalledWith(
        `${API_SEARCH_URL}?api_key=${API_KEY}&query=born&language=fr-FR`
      );
    });
  });

  describe('Test get people datas by id', () => {
    afterAll(() => {
      mockAxios.reset();
    });

    test('Should destructure axios response', async () => {
      mockAxios.get.mockResolvedValue({ data: {} });
      const movie = await getPeopleDatasById(1267329, 'fr-FR');
      expect(movie).toEqual({});
    });

    test('Should call axios', async () => {
      await getPeopleDatasById(1267329, 'fr-FR');
      expect(mockAxios.get).toHaveBeenCalledWith(
        `${API_PEOPLE_URL}1267329?api_key=${API_KEY}&language=fr-FR`
      );
    });
  });
});
