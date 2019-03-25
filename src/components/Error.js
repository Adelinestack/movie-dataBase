import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import withLanguagesContext from '../hoc/withLanguagesContext';
import { LANGUAGES } from '../utils/languages';
import { ErrorLink } from '../stylized/errorStyle';

const Error = ({ language }) => {
  const {
    [language]: { error, errorRedirection },
  } = LANGUAGES;

  return (
    <main>
      <h2>{error} - Page 404</h2>
      <p>Oups...</p>
      <ErrorLink href="/">{errorRedirection}</ErrorLink>
    </main>
  );
};

export default withLanguagesContext(memo(Error));
