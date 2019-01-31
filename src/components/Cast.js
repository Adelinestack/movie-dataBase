import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { getCastDatasByMovieId } from '../services/MoviesApi';
import styles from './cast.module.css';

export default class Cast extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { castDatas: [], id: this.props.movieId };
  }

  componentDidMount() {
    this.fetchCastDataByMovieId(this.props.movieId);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.movieId !== state.id) {
      return {
        castDatas: [],
        id: this.props.movieId,
      };
    }
    return null;
  }

  componentDidUpdate() {
    if (this.state.castDatas === null) {
      this.fetchCastDataByMovieId(this.props.movieId);
    }
  }

  async fetchCastDataByMovieId(movieId) {
    const castDatas = await getCastDatasByMovieId(movieId);
    this.setState({
      castDatas,
    });
  }

  render() {
    const { castDatas } = this.state;
    const cast = castDatas.map(actor => {
      if (actor.profile_path) {
        return (
          <div className={styles['cast-block']} key={actor.id}>
            <Link to={`/people/${actor.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`}
                alt={actor.name}
              />
              <p>{actor.name}</p>
            </Link>
          </div>
        );
      }
      return '';
    });

    return (
      <section>
        <h3>Cast</h3>
        <div className={styles['cast-container']}>{cast}</div>
      </section>
    );
  }
}
