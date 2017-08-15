import React, {Component} from 'react';

import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className='flex-container is-spread'>
        <div>
          <a href='https://www.github.com/yuschick' target='new'>github.com/yuschick</a> | <a href='https://www.twitter.com/yuschick' target='new'>twitter.com/yuschick</a>
        </div>
        <div>
          <span className='tertiary-text'>&copy;{new Date().getFullYear()} SnapFoo</span>
        </div>
      </footer>
    );
  }
}

export default Footer;
