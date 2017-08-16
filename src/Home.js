import React, {Component} from 'react';
import SecondaryNav from './components/SecondaryNav/SecondaryNav';
import ComplicationContainer from './components/ComplicationContainer/ComplicationContainer';
import Animations from './components/Animations/Animations';

class Home extends Component {
  constructor() {
    super();

    this.updateActiveDemo = this.updateActiveDemo.bind(this);
    this.toggleCodeBlock = this.toggleCodeBlock.bind(this);

    this.state = {
      activeDemo: 'animate',
      showCode: false,
    };
  }

  updateActiveDemo(demo) {
    const activeDemo = demo;
    this.setState({activeDemo, showCode: false});
  }

  toggleCodeBlock(event) {
    event.preventDefault();

    const showCode = !this.state.showCode;
    this.setState({showCode});
  }

  render() {
    return (
      <div>
        <section className='panel flex-container-column center-content has-pattern'>
          <div className='container'>
            <div id='header-animation-container' className='header-watch-container'>
              <Animations parent='header-animation-container' type='header' />
            </div>
            <h1>Snapfoo <span>JS</span></h1>
            <h3 className='has-spacer'>bringing life to svg animation</h3>
            <p className='is-capped is-centered'>
              SnapFoo extends off of SnapSVG to simplify its animation process.
            </p>
            <section className='panel install-container center-content'>
              <div className='code-block-container'>
                <code>yarn add snapfoo --dev</code>
              </div>
              <div className='code-block-container'>
                <code>npm install snapfoo --save-dev</code>
              </div>
              <img src='https://badge.fury.io/js/snapfoo.svg' alt='Latest Snapfoo Version' />
            </section>
          </div>
        </section>
        <section className='panel is-shaded'>
          <div className='container'>
            <h4 className='is-light'>Demos</h4>
            <SecondaryNav active={this.state.activeDemo} update={this.updateActiveDemo} />
            <ComplicationContainer toggle={this.toggleCodeBlock} showCode={this.state.showCode} id='animate' demo='animate-demo' active={this.state.activeDemo === 'animate'} docs='animate-overview'  />
          </div>
        </section>
        <section className='panel container'>
          <h4>About</h4>
          <p>During a project in 2014 that was built heavily around SnapSVG, the original functionality for SnapFoo was written. The project required a lot of animations, looping, and customized settings which resulted in plenty of lengthy functions with far too many arguments for easy re-use. After the project finished, SnapFoo was built by consolidating the functionality and simplifying the logic to help ease the challenges of animating within the SnapSVG library.</p>
          <p>The goal of SnapFoo is to improve the broader scope of SnapSVG, a great library for creating SVG images. It leverages the already existing animation logic in SnapSVG but adds an abstracted layer to simplify and expand upon its use.</p>
          <p>Lightweight, flexible, and with plenty of options, SnapFoo brings more power to SnapSVG for your SVG creation and animation needs.</p>
        </section>
      </div>
    );
  }
}

export default Home;
