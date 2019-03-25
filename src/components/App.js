import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import Header from './Header';
import NewMovies from './NewMovies';
import Movie from './Movie';
import SearchBar from './SearchBar';
import People from './People';
import Error from './Error';
import { getUpcoming } from '../services/MoviesApi';
import { Container, PagesContainer, Main } from '../stylized/appStyle.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default class App extends PureComponent {
  state = {
    upcomingMovies: [],
    language: 'en-EN',
    changeLanguage: this.changeLanguage.bind(this),
  };

  componentDidMount() {
    this.fetchUpcomingMovies(this.state.language);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.upcomingMovies.length === 0 ||
      this.state.language !== prevState.language
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
            <LanguageContext.Provider value={this.state}>
              <Header />
              <Main>
                <SearchBar />
                <Route
                  render={({ location }) => {
                    return (
                      <TransitionGroup>
                        <CSSTransition
                          key={location && location.key}
                          classNames="page"
                          timeout={3000}
                        >
                          <PagesContainer>
                            <Switch location={location}>
                              <Route
                                exact
                                path="/"
                                render={props => (
                                  <NewMovies
                                    {...props}
                                    upcomingMovies={upcomingMovies}
                                  />
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
                          </PagesContainer>
                        </CSSTransition>
                      </TransitionGroup>
                    );
                  }}
                />
              </Main>
            </LanguageContext.Provider>
          </Container>
        </BrowserRouter>
      )
    );
  }
}
