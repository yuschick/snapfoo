import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Animations from './../Animations/Animations';
import Button from './../Button/Button';
import CodeBlock from './../CodeBlock/CodeBlock';

import './ComplicationContainer.css';

class ComplicationContainer extends Component {
  constructor() {
    super();
    this.getDescription = this.getDescription.bind(this);
  }

  getDescription() {
    let desc;
    let code;

    switch (this.props.id) {
      case 'animate':
        desc = [
          {
            key: 'animate-01',
            text: 'Calling the Animate method of Snapfoo allows a variety of settings and options to create a range of effects. This call supports jQuery-like selectors to target specific elementd within an SVG container, iterating over each and each frame.',
          },
          {
            key: 'animate-02',
            text: 'Additionally, looping these animations, specifying callbacks, and defining frame-specific behavior are all possible features within the SnapFoo library. Visit the docs to learn more.',
          }
        ];

        code = ``;
        break;

      case 'animate-path':
        desc = [
          {
            key: 'animatepath-01',
            text: 'The AnimatePath method of SnapFoo supports a jQuery like selector to target specific element(s) that are to be animated along an SVG path. By providing the path id, the elements will move along based on the additional settings.',
          },
          {
            key: 'animatepath-02',
            text: 'In addition to animating along the path itself, SnapFoo supports features to customize this behavior. Elements can begin at the end of the path and animate in reverse, they can be looped, or even rewind back once the end of the path is reached. Visit ther docs to learn more.',
          }
        ];

        code = ``;
        break;

      case 'callback':
        desc = [
          {
            key: 'callback-01',
            text: 'Each animation supports the inclusion of a callback. The callback will by default reference the current element animating by using the jQuery $(this) syntax.',
          },
          {
            key: 'callback-02',
            text: 'SnapFoo provides an option of when callbacks should be executed in the event they should run during loops or when multiple elements are animating. Visit the docs to learn more about callbacks and the callbackAt property.',
          }
        ];

        code = ``;
        break;

      case 'loop':
        desc = [
          {
            key: 'loop-01',
            text: 'loop details whatever wubba lubba dub dub!',
          }
        ];

        code = ``;
        break;

      case 'reset':
        desc = [
          {
            key: 'reset-01',
            text: 'animate reset details!',
          }
        ];

        code = `const FramesObj = {
  frames: [{
    props: { transform: "t200,0" }
  }, {
    props: { transform: "t200,0, s.75,.75" },
    easing: mina.bounce
  }, {
    props: { transform: "t400,0, s.75,.75" }
  }],
  duration: 3000,
  reset: true
};

snapfoo.animate('#reset', FramesObj);
`;
        break;

      default:
        return false;
    }

    return {desc, code};
  }
  render() {
    return (
      <section className={`complication-container flex-container is-spread ${!this.props.active ? 'is-hidden' : false}`} data-comp={this.props.id}>
        <div className='flex-one'>
          {
            this.getDescription().desc.map(para => {
              return (
                <p key={para.key}>{para.text}</p>
              );
            })
          }
          <div className='flex-container'>
            <Button type='primary' text='View Docs' url={`./docs#${this.props.docs}`} />
            <Button type='primary view-code-btn' text='Toggle Code' url='#' data={this.props.demo} action={this.props.toggle} />
          </div>
          <section className={`complication code-block-container ${!this.props.showCode ? 'is-hidden' : ''}`} data-type={this.props.demo}>
            <CodeBlock>
              {this.getDescription().code}
            </CodeBlock>
          </section>
        </div>
        <div className='complication-demo flex-one'>
          <Animations type={this.props.id} />
        </div>
      </section>
    );
  }
}

ComplicationContainer.propTypes = {
  id: PropTypes.string.isRequired,
  docs: PropTypes.string.isRequired,
  demo: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  showCode: PropTypes.bool.isRequired,
}

export default ComplicationContainer;
