import React, { PureComponent } from 'react';
import { getMoviesDatasByKeyword } from '../services/MoviesApi';
import { Link, withRouter } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import {
  ImgResult,
  SearchbarContainer,
  Searchbar,
  SearchLogo,
  SearchResults,
} from '../stylized/searchbarStyle.js';

class SearchBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { keywords: '', searchedMovies: [] };
  }

  onChange({ target: { value: keywords } }) {
    this.setState({ keywords }, this.fetchSearchedMovies);
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
  }

  render() {
    const { searchedMovies } = this.state;

    const searchResults = searchedMovies.map(movie => (
      <Link
        to={`/movie/${movie.id}`}
        onClick={this.onClick.bind(this, movie.id)}
      >
        <ImgResult
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          alt={movie.title}
        />
        <div>
          <p>{movie.title}</p>
          <p>{movie.release_date}</p>
        </div>
      </Link>
    ));
    return (
      <SearchbarContainer>
        <SearchLogo className="fas fa-search" />
        <Searchbar
          type="text"
          placeholder="Search a movie"
          value={this.state.keywords}
          onChange={this.onChange.bind(this)}
        />
        <SearchResults>{searchResults}</SearchResults>
      </SearchbarContainer>
    );
  }
}
export default withRouter(SearchBar);
