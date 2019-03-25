import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { LANGUAGES } from '../utils/languages';
import {
  NewMovieContainer,
  MovieBlock,
  MovieImg,
  MovieDatas,
} from '../stylized/newMoviesStyle.js';
import withLanguagesContext from '../hoc/withLanguagesContext';

class NewMovies extends PureComponent {
  render() {
    const { upcomingMovies, language } = this.props;
    const {
      [language]: { upcomingTitle },
    } = LANGUAGES;

    const upcomingMoviesList = upcomingMovies.map(
      ({ id, poster_path: posterPath, title, release_date: releaseDate }) => (
        <MovieBlock key={id}>
          <Link to={`/movie/${id}`}>
            <MovieImg
              src={`https://image.tmdb.org/t/p/w300/${posterPath}`}
              alt={title}
            />
            <MovieDatas>
              <h3>{title}</h3>
              <p>{releaseDate}</p>
            </MovieDatas>
          </Link>
        </MovieBlock>
      )
    );
    return (
      <section>
        <h2>{upcomingTitle}</h2>
        <NewMovieContainer>{upcomingMoviesList}</NewMovieContainer>
      </section>
    );
  }
}
export default withLanguagesContext(NewMovies);
