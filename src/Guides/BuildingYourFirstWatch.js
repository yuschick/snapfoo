import React, {Component} from 'react';
import CodeBlock from './../components/CodeBlock/CodeBlock';
import SVGWatch from './../components/SVGWatch/SVGWatch';
import HeaderImage from './../images/guides/firstwatch/header.jpg'

class BuildingYourFirstWatch extends Component {
  render() {
    return (
      <div>
        <h4 className='has-spacer'>Building Your First Watch</h4>
        <img src={HeaderImage} alt='Building your first watch with TickTock JS' />
        <p>
          In this guide, let{String.fromCharCode(39)}s use TickTock to create our first animated watch. We will be building the watch shown in the above graphic. It contains two dials, the second being set to a specific time zone and a power reserve indicator.
        </p>
        <p>
          The SVG has been created already and the optimized code can be downloaded below. This is all we need to get started.
        </p>
        <p>
          <a href='./src/images/guides/firstwatch/first-watch-optimised.svg' className='btn primary'>Download Optimized SVG Code</a>
        </p>
        <p className='is-strong'>
          index.html
        </p>
        <p>
          Let{String.fromCharCode(39)}s take the downloaded SVG code and drop that into our <span className='is-code-ref'>index.html</span> file. Once this is opened in our browser, we should see our watch in its static form. Feel free to wrap the watch in a container or apply sizing
          styles to the SVG to keep it from filling the entire screen.
        </p>
        <p>
          Next, before digging into animation and TickTock settings, let{String.fromCharCode(39)}s first install the library. Open a terminal and in your working directory install TickTock with whichever manager you prefer.
        </p>

<CodeBlock lang='none'>{`yarn add ticktock-js --dev`}</CodeBlock>
<CodeBlock lang='none'>{`npm install ticktock-js --save-dev`}</CodeBlock>

        <p>
          With TickTock installed, let{String.fromCharCode(39)}s create and dig into an <span className='is-code-ref'>app.js</span> file.
        </p>
        <p className='is-strong'>
          app.js
        </p>

<CodeBlock>
{`(function() {
  "use strict"

  const Watch = require('ticktock-js');
  const settings = { ... };

  let firstWatch = new Watch(settings);
})();`}
</CodeBlock>

        <p>
          We first import TickTock into our file and assign it to our constant <span className='is-code-ref'>Watch</span> variable. From there we can call <span className='is-code-ref'>new Watch()</span> to instantiate a new watch with whatever settings we wish.
          Let{String.fromCharCode(39)}s dig into our settings next.
        </p>
        <p>
          We know we have two dials, a primary and secondary. So let{String.fromCharCode(39)}s start there.
        </p>

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
    }
  }]
};`}
</CodeBlock>

        <p>
          Note the importance of the IDs that are defined in the SVG. Those are the ID values we use in these settings to define the individual elements for each hand and dial.
        </p>

        <p>
          If we include <span className='is-code-ref'>app.js</span> in our <span className='is-code-ref'>index.html</span> file and open it, we should have both dials ticking along with the current time.</p>
        <p>
          It is very likely, though, upon refreshing our page that the hands are not rotating the way we envision - from the center point of the dial. We will need to define the <span className='is-code-ref'>transform-origin</span> point of these elements.
        </p>
        <p className='is-strong'>
          app.css
        </p>

<CodeBlock lang='css'>
{`svg {
  height: 244px;
  width: 244px;
}

#primary-second-hand,
#primary-minute-hand,
#primary-hour-hand {
  transform-origin: 122px 122px;
}

#secondary-second-hand,
#secondary-minute-hand,
#secondary-hour-hand {
  transform-origin: 122px 196px;
}

#power-reserve-hand {
  transform-origin: 122px 70px;
}`}
</CodeBlock>

        <p>
          In the code above, we set the SVG to a specific size. This allows us to more easily define specific pixel <span className='is-code-ref'>transform-origin</span> values. It would be just as easy to use keywords such as <span className='is-code-ref'>bottom center</span>          for some elements but for better browser support, specific values are encouraged.
        </p>
        <p>
          Let{String.fromCharCode(39)}s include our new stylesheet into <span className='is-code-ref'>index.html</span> and move back to <span className='is-code-ref'>app.js</span>.
        </p>
        <p>
          Now, back in <span className='is-code-ref'>app.js</span> let{String.fromCharCode(39)}s play with a couple additional settings for our secondary dial.
        </p>
        <p className='is-strong'>
          app.js
        </p>

<CodeBlock>
{`const settings = {
  dials: [...
  {
    name: 'secondary',
    hands: {
      hour: 'secondary-hour-hand',
      minute: 'secondary-minute-hand',
      second: 'secondary-second-hand'
    },
    offset: '+4',
    sweep: true
  }]
};`}
</CodeBlock>

        <p>
          In the updated settings, we{String.fromCharCode(39)}ve added a GMT offset value of {String.fromCharCode(39)}+4{String.fromCharCode(39)} hours and set the sweep property on the secondary second hand to offer contrast from the ticking second hand on the primary dial.
        </p>
        <p>
          If all looks well so far, let{String.fromCharCode(39)}s finish this up by adding the power reserve.
        </p>

<CodeBlock>
{`const settings = {
  ...
  reserve: {
    id: 'power-reserve-hand',
    range: [-90, 90]
  }
};`}
</CodeBlock>

        <p>
          Again, we supply the ID of the hand element to the settings. Then we define the range of motion for the power reserve, which is relative to its originally drawn position. The hand here is originally drawn at zero degree in the middle of the indicator.
          In order for the hand to reach either the full or empty ends of the indicator it will need to rotate 90 degrees either way. So we set the range to <span className='is-code-ref'>[-90, 90]</span> to define the minimum and maximum values.
        </p>
        <p>
          So the updated <span className='is-code-ref'>app.js</span> will look like this:
        </p>

<CodeBlock>
{`(function() {
  "use strict"
  const Watch = require('ticktock-js');
  const settings = {
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
      }
    ],
    reserve: {
      id: 'power-reserve-hand',
      range: [-90, 90]
    }
  };
  let firstWatch = new Watch(settings);
})();`}
</CodeBlock>

        <p className='is-strong'>
          The Result
        </p>
        <div className='guide-watch-container'>
          <SVGWatch watch='guide-first-watch' />
        </div>
      </div>
    );
  }
}

export default BuildingYourFirstWatch;
