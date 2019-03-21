import React from 'react';

const themes = {
  themeColor: 'dark',
  toggleTheme: () => null,
};

export const ThemeContext = React.createContext(themes);
