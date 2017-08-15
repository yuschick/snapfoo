import React, {Component} from 'react';
import AsideNav from './components/AsideNav/AsideNav';
import CodeBlock from './components/CodeBlock/CodeBlock';
import DocSection from './components/DocSection/DocSection';
import DocSpecs from './components/DocSpecs/DocSpecs';

class Docs extends Component {
  constructor() {
    super();

    this.updateActiveMenu = this.updateActiveMenu.bind(this);
    this.checkScrollPosition = this.checkScrollPosition.bind(this);
    this.toggleDocTreeGroups = this.toggleDocTreeGroups.bind(this);
    this.triggerScrollEvent = this.triggerScrollEvent.bind(this);
    this.scrollToView = this.scrollToView.bind(this);

    this.state = {
      fixed: false,
      menu: [
        {
          header: 'Getting Started',
          active: true,
          items: [
            {
              label: 'Getting Started with Node.js',
              anchor: 'getting-started-overview',
            },
          ],
        },
        {
          header: 'Calendars',
          active: false,
          items: [
            {
              label: 'Date - Overview',
              anchor: 'date-overview',
            },
            {
              label: 'Date - Define the Indicator',
              anchor: 'date-definetheindicator',
            },
            {
              label: 'Date - Define a Split Display',
              anchor: 'date-defineasplitdisplay',
            },
            {
              label: 'Date - Retrograde Display',
              anchor: 'date-retrogradedisplay',
            },
            {
              label: 'Day - Overview',
              anchor: 'day-overview',
            },
            {
              label: 'Day - Define the Indicator',
              anchor: 'day-definetheindicator',
            },
            {
              label: 'Day - Offset Hours',
              anchor: 'day-offsethours',
            },
            {
              label: 'Month - Overview',
              anchor: 'month-overview',
            },
            {
              label: 'Month - Define the Indicator',
              anchor: 'month-definetheindicator',
            },
            {
              label: 'Year - Overview',
              anchor: 'year-overview',
            },
            {
              label: 'Year - Define the Indicator',
              anchor: 'year-definetheindicator',
            },
            {
              label: 'Year - Offset Months',
              anchor: 'year-offsetmonths',
            },
          ],
        },
        {
          header: 'Chronograph',
          active: false,
          items: [
            {
              label: 'Overview',
              anchor: 'chronograph-overview',
            },
            {
              label: 'Define the Hands',
              anchor: 'chronograph-definethehands',
            },
            {
              label: 'Define the Buttons',
              anchor: 'chronograph-definethebuttons',
            },
            {
              label: 'Flyback Chronograph',
              anchor: 'chronograph-flyback',
            },
            {
              label: 'Button Active States',
              anchor: 'chronograph-activestates',
            },
          ],
        },
        {
          header: 'Day/Night Indicator',
          active: false,
          items: [
            {
              label: 'Overview',
              anchor: 'day-night-overview',
            },
            {
              label: 'Define the Indicator',
              anchor: 'day-night-definetheindicator',
            },
            {
              label: 'Target a Specific Dial',
              anchor: 'day-night-targetaspecificdial',
            },
            {
              label: 'Invert the Direction',
              anchor: 'day-night-invertthedirection',
            },
          ],
        },
        {
          header: 'Dials',
          active: false,
          items: [
            {
              label: 'Overview',
              anchor: 'dials-overview',
            },
            {
              label: 'Define a Dial',
              anchor: 'dials-defineadial',
            },
            {
              label: 'Dial Names',
              anchor: 'dials-dialnames',
            },
            {
              label: 'Define the Hands',
              anchor: 'dials-definethehands',
            },
            {
              label: 'GMT Offsets',
              anchor: 'dials-gmtoffsets',
            },
            {
              label: 'Defining a Timezone',
              anchor: 'dials-timezone',
            },
            {
              label: '12/24-Hour Formats',
              anchor: 'dials-hourformats',
            },
            {
              label: 'Sweeping Seconds',
              anchor: 'dials-sweepingseconds',
            },
            {
              label: 'Multiple Dials',
              anchor: 'dials-multipledials',
            },
          ],
        },
        {
          header: 'Manual Time (Crown)',
          active: false,
          items: [
            {
              label: 'Overview',
              anchor: 'crown-overview',
            },
            {
              label: 'Define the Crown',
              anchor: 'crown-definethecrown',
            },
            {
              label: 'Crown Active States',
              anchor: 'crown-activestates',
            },
            {
              label: 'Watch Keybindings',
              anchor: 'crown-keybindings',
            },
          ],
        },
        {
          header: 'Minute Repeater',
          active: false,
          items: [
            {
              label: 'Overview',
              anchor: 'minute-repeater-overview',
            },
            {
              label: 'Define the Trigger',
              anchor: 'minute-repeater-definethetrigger',
            },
            {
              label: 'Define the Chimes',
              anchor: 'minute-repeater-definethechimes',
            },
            {
              label: 'Target a Specific Dial',
              anchor: 'minute-repeater-targetaspecificdial',
            },
          ],
        },
        {
          header: 'Moonphase',
          active: false,
          items: [
            {
              label: 'Overview',
              anchor: 'moonphase-overview',
            },
            {
              label: 'Define the Element',
              anchor: 'moonphase-definetheelement',
            },
            {
              label: 'Invert the Direction',
              anchor: 'moonphase-invert',
            },
          ],
        },
        {
          header: 'Power Reserve',
          active: false,
          items: [
            {
              label: 'Overview',
              anchor: 'power-reserve-overview',
            },
            {
              label: 'Define the Element',
              anchor: 'power-reserve-definetheelement',
            },
            {
              label: 'Setting the Range of Motion',
              anchor: 'power-reserve-rangeofmotion',
            },
          ],
        },
        {
          header: 'Watch',
          active: false,
          items: [
            {
              label: 'Overview',
              anchor: 'watch-overview',
            },
            {
              label: 'Default Keybindings',
              anchor: 'watch-keybindings',
            },
            {
              label: 'Default Intervals',
              anchor: 'watch-intervals',
            },
          ],
        },
      ],
    }
  }

  componentWillMount() {
    window.addEventListener('scroll', this.triggerScrollEvent);
  }

  componentDidMount() {
    const anchor = this.props.location.hash;
    if (anchor) this.scrollToView(anchor.replace('#',''));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.triggerScrollEvent);
  }

  scrollToView(id) {
    document.getElementById(id).scrollIntoView();
  }

  toggleDocTreeGroups(showGroup) {
    const docTreeGroups = document.querySelectorAll('.menu-group');
    docTreeGroups.forEach(group => {
      if (group.attributes['data-group'].value === showGroup) {
        group.classList.add('active');
      } else {
        group.classList.remove('active');
      }
    });
  }

  checkScrollPosition(pos) {
    const gettingStarted = this.gettingStartedSection;
    const calendarSection = this.calendarsSection;
    const chronographSection = this.chronographSection;
    const indicatorSection = this.dayNightSection;
    const dialsSection = this.dialsSection;
    const crownSection = this.crownSection;
    const repeaterSection = this.repeaterSection;
    const moonphaseSection = this.moonphaseSection;
    const reserveSection = this.reserveSection;

    if (pos >= 57) {
      this.setState({fixed: true});
    } else {
      this.setState({fixed: false});
    }

    if (pos < gettingStarted.offsetTop + gettingStarted.clientHeight) {
      this.toggleDocTreeGroups('getting-started');
    } else if (pos > gettingStarted.offsetTop + gettingStarted.clientHeight && pos < calendarSection.offsetTop + calendarSection.clientHeight) {
      this.toggleDocTreeGroups('calendars');
    } else if (pos > calendarSection.offsetTop + calendarSection.clientHeight && pos < chronographSection.offsetTop + chronographSection.clientHeight) {
      this.toggleDocTreeGroups('chronograph');
    } else if (pos > chronographSection.offsetTop + chronographSection.clientHeight && pos < indicatorSection.offsetTop + indicatorSection.clientHeight) {
      this.toggleDocTreeGroups('day-night-indicator');
    } else if (pos > indicatorSection.offsetTop + indicatorSection.clientHeight && pos < dialsSection.offsetTop + dialsSection.clientHeight) {
      this.toggleDocTreeGroups('dials');
    } else if (pos > dialsSection.offsetTop + dialsSection.clientHeight && pos < crownSection.offsetTop + crownSection.clientHeight) {
      this.toggleDocTreeGroups('manual-time (crown)');
    } else if (pos > crownSection.offsetTop + crownSection.clientHeight && pos < repeaterSection.offsetTop + repeaterSection.clientHeight) {
      this.toggleDocTreeGroups('minute-repeater');
    } else if (pos > repeaterSection.offsetTop + repeaterSection.clientHeight && pos < moonphaseSection.offsetTop + moonphaseSection.clientHeight) {
      this.toggleDocTreeGroups('moonphase');
    } else if (pos > moonphaseSection.offsetTop + moonphaseSection.clientHeight && pos < reserveSection.offsetTop + reserveSection.clientHeight) {
      this.toggleDocTreeGroups('power-reserve');
    } else {
      this.toggleDocTreeGroups('watch');
    }
  }

  triggerScrollEvent() {
    let ticking = false;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        this.checkScrollPosition(window.scrollY);
        ticking = false;
      });
    }
    ticking = true;
  }

  updateActiveMenu(header) {
    const menu = this.state.menu;

    menu.forEach(item => {
      item.active = false;
      if (item.header === header) item.active = true;
    });

    this.setState({menu});
  }

  render() {
    return (
      <div className='container flex-container'>
        <AsideNav menu={this.state.menu} update={this.updateActiveMenu} fixed={this.state.fixed} />
        <section className={`flex-four docs-container ${this.state.fixed ? 'fixed-nav' : ''}`}>
          <section ref={section => this.gettingStartedSection = section}>
            <DocSection groupHeader='Getting Started' subHeader='Getting Started with Node.js' anchor='getting-started-overview'>

              <p>Getting up and running with TickTock via NPM and Node.js is quick. First, install the package into your project.</p>

              <CodeBlock lang='none'>{`yarn add ticktock-js --dev`}</CodeBlock>
              <CodeBlock lang='none'>{`npm install ticktock-js --save-dev`}</CodeBlock>

              <p>Include the package in your project.</p>

              <CodeBlock>{`const Watch = require('ticktock-js')`}</CodeBlock>

              <p>Lastly, create the <span className='is-code-ref'>settings</span> object and instantiate the new Watch class.</p>

              <CodeBlock>
  {`const settings = {
  dials: [{
    name: 'primary',
    hands: {
      hour: 'primary-hour-hand',
      minute: 'primary-minute-hand',
      second: 'primary-second-hand'
    }
  },
  {
    name: 'secondary',
    hands: {
      hour: 'secondary-hour-hand',
      minute: 'secondary-minute-hand',
      second: 'secondary-second-hand'
    },
    offset: '+4',
    sweep: true
  }],
  reserve: {
    id: 'power-reserve-hand',
    range: [-90, 90]
  }
};
let demo = new Watch(settings);`}
              </CodeBlock>
            </DocSection>
          </section>

          <section ref={section => this.calendarsSection = section}>
            <DocSection groupHeader='Calendars' anchor='calendars-overview'>
              <p>It is very common to find watches and clocks that display calendar information. Whether this is a simple date display or a full perpetual calendar which shows the month, date, day, and a year indicator to show the current year{String.fromCharCode(39)}s relation to
              a leap year. TickTock supports all of these individual complications so any combination of such can be created.</p>
            </DocSection>
            <DocSection subHeader='Date - Overview' anchor='date-overview'>
              <DocSpecs property='date' />
              <p>Date indicators are used to show the current date of the month. They{String.fromCharCode(39)}re commonly paired with a Day Indicator and part of several date-related complications comprising annual and perpetual calendars.</p>
              <p>TickTock expects the initial position of the indicator to be on the 1st. It will then rotate for each day from there.</p>
              <CodeBlock>
  {`let settings = {
  ...
  date: {
    id: 'date-disc'
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Date - Define the Indicator' anchor='date-definetheindicator'>
              <DocSpecs property='id' type='String' required='True'/>
              <p>The <span className='is-code-ref'>date</span> object accepts an <span className='is-code-ref'>id</span> property. This property expects a string value of the indicator element{String.fromCharCode(39)}s ID. The indicator{String.fromCharCode(39)}s initial position is expected to be on the 1st and will rotate clockwise for each day from there.</p>
              <CodeBlock>
  {`let settings = {
  ...
  date: {
    id: 'date-disc'
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Date - Define a Split Display' anchor='date-defineasplitdisplay'>
              <DocSpecs property='split' />
              <p>Some date displays are broken into two split discs. One disc shows the ones of the date ranging from 0 - 9 while the other shows the tenths, 0 - 3. Combined, these two split discs display the full date.</p>
              <p>
                TickTock supports this functionality with the <span className='is-code-ref'>split</span> object. By defining the IDs of the <span className='is-code-ref'>ones</span> and <span className='is-code-ref'>tenths</span> discs, TickTock will handle both
                discs simultaneously. Both discs are expected to be initially placed in their 0 position.
              </p>
              <p>
                Note that the <span className='is-code-ref'>Date</span> property accepts <span className='is-strong'>either</span> an <span className='is-code-ref'>id</span> or <span className='is-code-ref'>split</span> property. Including both will result in an error.
              </p>
              <CodeBlock>
  {`let settings = {
  ...
  date: {
    split: {
      ones: 'ones-disc',
      tenths: 'tenths-disc'
    }
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Date - Retrograde Display' anchor='date-retrogradedisplay'>
              <DocSpecs property='retrograde' />
              <p>Retrograde displays are slightly common as a way to tell the date without the use of a full, circular disc. A retrograde display consists of a hand that rotates along a partial circle and upon reaching the end it jumps back to its original position.</p>
              <p>The <span className='is-code-ref'>retrograde</span> object supports one property, <span className='is-code-ref'>max</span>, which is a number. TickTock expects the indicator to be drawn at its starting position which will be treated as 0 degrees. The <span className='is-code-ref'>max</span> value defines how far the hand must rotate before reaching its end. The <span className='is-code-ref'>max</span> value will be divided by 31 and the indiator will be rotated according to that value per the date.</p>
              <p>The <span className='is-code-ref'>max</span> property can be considered optional. If no value is assigned, TickTock will default to <span className='is-code-ref'>180</span>. Given this, the <span className='is-code-ref'>retrograde</span> property could be given a <span className='is-code-ref'>true</span> boolean value instead of an object.</p>
              <p>
                Note that the <span className='is-code-ref'>Date</span> property accepts <span className='is-strong'>either</span> a <span className='is-code-ref'>split</span> or <span className='is-code-ref'>retrograde</span> property. Including both will result in an error. When using the retrograde display, an <span className='is-code-ref'>id</span> property is value is still required.
              </p>
              <CodeBlock>
  {`let settings = {
  ...
  date: {
    id: 'date-arrow',
    retrograde: {
      max: 210
    }
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Day - Overview' anchor='day-overview'>
              <DocSpecs property='day' />
              <p>The Day Indicator will display the name of the current day of the week. Commonly, this component is built as a rotating disc, as in the demo, but can also be represented with a rotating hand.</p>
              <p>
                The default behavior of TickTock is to rotate the day disc once every day to show the correct label beginning with Sunday. However, an additional setting,
                <span className='is-code-ref'>offsetHours</span> can be used to rotate the element an additional amount for the current hour to visually represent the day{String.fromCharCode(39)}s progress.
              </p>
              <CodeBlock>
  {`let settings = {
  ...
  day: {
    id: 'day-indicator-disc',
    offsetHours: true
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Day - Define the Indicator' anchor='day-definetheindicator'>
              <DocSpecs property='id' type='String' required='True' />
              <p>The <span className='is-code-ref'>dayIndicator</span> object accepts an <span className='is-code-ref'>id</span> property. This property expects a string value of the indicator element{String.fromCharCode(39)}s ID.</p>
              <CodeBlock>
  {`let settings = {
  ...
  day: {
    id: 'day-indicator-disc',
    offsetHours: true
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Day - Offset the Hours' anchor='day-offsethours'>
              <DocSpecs property='offset' type='Boolean' def='False' />
              <p>While most indicators rotate once a day to depict the current label, some update regularly with the time to also indicate the progression through the day. Using the <span className='is-code-ref'>offsetHours</span> setting allows TickTock to not only rotate the element to the correct day but to also rotate an additional amount for the day{String.fromCharCode(39)}s current hour.</p>
              <CodeBlock>
  {`let settings = {
  ...
  day: {
    id: 'day-indicator-disc',
    offsetHours: true
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Month - Overview' anchor='month-overview'>
              <DocSpecs property='month' />
              <p>Month indicators are used to display the current month of the year. This is commonly seen as a rotating dial with the month abbreviation being shown through a window but can also be built as a rotating hand pointing to the current month.</p>
              <CodeBlock>
  {`let settings = {
  ...
  month: {
    id: 'month-disc'
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Month - Define the Indicator' anchor='month-definetheindicator'>
              <DocSpecs property='id' type='String' required='True' />
              <p>The <span className='is-code-ref'>month</span> object accepts an <span className='is-code-ref'>id</span> property. This property expects a string value of the indicator element{String.fromCharCode(39)}s ID. The indicator{String.fromCharCode(39)}s initial position is expected to be on January and will rotate clockwise for each month from there.</p>
              <CodeBlock>
  {`let settings = {
  ...
  month: {
    id: 'month-disc'
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Year - Overview' anchor='year-overview'>
              <DocSpecs property='year' />
              <p>A year indicator is commonly included within perpetual calendar complications. It will indicate the current year{String.fromCharCode(39)}s relation to the next leap year. Usually shown as four sections with a rotating hand, the indictor will highlight when the current year is a leap year and show the other year{String.fromCharCode(39)}s position otherwise.</p>
              <p>TickTock also accounts for designs that may want to show the year{String.fromCharCode(39)}s progress. Much like the Day Indicator{String.fromCharCode(39)}s <span className='is-code-ref'>offsetHours</span> functionality, the <span className='is-code-ref'>offsetMonths</span> functionality rotates the indicator 90deg for each year and an additional 7.5deg for each month.</p>
              <CodeBlock>
  {`let settings = {
  ...
  year: {
    id: 'year-disc',
    offsetMonths: true
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Year - Define the Indicator' anchor='year-definetheindicator'>
              <DocSpecs property='id' type='String' required='True' />
              <p>The <span className='is-code-ref'>year</span> object accepts an <span className='is-code-ref'>id</span> property. This property expects a string value of the indicator element{String.fromCharCode(39)}s ID. TickTock, by default, expects the initial position of the indicator
                pointing toward the middle of the first year in the set of four with the fourth year being the leap year.This is different if using <span className='is-code-ref'>offsetMonths</span>.</p>
              <CodeBlock>
  {`let settings = {
  ...
  year: {
    id: 'year-disc'
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Year - Offset the Months' anchor='year-offsetmonths'>
              <DocSpecs property='offset' type='Boolean' def='False' />
              <p>TickTock also accounts for designs that may want to show the year{String.fromCharCode(39)}s progress. Much like the Day Indicator{String.fromCharCode(39)}s offsetHours functionality, the offsetMonths functionality rotates the indicator 90deg for each year and an additional 7.5deg for each month.</p>
              <p>TickTock expects the initial position of the indicator pointing toward the first year in the set of four with the fourth year being the leap year. If the indicator is not going to offset the months, the indictor can point to the middle of the year and will rotate 90deg for each additional year. But if the indicator is to offset the months, the initial position should begin at the very beginning of the first year label as it will rotate 90deg per year and an additional 7.5deg per month.</p>
              <CodeBlock>
  {`let settings = {
  ...
  year: {
    id: 'year-disc',
    offsetMonths: true
  }
};`}
              </CodeBlock>
            </DocSection>
          </section>

          <section ref={section => this.chronographSection = section}>
            <DocSection groupHeader='Chronograph' subHeader='Overview' anchor='chronograph-overview'>
              <DocSpecs property='chronograph' />
              <p>A chronograph is a specific type of watch that is used as a stopwatch combined with a display watch. A basic chronograph has an independent sweep second hand; it can be started, stopped, and returned to zero by successive pressure on the stem.</p>
              <p>The chronograph functionality is triggered with buttons to start/pause and another to reset the hands. There are many variations of chronographs but TickTock expects the start button to be clicked multiple times to pause and resume. A separate reset button will stop the chronograph and reposition all hands to their original state (which TickTock expects to be at the 12 o${String.fromCharCode(39)}clock position). An exception to this is when the chronograph is set be function as a flyback chronograph in which case the reset button returns the hands to their original position but then continues running - for example, if timing laps around a track.</p>
              <p>The <span className='is-code-ref'>chronograph</span> objects expects properties for the <span className='is-code-ref'>hands</span>, <span className='is-code-ref'>buttons</span>, and optionally a <span className='is-code-ref'>flyback</span> boolean.</p>
              <CodeBlock>
{`settings = {
  dials: [{
      name: 'primary',
      hands: {
        hour: 'chrono-dial-hour-hand',
        minute: 'chrono-dial-minute-hand',
        second: 'chrono-dial-second-hand',
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
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Define the Hands' anchor='chronograph-definethehands'>
              <DocSpecs property='hands' required='True' />
              <p>The <span className='is-code-ref'>chronograph</span> object expects a <span className='is-code-ref'>hands</span> object to create references based on element IDs. TickTock supports hands for tenth seconds, seconds, and minutes. Each property should be a string containing the individual hand element ID.</p>
              <CodeBlock>
{`settings = {
  ...
  chronograph: {
    hands: {
      tenth: 'chrono-tenth-second-hand',
      second: 'chrono-second-hand',
      minute: 'chrono-minute-hand',
    },
  },
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Define the Buttons' anchor='chronograph-definethebuttons'>
              <DocSpecs property='buttons' required='True' />
              <p>The <span className='is-code-ref'>chronograph</span> object expects a <span className='is-code-ref'>buttons</span> object to create references based on element IDs.</p>
              <p>The buttons can be any HTML element as long as it has an ID to pass to TickTock. The <span className='is-code-ref'>start</span> button acts as a toggle between starting and pausing the chronograph.</p>
              <p>The <span className='is-code-ref'>reset</span> button by default will stop the chronograph and return the hands to their original positions, which are expected to be at the 12 o{String.fromCharCode(39)}clock position. However, this functionality can be altered by using the <span className='is-code-ref'>flyback</span> property which will then cause the reset button to merely return the hands to their original positions to immediately begin running again without pauing the chronograph.</p>
              <p>Clicking on a button will add an <span className='is-code-ref'>active</span> class to the element. TickTock does this by default as well as adds a <span className='is-code-ref'>transitionend</span> event listener to each button so a pressing animation can be achieved by adding in the CSS styles to the elements and allowing TickTock to toggle the classes.</p>
              <CodeBlock>
{`settings = {
  ...
  chronograph: {
    ...
    buttons: {
      start: 'start-pause-btn',
      reset: 'reset-btn',
    },
  },
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Flyback Chronograph' anchor='chronograph-flyback'>
              <DocSpecs property='flyback' type='Boolean' required='False' def='False' />
              <p>When pressing the reset button on many chronographs, the chronograph stops and the hands return to their original positions. However, a variation of this is the flyback chronograph. Aimed more at timing spits between laps, pressing the reset button on a flyback chronograph will return the hands to their original positions where they will immediately begin running again.</p>
              <p>To fully reset a flyback chronograph, the functionality must be paused prior to pressing reset.</p>
              <CodeBlock>
{`settings = {
  ...
  chronograph: {
    ...
    flyback: true,
  },
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Button Active States' anchor='chronograph-activestates'>
              <p>Clicking on a button will add an <span className='is-code-ref'>active</span> class to the element. TickTock does this by default as well as adds a <span className='is-code-ref'>transitionend</span> event listener to each button so a pressing animation can be achieved by adding in the CSS styles to the elements and allowing TickTock to toggle the classes.</p>
            </DocSection>
          </section>

          <section ref={section => this.dayNightSection = section}>
            <DocSection groupHeader='Day/Night Indicator' subHeader='Overview' anchor='day-night-overview'>
              <DocSpecs property='dayNightIndicator' />
              <p>A day/night indicator shows which half the day cooresponds to. This does not sync up with sunrise and sunset but merely depicts AM and PM. This is a feature commonly found with 12-hour dials or dual time complications to more clearly convey the time of day.</p>
              <p>Many simple day/night indicators are a two-color disc that show {String.fromCharCode(39)}day{String.fromCharCode(39)} only from midnight to 6 AM and {String.fromCharCode(39)}night{String.fromCharCode(39)} only from noon to 6 PM, with a half-day or half-night display the rest of the time. TickTock follows this convention.</p>
              <CodeBlock>
  {`let settings = {
  ...
  dayNightIndicator: {
    id: 'day-night-dial',
    dial: 1,
    invert: true
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Define the Indicator' anchor='day-night-definetheindicator'>
              <DocSpecs property='id' type='String' required='True' />
              <p>The <span className='is-code-ref'>dayNightIndicator</span> object accepts an <span className='is-code-ref'>id</span> property. This property expects a string value of the indicator element{String.fromCharCode(39)}s ID. The default behavior will be for the indicator to rotate clockwise relative to the time of the first dial passed in the dials array.</p>
              <CodeBlock>
  {`let settings = {
  ...
  dayNightIndicator: {
    id: 'day-night-dial'
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Target a Specific Dial' anchor='day-night-targetaspecificdial'>
              <DocSpecs property='dial' type='Number' def='0' />
              <p>The default behavior for the day/night indicator is to depict the time of the first dial (index 0) passed into the <span className='is-code-ref'>dials</span> array. However, if the indicator should represent the time of a secondary dial, use the dial property and pass in a number cooresponding to the dials array index value.</p>
              <p>Note that if changing the default dial for the indicator, the target dial will need to have a <span className='is-code-ref'>name</span> property provided. The indicator looks for the custom dial by name when checking the time and updating.</p>
              <p>In the example code below, the day/night indicator will be tied to the {String.fromCharCode(39)}secondary{String.fromCharCode(39)} dial in the <span className='is-code-ref'>dials</span> array by setting its <span className='is-code-ref'>dial</span> property to a value of 1.</p>
              <CodeBlock>
  {`let settings = {
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
      offset: '+6',
      sweep: true
    }]
  dayNightIndicator: {
    id: 'day-night-dial',
    dial: 1
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Invert the Direction' anchor='day-night-invertthedirection'>
              <DocSpecs property='invert' type='Boolean' def='False' />
              <p>By default, the day/night indicator rotates clockwise with the initial position set to the full day display. To invert this behavior, and rotate counter clockwise, set the <span className='is-code-ref'>invert</span> property to true.</p>
              <CodeBlock>
  {`let settings = {
  ...
  dayNightIndicator: {
    id: 'day-night-dial',
    dial: 1,
    invert: true
  }
};`}
              </CodeBlock>
            </DocSection>
          </section>

          <section ref={section => this.dialsSection = section}>
            <DocSection groupHeader='Dials' subHeader='Overview' anchor='dials-overview'>
              <DocSpecs property='dials' type='Array' required='True' />
              <p>The dials are the primary component in TickTock. A dial serves as a collection of hand elements and settings used to indicate the time by rotating the elements according to the current local time, the provided GMT offset, or the manually set time.</p>
              <CodeBlock>
  {`let settings = {
  dials: [{
    name: 'primary-dial',
    hands: {
      hour: 'element-id',
      minute: 'element-id',
      second: 'element-id'
    },
    offset: '+3',
    format: 12,
    sweep: true
  }]
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Define a Dial' anchor='dials-defineadial'>
              <DocSpecs property='dials' type='Array' required='True' />
              <p>The <span className='is-code-ref'>dials</span> property is an array that contains objects for each individual dial. This allows flexibility in how to display the time as well as how many time zones can be shown.</p>
              <p>Every hand element entered in a dial object will work in unison regardless of where they visually appear in the design. For example, if the watch has large hour and minute hands but shows the seconds in a sub-dial at 6 o{String.fromCharCode(39)}clock, those can still be designated in the same dial object. Just because visually they are not together does not mean that they must be entrered as separate dials.</p>
              <CodeBlock>
  {`let settings = {
  dials: [{
    name: 'primary-dial',
    hands: {
      hour: 'element-id',
      minute: 'element-id',
      second: 'element-id'
    },
    offset: '+3',
    format: 12,
    sweep: true
  }]
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Dial Names' anchor='dials-dialnames'>
              <DocSpecs property='name' type='String' />
              <p>Dial names are not required in most instances. The <span className='is-code-ref'>name</span> is primarily used for personal reference. However, the <span className='is-code-ref'>name</span> does serve a purpose when including the Day/Night Indicator complication. Because Day/Night Indicators are often used on watches that have multiple dials, the name of the dial is used to link the indicator to the correct dial.</p>
              <CodeBlock>
  {`let settings = {
  dials: [{
    name: 'primary-dial',
    ...
  }]
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Define the Hands' anchor='dials-definethehands'>
              <DocSpecs property='hands' type='Object' required='True' />
              <p>The <span className='is-code-ref'>hands</span> object contains three properties, <span className='is-code-ref'>hour</span>, <span className='is-code-ref'>minute</span>, and <span className='is-code-ref'>second</span>. Each property contains a string value of corresponding element{String.fromCharCode(39)}s ID.</p>
              <p>While the <span className='is-code-ref'>hands</span> object is required for the dial component, not every hand is required. A dial could contain an hour and minute hand, just a second hand, or any combination of the three.</p>
              <CodeBlock>
  {`let settings = {
  dials: [{
    name: 'primary-dial',
    hands: {
      hour: 'element-id',
      minute: 'element-id',
      second: 'element-id'
    }
  }]
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='GMT Offsets' anchor='dials-gmtoffsets'>
              <DocSpecs property='offset' type='String' />
              <p className='is-strong'>WIll be deprecated in v3.0 in lieu of the timezone property</p>
              <p>TickTock defaults to the local timezone by using Moment JS'{String.fromCharCode(39)} default date object. However, a dial can be given a specific GMT offset value to override this default.</p>
              <p>The <span className='is-code-ref'>offset</span> property is a string supporting both negative and positive values. The values are relative to the Greenwich Mean Time (GMT). So to set a dial to show the time in New York City the offset property would have a value of {String.fromCharCode(39)}-5{String.fromCharCode(39)}. Whereas showing the time in Singapore would be {String.fromCharCode(39)}+8{String.fromCharCode(39)}.</p>
              <p>Decimal values are also supported. For example, Delhi would have an <span className='is-code-ref'>offset</span> value of {String.fromCharCode(39)}+5.3{String.fromCharCode(39)}.</p>
              <CodeBlock>
  {`let settings = {
  dials: [{
    name: 'primary-dial',
    hands: {
      hour: 'element-id',
      minute: 'element-id',
      second: 'element-id'
    }
  }],
  offset: '+2' // Helsinki, Finland
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Defining a Timezone' anchor='dials-timezone'>
              <DocSpecs property='timezone' type='String' />
              <p>The <span className='is-code-ref'>timezone</span> property was added to ultimately replace the <span className='is-code-ref'>offset</span> property. This property accepts a string of the target timezone. Using MomentJS and Moment Timezone, this new property can take into account Daylight Savings as well as give a more intuitive way of specifying a secondary timezone.</p>
              <p>All accepted timezone values can be found on the <a href='https://github.com/moment/moment-timezone/blob/develop/data/packed/latest.json' target='new'>Moment-Timezone repo</a>.</p>
              <CodeBlock>
  {`let settings = {
  dials: [{
    name: 'primary-dial',
    hands: {
      hour: 'element-id',
      minute: 'element-id',
      second: 'element-id'
    }
  }],
  timezone: 'America/New_York'
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='12/24-hour Formats' anchor='dials-hourformats'>
              <DocSpecs property='offset' type='Number' def='12' />
              <p>Most watches show time in a 12-hour format where the hour hand rotates a full circle every 12 hours. But if the dial is to show the time in a 24-hour format, TickTock supports the <span className='is-code-ref'>format</span> property. The property defaults to 12 but can be set to 24 to adust the rotation value of the hour hand.</p>
              <CodeBlock>
  {`let settings = {
  dials: [{
    name: 'primary-dial',
    hands: {
      hour: 'element-id',
      minute: 'element-id',
      second: 'element-id'
    }
  }],
  offset: '-4',
  format: 24
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Sweeping Seconds' anchor='dials-sweepingseconds'>
              <DocSpecs property='sweep' type='Boolean' def='False' />
              <p>By default, the second hand of each dial will tick or jump from one position to the next. However, by setting the <span className='is-code-ref'>sweep</span> property to true TickTock will apply a CSS transition to the second hand to have it smoothly rotate around the dial.</p>
              <p>The <span className='is-code-ref'>sweep</span> property only affects the second hand of the dial. To have a sweeping motion for the minute and hour hands as well, a CSS transition will need to be added manually.</p>
              <CodeBlock>
  {`let settings = {
  dials: [{
    name: 'primary-dial',
    hands: {
      hour: 'element-id',
      minute: 'element-id',
      second: 'element-id'
    }
  }],
  offset: '-4',
  format: 24,
  sweep: true
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Multiple Dials' anchor='dials-multipledials'>
              <p>Because the <span className='is-code-ref'>dials</span> property is an array of dial objects, a single watch can display multiple dials at once. For example, Dual Time watches which show both local and home times together. TickTock supports passing in multiple dial objects each with their own settings to support such complications.</p>
              <CodeBlock>
  {`let settings = {
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
      offset: '+6',
      sweep: true
    }]
};`}
              </CodeBlock>
            </DocSection>
          </section>

          <section ref={section => this.crownSection = section}>
            <DocSection groupHeader='Manual Time (Crown)' subHeader='Overview' anchor='crown-overview'>
              <DocSpecs property='crown' type='Object' />
              <p>The manual time complication allows a user to click the crown of the watch to temporarily pause its running. In this state, referred to as the set state, they{String.fromCharCode(39)}.re able to use the arrow keys to manually adjust the time. Upon clicking the crown again, TickTock will resume telling the time from the manually set position. To account for visual cues, on click, the crown will toggle an {String.fromCharCode(39)}.active{String.fromCharCode(39)}. class.</p>
              <p>Additionally, if a secondary dial is being used, while in the set state, the right arrow key will allow a user to target the secondary dial to set its time independently.</p>
              <CodeBlock>
  {`let settings = {
  ...
  crown: {
    id: 'the-crown'
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Define the Crown' anchor='crown-definethecrown'>
              <DocSpecs property='id' type='String' required='True' />
              <p>The <span className='is-code-ref'>crown</span> object accepts an <span className='is-code-ref'>id</span> property. This property expects a string value of the crown element{String.fromCharCode(39)}s ID. TickTock will automatically update the CSS cursor property of the crown element to pointer to visually indicate the functionality on hover.</p>
              <CodeBlock>
  {`let settings = {
  ...
  crown: {
    id: 'the-crown'
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Crown Active States' anchor='crown-activestates'>
              <p>To allow for visual cues between states, the crown will toggle an <span className='is-code-ref'>{String.fromCharCode(39)}active{String.fromCharCode(39)}</span> class whenever clicked.</p>
              <p>For example, this can allow a CSS transition to slide the crown out into a set position upon the first click and then transtion it back into its original position when clicked again.</p>
              <p>Note that the enter key will execute the same functionality as clicking the crown based on the default keybindings of the Watch class.</p>
            </DocSection>

            <DocSection subHeader='Watch Keybindings' anchor='crown-keybindings'>
              <p>When the crown is clicked, a series of keydown event listeners are enabled to allow setting the time on dials, increasing power reserves, and alternating between dials. Additionally, the enter key is bound to replicate the behavior of clicking the crown.</p>
              <p className='is-underlined'>Default Keybindings:</p>
              <p>The <span className='is-code-ref'>enter</span> key will toggle the crown between default and set states.</p>
              <p>The <span className='is-code-ref'>left</span> arrow key will wind the power reserve.</p>
              <p className='is-underlined'>In Set State:</p>
              <p>The <span className='is-code-ref'>up</span> and <span className='is-code-ref'>down</span> arrow keys will adjust the time of the active dial.</p>
              <p>The <span className='is-code-ref'>right</span> arrow key will alternate the active dial based on the order of the dials array.</p>
            </DocSection>
          </section>

          <section ref={section => this.repeaterSection = section}>
            <DocSection groupHeader='Minute Repeater' subHeader='Overview' anchor='minute-repeater-overview'>
              <DocSpecs property='repeater' type='Object' />
              <p>A repeater is a complication that audibly chimes the hours and often minutes at the press of a button. There are many types of repeater but the minute repeater chimes the time down to the minute, using separate tones for hours, quarter hours, and minutes.</p>
              <p>The repeater button or trigger can be any element type as long as it contains an ID. Clicking the trigger will toggle playing the chimes. Upon playing the chimes, the time is stored so in the event a new minute passes after the initial button was clicked but before the chimes have completed, the latest minute will not be played.</p>
              <CodeBlock>
  {`let settings = {
  ...
  repeater: {
    id: 'repeater-btn',
    chimes: {
      hour: './dist/sounds/chime-01.mp4',
      quarter: './dist/sounds/chime-02.mp4',
      minute: './dist/sounds/chime-03.mp4'
    },
    dial: 1
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Define the Trigger' anchor='minute-repeater-definethetrigger'>
              <DocSpecs property='id' type='String' required='True' />
              <p>The <span className='is-code-ref'>repeater</span> object accepts an <span className='is-code-ref'>id</span> property. This property expects the ID of the repeater trigger element as a string.</p>
              <p>Clicking the trigger will toggle playing and stopping the chimes. Additionally, upon playing the chimes, the time is stored so in the event a new minute passes after the initial button was clicked but before the chimes have completed, the latest minute will not be played.</p>
              <CodeBlock>
  {`let settings = {
  ...
  repeater: {
    id: 'repeater-btn'
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Define the Chimes' anchor='minute-repeater-definethechimes'>
              <DocSpecs property='chimes' type='Object' required='True' />
              <p>There are chimes included with TickTock, three separate sounds to represent minutes, quarter hours, and hours. These sounds were found on the <a href='https://freesound.org/' target='new' className='invert'>Free Sound Project</a>.</p>
              <p>However, custom chimes can be used by defining the path to each audio file inside of the <span className='is-code-ref'>chimes</span> object.</p>
              <CodeBlock>
  {`let settings = {
  ...
  repeater: {
    id: 'repeater-btn',
    chimes: {
      hour: './dist/sounds/chime-01.mp4',
      quarter: './dist/sounds/chime-02.mp4',
      minute: './dist/sounds/chime-03.mp4'
    }
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Target a Specific Dial' anchor='minute-repeater-targetaspecificdial'>
              <DocSpecs property='dial' type='Number' def='0' />
              <p>The minute repeater by default will chime the time of the first dial in the <span className='is-code-ref'>dials</span> array. However, the repeater can read the time of secondary dials as well by passing the dial{String.fromCharCode(39)}s array index into the <span className='is-code-ref'>dial</span> property.</p>
              <CodeBlock>
  {`let settings = {
  ...
  repeater: {
    id: 'repeater-btn',
    chimes: {
      hour: './dist/sounds/chime-01.mp4',
      quarter: './dist/sounds/chime-02.mp4',
      minute: './dist/sounds/chime-03.mp4'
    },
    dial: 1
  }
};`}
              </CodeBlock>
            </DocSection>
          </section>

          <section ref={section => this.moonphaseSection = section}>
            <DocSection groupHeader='Moonphase' subHeader='Overview' anchor='moonphase-overview'>
              <DocSpecs property='moonphase' type='Object' />
              <p>A moon-phase indication is a rotating disc, shown in a dial section, that indicates the position of the moon - usually the way it presents itself at the observation of the Northern Hemisphere.</p>
              <p>TickTock will rotate the moonphase disc from new moon to waxing crescent, first quarter, waxing gibbous, full moon, waning gibbous, three quarter, and waning crescent. It will also default to rotating the disc clockwise beginning from the full moon position.</p>
              <CodeBlock>
  {`let settings = {
  ...
  moonphase: {
    id: 'moonphase-disc',
    invert: true
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Define the Element' anchor='moonphase-definetheelement'>
              <DocSpecs property='id' type='String' required='True' />
              <p>The <span className='is-code-ref'>moonphase</span> object accepts an <span className='is-code-ref'>id</span> property. This property expects the ID of the moonphase disc as a string.</p>
              <CodeBlock>
  {`let settings = {
  ...
  moonphase: {
    id: 'moonphase-disc'
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Invert the Direction' anchor='moonphase-invertdirection'>
              <DocSpecs property='id' type='String' required='True' />
              <p>TickTock will rotate the moonphase disc from new moon to waxing crescent, first quarter, waxing gibbous, full moon, waning gibbous, three quarter, and waning crescent. It will also default to rotating the disc clockwise beginning from the full moon position which can be reversed with the <span className='is-code-ref'>invert</span> property.</p>
              <CodeBlock>
  {`let settings = {
  ...
  moonphase: {
    id: 'moonphase-disc',
    invert: true
  }
};`}
              </CodeBlock>
            </DocSection>
          </section>

          <section ref={section => this.reserveSection = section}>
            <DocSection groupHeader='Power Reserve' subHeader='Overview' anchor='power-reserve-overview'>
              <DocSpecs property='reserve' type='Object' />
              <p>A power reserve indicator is a complication of the watch which is designed to show the amount of remaining stored energy. The power reserve indicator indicates the tension on the mainspring at any particular moment. If the indicator is fully drained, the watch will stop running until it{String.fromCharCode(39)}s wound again.</p>
              <p>Many reserve indicators are half circles or partial curves. So TickTock accepts a range of rotation values, its empty and full positions, to determine the movement of the hand. The hand will be placed in the full position by default and will drain 0.5deg per second. As the reserve reaches its empty range value, all complications cease to work until the watch is wound again by using the left arrow key.</p>
              <p>Note that the range values are relative to the hand{String.fromCharCode(39)}s starting position.</p>
              <CodeBlock>
  {`let settings = {
  ...
  reserve: {
    id: 'power-reserve-hand',
    range: [-90, 90]
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Define the Element' anchor='power-reserve-definetheelement'>
              <DocSpecs property='id' type='String' required='True' />
              <p>The <span className='is-code-ref'>reserve</span> object accepts an <span className='is-code-ref'>id</span> property. This property expects the ID of the power reserve element as a string.</p>
              <CodeBlock>
  {`let settings = {
  ...
  reserve: {
    id: 'power-reserve-hand'
  }
};`}
              </CodeBlock>
            </DocSection>

            <DocSection subHeader='Setting the Range of Motion' anchor='power-reserve-rangeofmotion'>
              <DocSpecs property='range' type='Array' required='True' />
              <p>Many power reserve indicators are half or partial circles. Because of this, TickTock supports a range of motion for the reserve indicator. The <span className='is-code-ref'>range</span> array should contain the min and max values of the indicator{String.fromCharCode(39)}s range of motion.</p>
              <p>The range of the indicator is relative to its original position. For example, if the reserve is shown as a half circle with the indicator drawn horizontally at 0 degrees, the full range of motion would be -90 degrees to 90 degrees.</p>
              <p>TickTock expects that the first value in the <span className='is-code-ref'>range</span> array is the minimum value. Upon reaching this value the watch will cease operating until wound again. TickTock then expects the second value in the <span className='is-code-ref'>range</span> array to be the maximum rotation value. Winding the reserve will not exceed this value.</p>
              <p>Upon initialization, the reserve indicator will be set to its max position and will drain 0.5 degrees every second.</p>
              <CodeBlock>
  {`let settings = {
  ...
  reserve: {
    id: 'power-reserve-hand',
    range: [-90, 90]
  }
};`}
              </CodeBlock>
            </DocSection>
          </section>

          <section ref={section => this.watchSection = section}>
            <DocSection groupHeader='Watch Class' subHeader='Overview' anchor='watch-overview'>
              <p>The <span className='is-code-ref'>Watch</span> class serves as the parent container for all the child components. As settings are passed into the instance of the <span className='is-code-ref'>Watch</span>, that instance is passed to each child component. This reference gives access to properties and methods that only exist on the <span className='is-code-ref'>Watch</span> class.</p>
              <p>Notably, the <span className='is-code-ref'>Watch</span> class handles the initial key bindings and governs the overarching interval. The interval runs every second and updates the time and any other child component. If a watch contains a power reserve, the interval on the <span className='is-code-ref'>Watch</span> instance will be cleared, stopping all watch functionality.</p>
            </DocSection>

            <DocSection subHeader='Default Keybindings' anchor='watch-keybindings'>
              <p>When the crown is clicked, a series of keydown event listeners are enabled to allow setting the time on dials, increasing power reserves, and alternating between dials. Additionally, the enter key is bound to replicate the behavior of clicking the crown.</p>
              <p className='is-underlined'>Default Keybindings:</p>
              <p>The <span className='is-code-ref'>enter</span> key will toggle the crown between default and set states.</p>
              <p>The <span className='is-code-ref'>left</span> arrow key will wind the power reserve.</p>
              <p className='is-underlined'>In Set State:</p>
              <p>The <span className='is-code-ref'>up</span> and <span className='is-code-ref'>down</span> arrow keys will adjust the time of the active dial.</p>
              <p>The <span className='is-code-ref'>right</span> arrow key will alternate the active dial based on the order of the dials array.</p>
            </DocSection>

            <DocSection subHeader='Default Intervals' anchor='watch-intervals'>
              <p>Every instance of the <span className='is-code-ref'>Watch</span> class creates an interval to run every second. This interval will update the time and perform any checks and updates associated with other components.</p>
              <p>For example, a watch with a day/night indicator will update the indicators position as the time reaches 12:00 AM because this check is part of the primary interval.</p>
              <p>Watches that have a power reserve component will clear their interval when the reserve empties, or reaches its minimum range of motion, which will stop all watch functionality tied to the interview. This would leave the crown functionality as the only component that would still work with an empty reserve.</p>
              <p>The interval can be stopped manually by calling <span className='is-code-ref'>[instance].stopInterval()</span> and resumed by calling <span className='is-code-ref'>[instance].startInterval()</span>.</p>
            </DocSection>
          </section>
        </section>
      </div>
    );
  }
}

export default Docs;
