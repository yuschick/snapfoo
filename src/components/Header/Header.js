import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Nav from './../Nav/Nav';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className='main-header'>
        <div className='container flex-container is-spread'>
          <h2>
            <Link to="/snapfoo/">
              SnapFoo
              <span> JS</span>
            </Link>
          </h2>
          <Nav />
        </div>
      </header>
    );
  }
}

export default Header;
