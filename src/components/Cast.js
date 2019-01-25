import React, { Component } from 'react';
import { getCastDatasByMovieId } from '../services/MoviesApi';
import './cast.css';

export default class Cast extends Component {
  constructor(props) {
    super(props);
    this.state = { castDatas: [] };
  }
  componentDidMount() {
    this.fetchCastDataByMovieId();
  }

  async fetchCastDataByMovieId() {
    const { movieId } = this.props;
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
          <div className="cast-block">
            <img
              src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`}
              alt={actor.name}
            />
            <p>{actor.name}</p>
          </div>
        );
      }
    });

    return (
      <section>
        <h3>Cast</h3>
        <div className="cast-container">{cast}</div>
      </section>
    );
  }
}
