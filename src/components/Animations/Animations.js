import React, {Component} from 'react';
import PropTypes from 'prop-types';
import snapFoo from 'snapfoo';
import './Animations.css';

class Animations extends Component {
  constructor() {
    super();

    this.getHeaderAnimation = this.getHeaderAnimation.bind(this);
    this.buildWatchsettings = this.buildWatchsettings.bind(this);
    this.SnapFoo = null;
  }

  componentDidMount() {
    this.buildWatchsettings();
  }

  componentWillUnmount() {
    this.SnapFoo = null;
  }

  buildWatchsettings() {
    let settings = null;
    let element;
    let type;
    let callback = null;

    switch (this.props.type) {
      case 'header':
        this.SnapFoo = snapFoo(`#header-animation`);
        type = 'animatePath';
        element = '#ball-one';
        settings = {
          duration: 2500,
          loop: true,
          path: '#path-one'
        };
        this.SnapFoo[type](element, settings, callback);

        type = 'animatePath';
        element = '#ball-two';
        settings = {
          duration: 2500,
          loop: true,
          path: '#path-two'
        };
        this.SnapFoo[type](element, settings, callback);

        type = 'animatePath';
        element = '#ball-three';
        settings = {
          duration: 2500,
          loop: true,
          path: '#path-three'
        };
        this.SnapFoo[type](element, settings, callback);

        type = 'animatePath';
        element = '#ball-four';
        settings = {
          duration: 2500,
          loop: true,
          path: '#path-four'
        };
        this.SnapFoo[type](element, settings, callback);
        break;

      case 'reset':
        this.SnapFoo = snapFoo(`#reset-animation`);
        type = 'animate';
        element = '#reset';
        settings = {
          frames: [{
            props: { transform: "t200,0" }
          }, {
            props: { transform: "t200,0, s.75,.75" }
          }, {
            props: { transform: "t400,0, s.75,.75" }
          }],
          duration: 3000,
          reset: true
        };
        this.SnapFoo[type](element, settings, callback);

        element = '#no-reset';
        settings.reset = false;
        this.SnapFoo[type](element, settings, callback);

        break;

      default:
        return false;
    }
  }

  getHeaderAnimation() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" id='header-animation' version="1.1" x="0" y="0" viewBox="0 0 510 510" xmlSpace="preserve">
        <path id="path-four" className="header-st0" d="M466,254.5H34c0,0-27.5,216,221.5,216v-431C255.5,39.5,466,7.5,466,254.5z"/>
        <path id="path-three" className="header-st0" d="M256.6,29.4v432c0,0,208,41,208-208h-431C33.6,253.4,9.6,29.4,256.6,29.4z"/>
        <path id="path-two" className="header-st0" d="M254.5,29.4v432c0,0-221.6,41-221.6-208h431C463.9,253.4,501.5,29.4,254.5,29.4z"/>
        <path id="path-one" className="header-st0" d="M31.5,254.5h434c0,0,39,216-210,216v-439C255.5,31.5,31.5,7.5,31.5,254.5z"/>
        <circle id="ball-one" className="header-st1" cx="31.5" cy="255" r="26.5"/>
        <circle id="ball-two" className="header-st1" cx="255" cy="31.5" r="26.5"/>
        <circle id="ball-three" className="header-st1" cx="255" cy="31.5" r="26.5"/>
        <circle id="ball-four" className="header-st1" cx="31.5" cy="255" r="26.5"/>
      </svg>
    )
  }

  getAnimateAnimation() {
    return (
      <p>need an animate demo</p>
    )
  }

  getAnimatePathAnimation() {
    return (
      <p>need an animate path demo</p>
    )
  }

  getCallbackAnimation() {
    return (
      <p>need a callback demo</p>
    )
  }

  getLoopAnimation() {
    return (
      <p>need a loop demo</p>
    )
  }

  getResetAnimation() {
    return (
      <p>need a reset demo</p>
    )
  }

  render() {
      let animation;

      switch (this.props.type) {
        case 'header':
          animation = this.getHeaderAnimation();
          break;

        case 'animate':
          animation = this.getAnimateAnimation();
          break;

        case 'animate-path':
          animation = this.getAnimatePathAnimation();
          break;

        case 'callback':
          animation = this.getCallbackAnimation();
          break;

        case 'loop':
          animation = this.getLoopAnimation();
          break;

        case 'reset':
          animation = this.getResetAnimation();
          break;

        default:
          return false;
      }

      return animation;
  }
}

Animations.propType = {
  type: PropTypes.string.isRequired,
}

export default Animations;
