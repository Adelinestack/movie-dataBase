import React, { Component } from 'react';
import Cast from './Cast';
import { getMovieDatasById } from '../services/MoviesApi';

import styles from './movie.module.css';

const imgUrl = 'https://image.tmdb.org/t/p/w300/';

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = { movieDatas: {}, id: this.props.match.params.movieId };
  }
  componentDidMount() {
    this.fetchMovieDataById(this.props.match.params.movieId);
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

  componentDidUpdate() {
    if (this.state.movieDatas.length === 0) {
      this.fetchMovieDataById(this.props.movieId);
    }
  }

  async fetchMovieDataById(movieId) {
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
        <section className={styles.movie} key={movieId}>
          <div className="movie-img">
            <img src={`${imgUrl}${posterPath}`} alt={title} />
          </div>
          <div className={styles['movie-details']}>
            <h2>{title}</h2>
            <div>
              <p>
                <span className={styles.bold}>Release Date: </span>
                {releaseDate}
              </p>
              <p>
                <span className={styles.bold}>Rating: </span>
                {rating}
              </p>
              <p>
                <span className={styles.bold}>Vote count: </span>
                {voteCount}
              </p>
              <p>
                <span className={styles.bold}>Genre: </span>
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
