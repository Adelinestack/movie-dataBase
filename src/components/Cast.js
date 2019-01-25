import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCastDatasByMovieId } from '../services/MoviesApi';
import './cast.css';

export default class Cast extends Component {
  constructor(props) {
    super(props);
    this.state = { castDatas: [] };
  }
  componentDidMount() {
    this.fetchCastDataByMovieId(this.props.movieId);
  }
  componentWillReceiveProps(nextProps) {
    this.fetchCastDataByMovieId(nextProps.movieId);
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
          <div className="cast-block">
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
    });

    return (
      <section>
        <h3>Cast</h3>
        <div className="cast-container">{cast}</div>
      </section>
    );
  }
}
