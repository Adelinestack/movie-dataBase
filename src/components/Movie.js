import React, { Component } from 'react';
import Cast from './Cast';

import './movie.css';

export default class Movie extends Component {
  render() {
    return (
      <div>
        <section className="movie">
          <div className="movie-img">
            <img src="https://image.tmdb.org/t/p/w300/svIDTNUoajS8dLEo7EosxvyAsgJ.jpg" />
          </div>
          <div className="movie-details">
            <h2>Glass</h2>
            <div>
              <p>
                <span className="bold">Release Date: </span>2019-01-16
              </p>
              <p>
                <span className="bold">Rating: </span>6.9
              </p>
              <p>
                <span className="bold">Vote count: </span>636
              </p>
              <p>
                <span className="bold">Genre: </span>Thriller
              </p>
            </div>
            <p>
              In a series of escalating encounters, security guard David Dunn
              uses his supernatural abilities to track Kevin Wendell Crumb, a
              disturbed man who has twenty-four personalities. Meanwhile, the
              shadowy presence of Elijah Price emerges as an orchestrator who
              holds secrets critical to both men.
            </p>
          </div>
        </section>
        <Cast />
      </div>
    );
  }
}
