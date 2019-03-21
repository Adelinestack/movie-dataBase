import React from 'react';

const languages = {
  language: 'en-EN',
  changeLanguage: () => null,
};

export const LanguageContext = React.createContext(languages);
