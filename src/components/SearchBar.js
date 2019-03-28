import React, { PureComponent } from 'react';
import { getMoviesDatasByKeyword } from '../services/MoviesApi';
import { withRouter } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import withLanguagesContext from '../hoc/withLanguagesContext';
import SearchResults from './SearchResults';
import { LANGUAGES } from '../utils/languages';
import {
  SearchbarContainer,
  Searchbar,
  SearchLogo,
  SearchResultsContainer,
} from '../stylized/searchbarStyle.js';

class SearchBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      keywords: '',
      searchedMovies: [],
    };
  }

  static contextType = LanguageContext;

  resetSearchedMovies = () => {
    this.setState({ searchedMovies: [] });
  };

  onChange({ target: { value: keywords } }) {
    this.setState(
      { keywords },
      keywords.length > 0 ? this.fetchSearchedMovies : this.resetSearchedMovies
    );
  }

  async fetchSearchedMovies() {
    const { keywords } = this.state;
    const searchedMovies = await getMoviesDatasByKeyword(keywords);
    this.setState({
      searchedMovies,
    });
  }

  onClick(movieId, e) {
    e.preventDefault();
    this.setState({
      keywords: '',
      searchedMovies: [],
    });
    this.props.history.push(`/movie/${movieId}`);
    window.scrollTo(0, 0);
  }

  render() {
    const { searchedMovies } = this.state;
    const { language } = this.props;
    const {
      [language]: { placeholder },
    } = LANGUAGES;

    return (
      <SearchbarContainer>
        <SearchLogo className="fas fa-search" />
        <Searchbar
          type="text"
          placeholder={placeholder}
          value={this.state.keywords}
          onChange={this.onChange.bind(this)}
        />
        <SearchResultsContainer>
          <SearchResults
            searchedMovies={searchedMovies}
            onClick={this.onClick.bind(this)}
          />
        </SearchResultsContainer>
      </SearchbarContainer>
    );
  }
}
export default withRouter(withLanguagesContext(SearchBar));
