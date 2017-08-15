import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

import './Nav.css';

class Nav extends Component {
  render() {
    return (
        <nav className="primary-nav">
          <ul className="flex-container">
            <li>
              <NavLink to="/snapfoo/docs">Docs</NavLink>
            </li>
            <li>
              <NavLink to="/snapfoo/guides">Guides</NavLink>
            </li>
            <li>
              <a href="https://github.com/yuschick/snapfoo">Github</a>
            </li>
          </ul>
        </nav>
    );
  }
}

export default Nav;
