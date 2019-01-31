import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import NewMovies from './NewMovies';
import Movie from './Movie';
import SearchBar from './SearchBar';
import People from './People';
import { getUpcoming } from '../services/MoviesApi';
import { Container } from '../stylized/appStyle.js';

const Error = () => <div>404 PAGE</div>;

export default class App extends PureComponent {
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
      <Container>
        <i className="fas fa-3x fa-spinner fa-pulse" />
      </Container>
    );

    return (
      loadingElement || (
        <BrowserRouter>
          <Container>
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
                <Route
                  exact
                  path="/people/:peopleId"
                  render={props => <People {...props} />}
                />
                <Route path="/" component={Error} />
              </Switch>
            </main>
          </Container>
        </BrowserRouter>
      )
    );
  }
}
