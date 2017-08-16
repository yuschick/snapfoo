import React, {Component} from 'react';
import PropTypes from 'prop-types';
import snapFoo from 'snapfoo';
import './Animations.css';

class Animations extends Component {
  constructor() {
    super();

    this.getHeaderAnimation = this.getHeaderAnimation.bind(this);
  }

  getHeaderAnimation() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 510 510" xmlSpace="preserve">
        <path id="path-four" className="header-st0" d="M466 254.5H34c0 0-41 208 208 208v-431C242 31.5 466 7.5 466 254.5zM256.6 29.4v432c0 0 208 41 208-208h-431C33.6 253.4 9.6 29.4 256.6 29.4zM240.9 29.4v432c0 0-208 41-208-208h431C463.9 253.4 487.9 29.4 240.9 29.4zM31.5 254.5h432c0 0 41 208-208 208v-431C255.5 31.5 31.5 7.5 31.5 254.5z"/>
        <circle id="ball-one" className="header-st1" cx="31.5" cy="255" r="26.5"/>
        <circle id="ball-two" className="header-st1" cx="255" cy="31.5" r="26.5"/>
        <circle id="ball-three" className="header-st1" cx="255" cy="31.5" r="26.5"/>
        <circle id="ball-four" className="header-st1" cx="31.5" cy="255" r="26.5"/>
      </svg>
    )
  }

  render() {
      let animation;

      switch (this.props.type) {
        case 'header':
          animation = this.getHeaderAnimation();
          break;

        default:
          return false;
      }

      return animation;
  }
}

Animations.propType = {
  parent: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default Animations;
