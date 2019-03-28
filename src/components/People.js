import React, { PureComponent } from 'react';
import { getPeopleDatasById } from '../services/MoviesApi';
import { LanguageContext } from '../contexts/LanguageContext';
import withLanguagesContext from '../hoc/withLanguagesContext';
import { LANGUAGES } from '../utils/languages';
import { API_IMG } from '../utils/APIConst';
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
    };
  }

  static contextType = LanguageContext;

  componentDidMount() {
    window.scrollTo(0, 0);
    const {
      match: {
        params: { peopleId },
      },
      language,
    } = this.props;
    this.fetchPeopleDataById(peopleId, language);
  }

  static getDerivedStateFromProps(
    {
      match: {
        params: { peopleId },
      },
    },
    { id }
  ) {
    if (peopleId !== id) {
      return {
        peopleDatas: {},
        id: peopleId,
      };
    }
    return null;
  }

  componentDidUpdate({ language: prevLanguage }) {
    const { peopleDatas } = this.state;
    const {
      language,
      match: {
        params: { peopleId },
      },
    } = this.props;
    if (peopleDatas === null || language !== prevLanguage) {
      this.fetchPeopleDataById(peopleId, language);
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
            <img src={`${API_IMG}${photo}`} alt={name} />
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
