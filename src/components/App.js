import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import NewMovies from './NewMovies';
import Movie from './Movie';
import SearchBar from './SearchBar';
import { getUpcoming } from '../services/MoviesApi';
import './app.css';

const Error = () => <div>404 PAGE</div>;

class App extends Component {
  state = {
    upcomingMovies: [],
  };

  componentDidMount() {
    this.fetchUpcomingMovies();
  }

  async fetchUpcomingMovies() {
    const upcomingMovies = await getUpcoming();
    this.setState({
      upcomingMovies,
    });
  }

  render() {
    const { upcomingMovies } = this.state;
    const loadingElement = upcomingMovies.length === 0 && (
      <div className="container">
        <i className="fas fa-3x fa-spinner fa-pulse" />
      </div>
    );

    return (
      loadingElement || (
        <BrowserRouter>
          <div className="container">
            <Header />
            <main>
              <SearchBar />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <NewMovies {...props} upcomingMovies={upcomingMovies} />
                  )}
                />
                <Route
                  exact
                  path="/movie/:movieId"
                  render={props => <Movie {...props} />}
                />
                <Route path="/" component={Error} />
              </Switch>
            </main>
          </div>
        </BrowserRouter>
      )
    );
  }
}

export default App;
