import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import SVGWatch from './../SVGWatch/SVGWatch';
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
            text: 'animate details whatever wubba lubba dub dub!',
          }
        ];

        code = `let settings = {
  dials: [{
    name: 'primary',
    hands: {
      hour: 'dial-primary-hour-hand',
      minute: 'dial-primary-minute-hand',
      second: 'dial-primary-second-hand'
    }
  },
  {
    name: 'secondary',
    hands: {
      hour: 'dial-secondary-hour-hand',
      minute: 'dial-secondary-minute-hand',
      second: 'dial-secondary-second-hand'
    },
    timezone: 'America/New_York',
    sweep: true
  }]
};

let demo = new Watch(settings);
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
