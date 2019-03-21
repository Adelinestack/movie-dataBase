import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

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

    const title = language === 'en-EN' ? 'New releases' : 'Dernières sorties';
    const upcomingMoviesList = upcomingMovies.map(upcomingMovie => (
      <MovieBlock key={upcomingMovie.id}>
        <Link to={`/movie/${upcomingMovie.id}`}>
          <MovieImg
            src={`https://image.tmdb.org/t/p/w300/${upcomingMovie.poster_path}`}
            alt={upcomingMovie.title}
          />
          <MovieDatas>
            <h3>{upcomingMovie.title}</h3>
            <p>{upcomingMovie.release_date}</p>
          </MovieDatas>
        </Link>
      </MovieBlock>
    ));
    return (
      <section>
        <h2>{title}</h2>
        <NewMovieContainer>{upcomingMoviesList}</NewMovieContainer>
      </section>
    );
  }
}
export default withLanguagesContext(NewMovies);
