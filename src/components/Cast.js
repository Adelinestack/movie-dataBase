import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { getCastDatasByMovieId } from '../services/MoviesApi';
import { LanguageContext } from '../contexts/LanguageContext';
import withLanguagesContext from '../hoc/withLanguagesContext';
import { CastContainer, CastBlock, CastPhoto } from '../stylized/castStyle.js';

class Cast extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      castDatas: [],
      id: this.props.movieId,
      language: this.props.language,
    };
  }
  static contextType = LanguageContext;

  componentDidMount() {
    this.fetchCastDataByMovieId(this.props.movieId, this.props.language);
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

  componentDidUpdate(prevprops) {
    if (
      this.state.castDatas === null ||
      this.props.language !== prevprops.language
    ) {
      this.fetchCastDataByMovieId(this.props.movieId, this.props.language);
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
    const cast = castDatas.map(actor => {
      if (actor.profile_path) {
        return (
          <CastBlock key={actor.id}>
            <Link to={`/people/${actor.id}`}>
              <CastPhoto
                src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`}
                alt={actor.name}
              />
              <p>{actor.name}</p>
            </Link>
          </CastBlock>
        );
      }
      return '';
    });
    const title = language === 'en-EN' ? 'Cast' : 'Distribution';

    return (
      <section>
        <h3>{title}</h3>
        <CastContainer>{cast}</CastContainer>
      </section>
    );
  }
}

export default withLanguagesContext(Cast);
