import React, { PureComponent } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { HeaderLink, Circle, Button } from '../stylized/headerStyle.js';

export default class Header extends PureComponent {
  static contextType = LanguageContext;

  render() {
    return (
      <header>
        <HeaderLink href="/">
          <Circle className="fas fa-play-circle" />
          <h1>Moviee</h1>
        </HeaderLink>
        <Button onClick={this.context.changeLanguage}>FR or EN</Button>
      </header>
    );
  }
}
