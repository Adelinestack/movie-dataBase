import React, { Component } from 'react';
import { getPeopleDatasById } from '../services/MoviesApi';
import './people.css';

export default class People extends Component {
  constructor(props) {
    super(props);
    this.state = { peopleDatas: {}, id: this.props.match.params.peopleId };
  }
  componentDidMount() {
    this.fetchPeopleDataById(this.props.match.params.peopleId);
  }
  static getDerivedStateFromProps(props, state) {
    if (props.match.params.peopleId !== state.id) {
      return {
        peopleDatas: {},
        id: props.match.params.peopleId,
      };
    }
    return null;
  }

  componentDidUpdate() {
    if (this.state.peopleDatas === null) {
      this.fetchPeopleDataById(this.props.peopleId);
    }
  }

  async fetchPeopleDataById(peopleId) {
    const peopleDatas = await getPeopleDatasById(peopleId);
    this.setState({
      peopleDatas,
    });
  }

  render() {
    const {
      birthday,
      deathday,
      name,
      biography,
      place_of_birth: birthPlace,
      profile_path: photo,
    } = this.state.peopleDatas;

    return (
      <div>
        <section className="movie">
          <div className="movie-img">
            <img src={`https://image.tmdb.org/t/p/w300/${photo}`} alt={name} />
          </div>
          <div className="movie-details">
            <h2>{name}</h2>
            <div>
              <p>
                <span className="bold">Birth date: </span>
                {birthday}
              </p>
              <p>
                <span className="bold">Birth place: </span>
                {birthPlace}
              </p>
              <p>
                <span className="bold">Death: </span>
                {deathday}
              </p>
            </div>
            <p>{biography}</p>
          </div>
        </section>
      </div>
    );
  }
}
