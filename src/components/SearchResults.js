import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { API_IMG } from '../utils/APIConst';
import { ImgResult } from '../stylized/searchbarStyle.js';

export default class Header extends PureComponent {
  render() {
    const { searchedMovies, onClick } = this.props;
    const searchResults =
      searchedMovies &&
      searchedMovies.map(
        ({ id, poster_path: posterPath, title, release_date: releaseDate }) => (
          <Link to={`/movie/${id}`} onClick={onClick.bind(null, id)} key={id}>
            <ImgResult src={`${API_IMG}${posterPath}`} alt={title} />
            <div>
              <p>{title}</p>
              <p>{releaseDate}</p>
            </div>
          </Link>
        )
      );
    return <div>{searchResults}</div>;
  }
}
