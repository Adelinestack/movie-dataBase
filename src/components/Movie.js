import React, { Component } from 'react';
import Cast from './Cast';
import { getMovieDatasById } from '../services/MoviesApi';

import './movie.css';

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = { movieDatas: {} };
  }
  componentDidMount() {
    this.fetchMovieDataById();
  }

  async fetchMovieDataById() {
    const { movieId } = this.props.match.params;
    const movieDatas = await getMovieDatasById(movieId);
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
    const genres = genresList.map(genre => <span>{genre.name} </span>);

    return (
      <div>
        <section className="movie">
          <div className="movie-img">
            <img src={`https://image.tmdb.org/t/p/w300/${posterPath}`} />
          </div>
          <div className="movie-details">
            <h2>{title}</h2>
            <div>
              <p>
                <span className="bold">Release Date: </span>
                {releaseDate}
              </p>
              <p>
                <span className="bold">Rating: </span>
                {rating}
              </p>
              <p>
                <span className="bold">Vote count: </span>
                {voteCount}
              </p>
              <p>
                <span className="bold">Genre: </span>
                {genres}
              </p>
            </div>
            <p>{overview}</p>
          </div>
        </section>
        <Cast movieId={movieId} />
      </div>
    );
  }
}
