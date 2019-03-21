import React, { Component } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

function withLanguagesContext(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <LanguageContext.Consumer>
          {language => (
            <WrappedComponent {...this.props} language={language.language} />
          )}
        </LanguageContext.Consumer>
      );
    }
  };
}

export default withLanguagesContext;
