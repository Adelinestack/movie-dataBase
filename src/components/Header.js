import React, { memo } from 'react';
import './header.module.css';

function Header() {
  return (
    <header>
      <a href="/">
        <i className="fas fa-play-circle" />
        <h1>Moviee</h1>
      </a>
    </header>
  );
}
export default memo(Header);
