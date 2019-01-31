import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './newMovies.css';

export default class NewMovies extends PureComponent {
  render() {
    const { upcomingMovies } = this.props;
    const upcomingMoviesList = upcomingMovies.map(upcomingMovie => (
      <div className="movie-block" key={upcomingMovie.id}>
        <Link to={`/movie/${upcomingMovie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w300/${upcomingMovie.poster_path}`}
            alt={upcomingMovie.title}
          />
          <div className="movie-data">
            <h3>{upcomingMovie.title}</h3>
            <p>{upcomingMovie.release_date}</p>
          </div>
        </Link>
      </div>
    ));
    return (
      <section>
        <h2>New releases</h2>
        <div className="new-movies-container">{upcomingMoviesList}</div>
      </section>
    );
  }
}
