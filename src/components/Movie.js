import React, { PureComponent } from 'react';
import Cast from './Cast';
import { getMovieDatasById } from '../services/MoviesApi';
import { LanguageContext } from '../contexts/LanguageContext';
import withLanguagesContext from '../hoc/withLanguagesContext';
import { LANGUAGES } from '../utils/languages';
import { API_IMG } from '../utils/APIConst';
import {
  MovieContent,
  MovieImg,
  MovieDetails,
  Info,
} from '../stylized/movieStyle.js';

class Movie extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      movieDatas: {},
      id: this.props.match.params.movieId,
      language: this.props.language,
    };
  }

  static contextType = LanguageContext;

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchMovieDataById(
      this.props.match.params.movieId,
      this.props.language
    );
  }

  static getDerivedStateFromProps(props, state) {
    if (props.match.params.movieId !== state.id) {
      return {
        movieDatas: {},
        id: props.match.params.movieId,
      };
    }
    return null;
  }

  componentDidUpdate(prevprops) {
    if (
      this.state.movieDatas.length === 0 ||
      this.props.language !== prevprops.language
    ) {
      this.fetchMovieDataById(
        this.props.match.params.movieId,
        this.props.language
      );
    }
  }

  async fetchMovieDataById(movieId, language) {
    const movieDatas = await getMovieDatasById(movieId, language);
    this.setState({
      movieDatas,
    });
  }

  render() {
    const { movieId } = this.props.match.params;
    const {
      poster_path: posterPath,
      title,
      release_date: releaseDate,
      vote_average: rating,
      vote_count: voteCount,
      genres: genresList = [],
      overview,
    } = this.state.movieDatas;
    const genres = genresList.map(({ name }) => <span>{name} </span>);
    const { language } = this.props;
    const {
      [language]: { movieRelease, movieRating, vote },
    } = LANGUAGES;
    return (
      <div>
        <MovieContent key={movieId}>
          <MovieImg>
            <img src={`${API_IMG}${posterPath}`} alt={title} />
          </MovieImg>
          <MovieDetails>
            <h2>{title}</h2>
            <div>
              <p>
                <Info>{movieRelease}: </Info>
                {releaseDate}
              </p>
              <p>
                <Info>{movieRating}: </Info>
                {rating}
              </p>
              <p>
                <Info>{vote}: </Info>
                {voteCount}
              </p>
              <p>
                <Info>Genre: </Info>
                {genres}
              </p>
            </div>
            <p>{overview}</p>
          </MovieDetails>
        </MovieContent>
        <Cast movieId={movieId} />
      </div>
    );
  }
}

export default withLanguagesContext(Movie);
