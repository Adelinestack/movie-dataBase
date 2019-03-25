import React, { PureComponent } from 'react';
import { getPeopleDatasById } from '../services/MoviesApi';
import { LanguageContext } from '../contexts/LanguageContext';
import withLanguagesContext from '../hoc/withLanguagesContext';
import { LANGUAGES } from '../utils/languages';
import {
  MovieContent,
  MovieImg,
  MovieDetails,
  Info,
} from '../stylized/movieStyle.js';

class People extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      peopleDatas: {},
      id: this.props.match.params.peopleId,
      language: this.props.language,
    };
  }

  static contextType = LanguageContext;

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchPeopleDataById(
      this.props.match.params.peopleId,
      this.props.language
    );
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

  componentDidUpdate(prevstate) {
    if (
      this.state.peopleDatas === null ||
      this.props.language !== prevstate.language
    ) {
      this.fetchPeopleDataById(
        this.props.match.params.peopleId,
        this.props.language
      );
    }
  }

  async fetchPeopleDataById(peopleId, language) {
    const peopleDatas = await getPeopleDatasById(peopleId, language);
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
    const { language } = this.props;
    const {
      [language]: { birthDate, place, death, bio },
    } = LANGUAGES;

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
                <Info>{birthDate}: </Info>
                {birthday}
              </p>
              <p>
                <Info>{place}: </Info>
                {birthPlace}
              </p>
              <p>
                <Info>{death}: </Info>
                {deathday || '-'}
              </p>
            </div>
            <div>
              <Info>{bio}: </Info>
              <p>{biography || '-'}</p>
            </div>
          </MovieDetails>
        </MovieContent>
      </div>
    );
  }
}
export default withLanguagesContext(People);
