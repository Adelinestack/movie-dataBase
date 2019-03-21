import React, { PureComponent } from 'react';
import { getPeopleDatasById } from '../services/MoviesApi';
import {
  MovieContent,
  MovieImg,
  MovieDetails,
  Info,
} from '../stylized/movieStyle.js';

export default class People extends PureComponent {
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
        <MovieContent>
          <MovieImg>
            <img src={`https://image.tmdb.org/t/p/w300/${photo}`} alt={name} />
          </MovieImg>
          <MovieDetails>
            <h2>{name}</h2>
            <div>
              <p>
                <Info>Birth date: </Info>
                {birthday}
              </p>
              <p>
                <Info>Birth place: </Info>
                {birthPlace}
              </p>
              <p>
                <Info>Death: </Info>
                {deathday}
              </p>
            </div>
            <p>{biography}</p>
          </MovieDetails>
        </MovieContent>
      </div>
    );
  }
}
