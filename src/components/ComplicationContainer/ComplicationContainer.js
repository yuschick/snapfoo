import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SVGWatch from './../SVGWatch/SVGWatch';
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
      case 'dials':
        desc = [
          {
            key: 'dials-01',
            text: 'The dials are the primary component in TickTock. A dial serves as a collection of hand elements and settings used to indicate the time by rotating the hands or discs according to the local time, the provided GMT offset, or the manually set time. Perhaps the most powerful feature is the ability to include multiple dials in one watch as the example shows.',
          },
          {
            key: 'dials-02',
            text: `In the demo, the watch is displaying dual time zones commonly referred to as a Dual Time or GMT complication. The larger dial is acting as the current, local time whereas the sub dial at 6 o${String.fromCharCode(39)}clock is acting as the home time with its GMT Offset set to ${String.fromCharCode(39)}+6${String.fromCharCode(39)} hours.`,
          },
          {
            key: 'dials-03',
            text: 'Additionally, a dial supports sweeping and ticking seconds hands. The primary dial shows a ticking seconds hand, or deadbeat seconds, while the sub dial shows the seconds hand sweeping.',
          },
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
        case 'chronograph':
          desc = [
            {
              key: 'chronograph-01',
              text: 'A chronograph is a specific type of watch that is used as a stopwatch combined with a display watch. A basic chronograph has an independent sweep second hand; it can be started, stopped, and returned to zero by successive pressure on the stem.',
            },
            {
              key: 'chronograph-02',
              text: `In the demo, the standard time is represented with the minute and hour hands on the primary dial and the second hand at the 6 o${String.fromCharCode(39)}clock position. The chronograph is represented with the teal hand on the primary dial that will tick every tenth of a second and the two dials at 3 and 9 o${String.fromCharCode(39)}clock for the chronograph minutes and seconds.`,
            },
            {
              key: 'chronograph-03',
              text: `The chronograph is activated by clicking on the button between 1 and 2 o${String.fromCharCode(39)}clock. Clicking the button again will toggle pausing and resuming the functionality. At any point, clicking the button between 4 and 5 o${String.fromCharCode(39)}clock will stop the chronograph and reset the hands to their original positions. Ticktock expects all hands to be drawn in their 12 o${String.fromCharCode(39)}clock position initially.`,
            },
          ];

          code = `settings = {
  dials: [{
      name: 'primary',
      hands: {
        hour: 'hour-hand',
        minute: 'minute-hand',
        second: 'second-hand',
      },
      sweep: true,
    },
  ],
  chronograph: {
    buttons: {
      start: 'start-pause-btn',
      reset: 'reset-btn',
    },
    hands: {
      tenth: 'chrono-tenth-second-hand',
      second: 'chrono-second-hand',
      minute: 'chrono-minute-hand',
    },
  },
};`;
          break;
      case 'perpetual-calendar':
        desc = [
          {
            key: 'calendar-01',
            text: 'It is very common to find watches and clocks that display calendar information. Whether this is a simple date display or a full perpetual calendar which shows the month, date, day, and a year indicator to show the current year\'s relation to a leap year. TickTock supports all of these individual complications so any combination of such can be created.',
          },
          {
            key: 'calendar-02',
            text: `In the demo, the month and day abbreviations are shown as well as the current date. The year display, at 6 o${String.fromCharCode(39)}clock, shows a circle broken into quadrants where the highlighted quadrant indicates the leap year. From this display, we can conclude that 2020 will be the next leap year.`,
          },
        ];

        code = `let settings = {
  dials: [{
    hands: {
      hour: 'perpetual-hour-hand',
      minute: 'perpetual-minute-hand',
      second: 'perpetual-second-hand'
    }
  }],
  day: {
    id: 'day-indicator-disc'
  },
  date: {
    id: 'date-disc'
  },
  month: {
    id: 'month-disc'
  },
  year: {
    id: 'year-hand'
  }
};

let demo = new Watch(settings);
`;
      break;
      case 'day-night-indicator':
        desc = [
          {
            key: 'daynight-01',
            text: 'A day/night indicator shows which half of the day corresponds to, typically, a 12-hour time display. In the demo this works by rotating the indicator disc underneath a mask to only display the appropriate half. In TickTock this indicator defaults to represent the time of the first dial in the dials array. However, the indicator can also be adjusted to work off of a secondary dial.',
          },
          {
            key: 'daynight-02',
            text: `Many simple day/night indicators are a two-color disc that show "day" only from midnight to 6 AM and "night" only from noon to 6 PM, with a half-day or half-night display the rest of the time. TickTock follows this convention.`,
          },
        ];
        code = `let settings = {
  dials: [{
    hands: {
      hour: 'day-night-hour-hand',
      minute: 'day-night-minute-hand',
      second: 'day-night-second-hand'
    }
  }],
  dayNightIndicator: {
    id: 'day-night-dial'
  }
};

let demo = new Watch(settings);
`;
      break;
      case 'manual-time':
        desc = [
          {
            key: 'crown-01',
            text: 'The manual time complication allows a user to click the crown of the watch to temporarily pause its running. In this state, referred to as the set state, they\'re able to use the arrow keys to manually adjust the time. Upon clicking the crown again, TickTock will resume telling the time from the manually set position. To account for visual cues, on click, the crown will toggle an \'active\' class.',
          },
          {
            key: 'crown-02',
            text: `Additionally, if a secondary dial is being used, while in the set state, the right arrow key will allow a user to target the secondary dial to set its time independently.`,
          },
        ];
        code = `let settings = {
  dials: [{
      name: 'primary',
      hands: {
        hour: 'crown-primary-hour-hand',
        minute: 'crown-primary-minute-hand',
        second: 'crown-primary-second-hand'
      }
    },
    {
      name: 'secondary',
      hands: {
        hour: 'crown-secondary-hour-hand',
        minute: 'crown-secondary-minute-hand'
      },
      offset: '+6'
    }
  ],
  crown: {
    id: 'the-crown'
  }
};

let demo = new Watch(settings);
`;
      break;
      case 'minute-repeater':
        desc = [
          {
            key: 'repeater-01',
            text: 'A repeater is a complication that audibly chimes the hours and often minutes at the press of a button. There are many types of repeater but the minute repeater chimes the time down to the minute, using separate tones for hours, quarter hours, and minutes.',
          },
          {
            key: 'repeater-02',
            text: `TickTock follows the convention of chiming for every hour, quarter hour, and single minute. It defaults to indicating the time of the first dial passed into the dials array but can be set to read a secondary dial as well. And the trigger for the repeater can be any element (SVG or otherwise) so long as its ID is passed into the settings.`,
          },
        ];
        code = `let settings = {
  dials: [{
    hands: {
      hour: 'repeater-hour-hand',
      minute: 'repeater-minute-hand',
      second: 'repeater-second-hand'
    }
  }],
  repeater: {
    id: 'play-repeater',
    chimes: {
      hour: './sounds/chime-01.mp4',
      quarter: './sounds/chime-02.mp4',
      minute: './sounds/chime-03.mp4'
    }
  }
};

let demo = new Watch(settings);
`;
      break;
      case 'moonphase':
        desc = [
          {
            key: 'moonphase-01',
            text: 'A moon-phase indication is a rotating disc, shown in a dial section, that indicates the position of the moon - usually the way it presents itself at the observation of the Northern Hemisphere.',
          },
          {
            key: 'moonphase-02',
            text: `TickTock will rotate the moonphase disc from new moon to waxing crescent, first quarter, waxing gibbous, full moon, waning gibbous, three quarter, and waning crescent. It will also default to rotating the disc clockwise beginning from the full moon position which can be reversed with the 'invert' property.`,
          },
        ];
        code = `let settings = {
  dials: [{
    hands: {
      hour: 'moonphase-hour-hand',
      minute: 'moonphase-minute-hand',
      second: 'moonphase-second-hand'
    }
  }],
  moonphase: {
    id: 'moonphase-dial'
  }
};

let demo = new Watch(settings);
`;
      break;
      case 'power-reserve':
        desc = [
          {
            key: 'reserve-01',
            text: 'A power reserve indicator is a complication of the watch which is designed to show the amount of remaining stored energy. The power reserve indicator indicates the tension on the mainspring at any particular moment. If the indicator is fully drained, the watch will stop running until it\'s wound again.',
          },
          {
            key: 'reserve-02',
            text: `Many reserve indicators are half circles or partial curves. So TickTock accepts a range of rotation values, its empty and full positions, to determine the movement of the hand. The hand will be placed in the full position by default and will drain 0.5deg per second. As the reserve reaches its empty range value, all complications cease to work until the watch is wound again by using the left arrow key.`,
          },
          {
            key: 'reserve-03',
            text: `Note that the range values are relative to the hand's starting position.`,
          },
        ];
        code = `let settings = {
  dials: [{
    hands: {
      hour: 'reserve-hour-hand',
      minute: 'reserve-minute-hand',
      second: 'reserve-second-hand'
    }
  }],
  reserve: {
    id: 'reserve-hand',
    range: [-90, 90]
  }
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
          <SVGWatch watch={this.props.id} active={this.props.active} />
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
