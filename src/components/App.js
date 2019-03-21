import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
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
    language: 'en-EN',
    changeLanguage: this.changeLanguage.bind(this),
  };

  componentDidMount() {
    this.fetchUpcomingMovies(this.state.language);
  }

  componentDidUpdate(prevstate) {
    if (
      this.state.upcomingMovies.length === 0 ||
      this.state.language !== prevstate.language
    ) {
      this.fetchUpcomingMovies(this.state.language);
    }
  }
  async fetchUpcomingMovies(language) {
    const upcomingMovies = await getUpcoming(language);
    this.setState({
      upcomingMovies,
    });
  }

  changeLanguage() {
    this.setState(({ language }) => ({
      language: language === 'en-EN' ? 'fr-FR' : 'en-EN',
    }));
  }

  render() {
    const { upcomingMovies, language } = this.state;
    const loadingElement = upcomingMovies.length === 0 && (
      <Container>
        <i className="fas fa-3x fa-spinner fa-pulse" />
      </Container>
    );

    return (
      loadingElement || (
        <BrowserRouter>
          <Container>
            <LanguageContext.Provider value={this.state}>
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
              </main>{' '}
            </LanguageContext.Provider>
          </Container>
        </BrowserRouter>
      )
    );
  }
}
