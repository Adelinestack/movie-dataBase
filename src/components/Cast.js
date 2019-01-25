import React, { Component } from 'react';

import './cast.css';

export default class Cast extends Component {
  render() {
    return (
      <section>
        <h3>Cast</h3>
        <div className="cast-container">
          <div className="cast-block">
            <img src="https://image.tmdb.org/t/p/w300/oPIfGm3mf4lbmO5pWwMvfTt5BM1.jpg" />
            <p>James McAvoy</p>
          </div>
          <div>
            <img src="https://image.tmdb.org/t/p/w300/oPIfGm3mf4lbmO5pWwMvfTt5BM1.jpg" />
            <p>James McAvoy</p>
          </div>
          <div>
            <img src="https://image.tmdb.org/t/p/w300/oPIfGm3mf4lbmO5pWwMvfTt5BM1.jpg" />
            <p>James McAvoy</p>
          </div>
          <div>
            <img src="https://image.tmdb.org/t/p/w300/oPIfGm3mf4lbmO5pWwMvfTt5BM1.jpg" />
            <p>James McAvoy</p>
          </div>
        </div>
      </section>
    );
  }
}
