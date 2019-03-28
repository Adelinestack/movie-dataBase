import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { getCastDatasByMovieId } from '../services/MoviesApi';
import { LanguageContext } from '../contexts/LanguageContext';
import withLanguagesContext from '../hoc/withLanguagesContext';
import { CastContainer, CastBlock, CastPhoto } from '../stylized/castStyle.js';
import { LANGUAGES } from '../utils/languages';
import { API_IMG } from '../utils/APIConst';

class Cast extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      castDatas: [],
      id: this.props.movieId,
    };
  }
  static contextType = LanguageContext;

  componentDidMount() {
    const { movieId, language } = this.props;
    this.fetchCastDataByMovieId(movieId, language);
  }

  static getDerivedStateFromProps({ movieId }, { id }) {
    if (movieId !== id) {
      return {
        castDatas: [],
        id: movieId,
      };
    }
    return null;
  }

  componentDidUpdate({ language: prevLanguage }) {
    const { movieId, language } = this.props;
    const { castDatas } = this.state;
    if (castDatas === null || language !== prevLanguage) {
      this.fetchCastDataByMovieId(movieId, language);
    }
  }

  async fetchCastDataByMovieId(movieId, language) {
    const castDatas = await getCastDatasByMovieId(movieId, language);
    this.setState({
      castDatas,
    });
  }

  render() {
    const { castDatas } = this.state;
    const { language } = this.props;
    const {
      [language]: { castTitle },
    } = LANGUAGES;

    const cast = castDatas.map(({ profile_path: profilePath, id, name }) => {
      if (profilePath) {
        return (
          <CastBlock key={id}>
            <Link to={`/people/${id}`}>
              <CastPhoto src={`${API_IMG}${profilePath}`} alt={name} />
              <p>{name}</p>
            </Link>
          </CastBlock>
        );
      }
      return '';
    });

    return (
      <section>
        <h3>{castTitle}</h3>
        <CastContainer>{cast}</CastContainer>
      </section>
    );
  }
}

export default withLanguagesContext(Cast);
