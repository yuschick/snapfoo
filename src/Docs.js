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
          header: 'Animate',
          active: false,
          items: [
            {
              label: 'Element',
              anchor: 'animate-element',
            },
            {
              label: 'FramesObj',
              anchor: 'animate-framesobj',
            },
            {
              label: 'FramesObj .frames',
              anchor: 'animate-framesobj-frames',
            },
            {
              label: 'FramesObj .frames.props',
              anchor: 'animate-framesobj-framesprops',
            },
            {
              label: 'FramesObj .frames.delay',
              anchor: 'animate-framesobj-framesdelay',
            },
            {
              label: 'FramesObj .frames.duration',
              anchor: 'animate-framesobj-framesduration',
            },
            {
              label: 'FramesObj .frames.easing',
              anchor: 'animate-framesobj-frameseasing',
            },
            {
              label: 'FramesObj .callbackAt',
              anchor: 'animate-framesobj-callbackat',
            },
            {
              label: 'FramesObj .delay',
              anchor: 'animate-framesobj-delay',
            },
            {
              label: 'FramesObj .duration',
              anchor: 'animate-framesobj-duration',
            },
            {
              label: 'FramesObj .easing',
              anchor: 'animate-framesobj-easing',
            },
            {
              label: 'FramesObj .loop',
              anchor: 'animate-framesobj-loop',
            },
            {
              label: 'FramesObj .loopCount',
              anchor: 'animate-framesobj-loopcount',
            },
            {
              label: 'FramesObj .reset',
              anchor: 'animate-framesobj-reset',
            },
            {
              label: 'FramesObj .stagger',
              anchor: 'animate-framesobj-stagger',
            },
            {
              label: 'Callback',
              anchor: 'animate-callback',
            }
          ],
        },
        {
          header: 'AnimatePath',
          active: false,
          items: [
            {
              label: 'Element',
              anchor: 'animatepath-element',
            },
            {
              label: 'Options',
              anchor: 'animatepath-options',
            },
            {
              label: 'Options .callbackAt',
              anchor: 'animatepath-options-callbackat',
            },
            {
              label: 'Options .delay',
              anchor: 'animatepath-options-delay',
            },
            {
              label: 'Options .duration',
              anchor: 'animatepath-options-duration',
            },
            {
              label: 'Options .easing',
              anchor: 'animatepath-options-easing',
            },
            {
              label: 'Options .loop',
              anchor: 'animatepath-options-loop',
            },
            {
              label: 'Options .loopCount',
              anchor: 'animatepath-options-loopcount',
            },
            {
              label: 'Options .path',
              anchor: 'animatepath-options-path',
            },
            {
              label: 'Options .reset',
              anchor: 'animatepath-options-reset',
            },
            {
              label: 'Options .rewind',
              anchor: 'animatepath-options-rewind',
            },
            {
              label: 'Options .rewindDelay',
              anchor: 'animatepath-options-rewinddelay',
            },
            {
              label: 'Options .rewindDuration',
              anchor: 'animatepath-options-rewindduration',
            },
            {
              label: 'Options .rewindEasing',
              anchor: 'animatepath-options-rewindeasing',
            },
            {
              label: 'Options .reverse',
              anchor: 'animatepath-options-reverse',
            },
            {
              label: 'Options .stagger',
              anchor: 'animatepath-options-stagger',
            },
            {
              label: 'Callback',
              anchor: 'animatepath-callback',
            }
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
    const animateSection = this.animateSection;
    const animatePathSection = this.animatePathSection;

    if (pos >= 57) {
      this.setState({fixed: true});
    } else {
      this.setState({fixed: false});
    }

    if (pos < gettingStarted.offsetTop + gettingStarted.clientHeight) {
      this.toggleDocTreeGroups('getting-started');
    } else if (pos > gettingStarted.offsetTop + gettingStarted.clientHeight && pos < animateSection.offsetTop + animateSection.clientHeight) {
      this.toggleDocTreeGroups('animate');
    } else {
      this.toggleDocTreeGroups('animatepath');
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

              <p>Getting up and running with SnapFoo via NPM and Node.js is quick. First, install the package into your project.</p>

              <CodeBlock lang='none'>{`yarn add snapfoo --dev`}</CodeBlock>
              <CodeBlock lang='none'>{`npm install snapfoo --save-dev`}</CodeBlock>

              <p>Include the package in your project.</p>

              <CodeBlock>{`const SnapFoo = require('snapfoo')`}</CodeBlock>

              <p>Call the library and pass in the SVGContainer id. The SVGContainer should be the parent element which contains all the elements that will be animated. By specifying a parent container, using a selector like <span className="is-code'ref">circle</span> will find each circle element within the specific SVGContainer.</p>

              <CodeBlock>{`const sceneOne = SnapFoo("#scene-one");`}</CodeBlock>

              <p>Lastly, create the <span className='is-code-ref'>settings</span> object and pass that into SnapFoo to animate.</p>

              <CodeBlock>
  {`const settings = {
  xxxxxxxx
};
sceneOne.animate('.ball', settings [, Callback]);`}
              </CodeBlock>
            </DocSection>
          </section>

          <section ref={section => this.animateSection = section}>
            <DocSection groupHeader='Animate' anchor='animate-overview'>
              <p>The primary animation call that receives an element or group of elements to animate based on the FramesObj object. Any element that is animated that does not have an ID is appended the class <span className='is-code-ref'>sf[#]</span> for a unique identifier.</p>
              <CodeBlock>{`SnapFoo.animate(element, framesObj, callback);`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate - Element' anchor='animate-element'>
              <DocSpecs type='String' required='True' />
              <p>Use a jQuery-like selector to target which elements should be animated. SnapFoo will iterate over any matches found inside of <span className='is-code-ref'>theSVGContainer</span>. Any element that is animated that does not have an ID is appended the class <span className='is-code-ref'>sf[#]</span> for a unique identifier.</p>
              <p className='is-strong'>Target individual elements</p>
              <CodeBlock>{`SnapFoo.animate("#the-circle", FramesObj);`}</CodeBlock>
              <p className='is-strong'>Select numerous elements</p>
              <CodeBlock>{`SnapFoo.animate(".the-circle, #the-square, .test-element", FramesObj);`}</CodeBlock>
              <p className='is-strong'>Target elements by tag</p>
              <CodeBlock>{`SnapFoo.animate("circle", FramesObj);`}</CodeBlock>
              <p className='is-strong'>Use other selector types</p>
              <CodeBlock>{`SnapFoo.animate("g > circle", FramesObj);`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate - FramesObj' anchor='animate-framesobj'>
              <DocSpecs required='True' />
              <p>The <span className='is-code-ref'>FramesObj</span> object stores the animation properties and any additional options.</p>
              <p className='is-strong'>Keys:</p>
              <ul>
               <li>FramesObj {Object}
                <ul>
                  <li>.frames {Array}
                   <ul>
                     <li>.frames.props {Object}</li>
                     <li>.frames.delay {Number}</li>
                     <li>.frames.duration {Number}</li>
                     <li>.frames.easing {Function}</li>
                     </ul>
                  </li>
                  <li>callbackAt {String}</li>
                  <li>delay {Number}</li>
                  <li>duration {Number}</li>
                  <li>easing {Function}</li>
                  <li>loop {Boolean}</li>
                  <li>loopCount {Number}</li>
                  <li>reset {Boolean}</li>
                  <li>stagger {Number}</li>
                </ul>
               </li>
              </ul>
              <p>The minimum requirements include a <span className='is-code-ref'>.frames</span> entry with the <span className='is-code-ref'>.props</span> and <span className='is-code-ref'>.duration</span> set. The other keys are set to defaults if not supplied.</p>
              <CodeBlock>
{`const FramesObj = {
  frames: [
    {
      props: { transform: "t10,40" },
      duration: 1000
    }
  ]
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate - FramesObj - frames' anchor='animate-framesobj-frames'>
              <DocSpecs property='frames' type='Array' required='True' />
              <p>The <span className='is-code-ref'>frames</span> array stores the information for each step of the animation. Add multiple entries to the array to create a sequence, with each entry being referred to as a 'frame'.</p>
              <CodeBlock>
{`const FramesObj = {
  frames: [
    { props: { transform: "t10,40" }, duration: 500 },
    { props: { transform: "t100,-40" }, delay: 250, duration: 1500 },
    { props: { transform: "s2,2", opacity: .75 }, duration: 500, easing: mina.bounce }
  ]
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate - FramesObj - frames - props' anchor='animate-framesobj-framesprops'>
              <DocSpecs property='props' required='True' />
              <p>The <span className='is-code-ref'>props</span> object supplies the function with the properties that are to be animated. These calls follow the standard syntax of SnapSVG. SnapSVG documentation for transforms can be found <a href='http://svg.dabbles.info/snaptut-transform' target='new'>here</a>.</p>
              <CodeBlock>
{`const FramesObj = {
  frames: [
    { props: { transform: "t10,40" }, duration: 500 },
    { props: { transform: "t100,-40" }, delay: 500, duration: 1500 },
    { props: { transform: "s2,2", opacity: .75 }, duration: 500, easing: mina.bounce }
  ]
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate - FramesObj - frames - delay' anchor='animate-framesobj-framesdelay'>
              <DocSpecs property='delay' type='Number' def='0' />
              <p>Set the delay of the frame in milliseconds.</p>
              <CodeBlock>
{`const FramesObj = {
  frames: [
    { props: { transform: "t10,40" }, duration: 500 },
    { props: { transform: "t100,-40" }, delay: 500, duration: 1500 },
    { props: { transform: "s2,2", opacity: .75 }, duration: 500, easing: mina.bounce }
  ]
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate - FramesObj - frames - duration' anchor='animate-framesobj-framesduration'>
              <DocSpecs property='duration' required='True' type='Number' />
              <p>Set the duration of the frame animation in milliseconds.</p>
              <CodeBlock>
{`const FramesObj = {
  frames: [
    { props: { transform: "t10,40" }, duration: 500 },
    { props: { transform: "t100,-40" }, delay: 500, duration: 1500 },
    { props: { transform: "s2,2", opacity: .75 }, duration: 500, easing: mina.bounce }
  ]
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate - FramesObj - frames - easing' anchor='animate-framesobj-frameseasing'>
              <DocSpecs property='easing' type='Function' def='FramesObj.easing || mina.linear' />
              <p>Each frame can be given a frame-specific easing function. If no easing is provided for the frame SnapFoo will default to the global easing function. The easing functions are the same as those found in SnapSVG. Examples of supported mina-type easings can be found at this <a href='http://codepen.io/mike-tempest/pen/myvbrw' target='new'>CodePen</a>.</p>
              <CodeBlock>
{`const FramesObj = {
  frames: [
    { props: { transform: "t10,40" }, duration: 500 },
    { props: { transform: "t100,-40" }, delay: 500, duration: 1500 },
    { props: { transform: "s2,2", opacity: .75 }, duration: 500, easing: mina.bounce }
  ]
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate - FramesObj - callbackAt' anchor='animate-framesobj-callbackat'>
              <DocSpecs property='callbackAt' type='String' def='end' />
              <p>When supplying a callback use the callbackAt property to specify when during the animation it should execute.</p>
              <p className='is-strong'>There are four options:</p>
              <p><span className='is-code-ref'>child</span>: Will execute anytime a child finishes its final frame regardless of loops</p>
              <p><span className='is-code-ref'>child end</span>: Will execute whenever a child completes its final loop</p>
              <p><span className='is-code-ref'>end</span>: Will execute whenever the final child completes its final loop</p>
              <p><span className='is-code-ref'>loop</span>: Will execute whenever the final child completes a loop</p>
              <CodeBlock>
{`const FramesObj = {
    frames: [ ... ],
    callbackAt: 'child end'
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate - FramesObj - delay' anchor='animate-framesobj-delay'>
              <DocSpecs property='delay' type='Number' def='0' />
              <p>Place a delay at the beginning of an animation in milliseconds.</p>
              <CodeBlock>
{`const FramesObj = {
    frames: [ ... ],
    callbackAt: 'child end',
    delay: 1000
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate - FramesObj - duration' anchor='animate-framesobj-duration'>
              <DocSpecs property='duration' type='Number' def='0' />
              <p>Enter the duration of the animation in milliseconds. If no frame-specific durations are set, the duration provided will be divided between the amount of frames and distributed evenly.</p>
              <CodeBlock>
{`const FramesObj = {
    frames: [ ... ],
    callbackAt: 'child end',
    delay: 1000,
    duration: 5000
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate - FramesObj - easing' anchor='animate-framesobj-easing'>
              <DocSpecs property='easing' type='Function' def='mina.linear' />
              <p>Define a global easing function to be used across all frames. The easing functions are the same as those found in SnapSVG. Examples of supported mina-type easings can be found at this <a href='http://codepen.io/mike-tempest/pen/myvbrw' target='new'>CodePen</a>.</p>
              <CodeBlock>
{`const FramesObj = {
    frames: [ ... ],
    callbackAt: 'child end',
    delay: 1000,
    duration: 5000,
    easing: mina.backout
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate - FramesObj - loop' anchor='animate-framesobj-loop'>
              <DocSpecs property='loop' type='Boolean' def='False' />
              <p>Set this property to true if the animation should loop. After completing the final frame, the element will reset to its original position and repeat.</p>
              <CodeBlock>
{`const FramesObj = {
    frames: [ ... ],
    callbackAt: 'child end',
    delay: 1000,
    duration: 5000,
    easing: mina.backout,
    loop: true
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate - FramesObj - loopCount' anchor='animate-framesobj-loopcount'>
              <DocSpecs property='loopCount' type='Number' def='0 (infinite)' />
              <p>Setting the loopCount property will determine how many times a loop should complete before stopping.</p>
              <CodeBlock>
{`const FramesObj = {
    frames: [ ... ],
    callbackAt: 'child end',
    delay: 1000,
    duration: 5000,
    easing: mina.backout,
    loop: true,
    loopCount: 3
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate - FramesObj - reset' anchor='animate-framesobj-reset'>
              <DocSpecs property='reset' type='Boolean' def='False' />
              <p>The reset property determines if an element should remain in its final state or be reset to its original values after completing the animation. If an element is animated from big to small it will remain small after animating if reset is false; if true, it will reset to its original size.</p>
              <CodeBlock>
{`const FramesObj = {
    frames: [ ... ],
    callbackAt: 'child end',
    delay: 1000,
    duration: 5000,
    easing: mina.backout,
    loop: true,
    loopCount: 3,
    reset: true
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate - FramesObj - stagger' anchor='animate-framesobj-stagger'>
              <DocSpecs property='stagger' type='Number' def='0' />
              <p>If animating numerous objects use the stagger property to place a delay between each object before it begins its first frames. The value should be entered in milliseconds.</p>
              <CodeBlock>
{`const FramesObj = {
    frames: [ ... ],
    callbackAt: 'child end',
    delay: 1000,
    duration: 5000,
    easing: mina.backout,
    loop: true,
    loopCount: 3,
    reset: true,
    stagger: 500
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate - Callback' anchor='animate-callback'>
              <DocSpecs type='Function' />
              <p>Provide a callback that will execute based upon the <span className='is-code-ref'>callbackAt</span> value. Each callback is scoped to the animated element itself, so using <span className='is-code-ref'>$(this)</span> will return the current element.</p>
              <CodeBlock>
{`snapfoo.animate('circle', FramesObj, function() {
    $(this).attr('fill','#000');
});`}</CodeBlock>
            </DocSection>

          </section>

          <section ref={section => this.animatePathSection = section}>
            <DocSection groupHeader='Animate Path' anchor='animatepath-overview'>
              <p>Animate an element or group of elements along a path. Any element that is animated that does not have an ID is appended the class <span className='is-code-ref'>sf[#]</span> for a unique identifier.</p>
              <CodeBlock>{`SnapFoo.animatePath(element, options, callback)`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate Path - Element' anchor='animatepath-element'>
              <DocSpecs type='String' required='True' />
              <p>Use a jQuery-like selector to target which elements should be animated. SnapFoo will iterate over any matches found inside of <span className='is-code-ref'>theSVGContainer</span>. Any element that is animated that does not have an ID is appended the class <span className='is-code-ref'>sf[#]</span> for a unique identifier.</p>
              <p className='is-strong'>Target individual elements</p>
              <CodeBlock>{`SnapFoo.animatePath("#the-circle", obj, callback);`}</CodeBlock>
              <p className='is-strong'>Select numerous elements</p>
              <CodeBlock>{`SnapFoo.animatePath(".the-circle, #the-square, .test-element", obj, callback);`}</CodeBlock>
              <p className='is-strong'>Target elements by tag</p>
              <CodeBlock>{`SnapFoo.animatePath("circle", obj, callback);`}</CodeBlock>
              <p className='is-strong'>Use other selector types</p>
              <CodeBlock>{`SnapFoo.animatePath("g > circle", obj, callback);`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate Path - Options' anchor='animatepath-options'>
              <DocSpecs type='Object' required='True' />
              <p>The <span className='is-code-ref'>options</span> object stores the animation properties and any additional options.</p>
              <ul>
               <li>options {Object}
                <ul>
                  <li>callbackAt {String}</li>
                  <li>delay {Number}</li>
                  <li>duration {Number}</li>
                  <li>easing {Function}</li>
                  <li>loop {Boolean}</li>
                  <li>loopCount {Number}</li>
                  <li>path {String}</li>
                  <li>reset {Boolean}</li>
                  <li>rewind {Boolean}</li>
                  <li>rewindDelay {Number}</li>
                  <li>rewindDuration {Number}</li>
                  <li>rewindEasing {Function}</li>
                  <li>stagger {Number}</li>
                </ul>
               </li>
              </ul>
              <p>The minimum requirements include a <span className='is-code-ref'>.path</span> and <span className='is-code-ref'>.duration</span> property set. The other keys are set to defaults if not supplied.</p>
              <CodeBlock>
{`const options = {
    duration: 2500,
    path: '#wave-path'
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate Path - Options - callbackAt' anchor='animatepath-options-callbackat'>
              <DocSpecs property='callbackAt' type='String' def='end' />
              <p>When supplying a callback use the callbackAt property to specify when during the animation it should execute.</p>
              <p className='is-strong'>There are four options:</p>
              <p><span className='is-code-ref'>child</span>: Will execute anytime a child finishes its final frame regardless of loops</p>
              <p><span className='is-code-ref'>child end</span>: Will execute whenever a child completes its final loop</p>
              <p><span className='is-code-ref'>end</span>: Will execute whenever the final child completes its final loop</p>
              <p><span className='is-code-ref'>loop</span>: Will execute whenever the final child completes a loop</p>
              <CodeBlock>
{`const options = {
    callbackAt: 'loop',
    duration: 2500,
    path: '#wave-path'
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate Path - Options - delay' anchor='animatepath-options-delay'>
              <DocSpecs property='delay' type='Number' def='0' />
              <p>Place a delay at the beginning of an animation in milliseconds.</p>
              <CodeBlock>
{`const options = {
    callbackAt: 'loop',
    delay: 500,
    duration: 2500,
    path: '#wave-path'
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate Path - Options - duration' anchor='animatepath-options-duration'>
              <DocSpecs property='duration' type='Number' required='True' />
              <p>Set the duration of the animation in milliseconds.</p>
              <CodeBlock>
{`const options = {
    callbackAt: 'loop',
    delay: 500,
    duration: 2500,
    path: '#wave-path'
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate Path - Options - easing' anchor='animatepath-options-easing'>
              <DocSpecs property='easing' type='Function' def='mina.linear' />
              <p>Define a global easing function to be used across all frames. The easing functions are the same as those found in SnapSVG. Examples of supported mina-type easings can be found at this <a href='http://codepen.io/mike-tempest/pen/myvbrw' target='new'>CodePen</a>.</p>
              <CodeBlock>
{`const options = {
    callbackAt: 'loop',
    delay: 500,
    duration: 2500,
    easing: mina.backin,
    path: '#wave-path'
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate Path - Options - loop' anchor='animatepath-options-loop'>
              <DocSpecs property='loop' type='Boolean' def='False' />
              <p>Set this property to true if the animation should loop. After completing the path, the element will reset to its original position and repeat.</p>
              <CodeBlock>
{`const options = {
    callbackAt: 'loop',
    delay: 500,
    duration: 2500,
    easing: mina.backin,
    loop: true,
    path: '#wave-path'
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate Path - Options - loopCount' anchor='animatepath-options-loopcount'>
              <DocSpecs property='loopCount' type='Number' def='0 (infinite)' />
              <p>Setting the loopCount property will determine how many times a loop should complete before stopping.</p>
              <CodeBlock>
{`const options = {
    callbackAt: 'loop',
    delay: 500,
    duration: 2500,
    easing: mina.backin,
    loop: true,
    loopCount: 3,
    path: '#wave-path'
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate Path - Options - path' anchor='animatepath-options-path'>
              <DocSpecs property='path' type='String' required='True' />
              <p>Pass a string of a class name or ID of the path over which the elements should animate.</p>
              <CodeBlock>
{`const options = {
    callbackAt: 'loop',
    delay: 500,
    duration: 2500,
    easing: mina.backin,
    loop: true,
    loopCount: 3,
    path: '#wave-path'
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate Path - Options - reset' anchor='animatepath-options-reset'>
              <DocSpecs property='reset' type='Boolean' def='False' />
              <p>The <span className='is-code-ref'>reset</span> property determines if an element should remain in its final state or be reset to its original values after completing the animation. If an element animates from left to right it will remain at its right position if obj.reset is false. If true, it will return to its original left position upon completing its animation.</p>
              <CodeBlock>
{`const options = {
    callbackAt: 'loop',
    delay: 500,
    duration: 2500,
    easing: mina.backin,
    loop: true,
    loopCount: 3,
    path: '#wave-path',
    reset: true
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate Path - Options - rewind' anchor='animatepath-options-rewind'>
              <DocSpecs property='rewind' type='Boolean' def='False' />
              <p>Once an element completes its path animation in one direction, if the <span className='is-code-ref'>rewind</span> property is true, the element will be animated backwards along the path to its original position.</p>
              <CodeBlock>
{`const options = {
    callbackAt: 'loop',
    delay: 500,
    duration: 2500,
    easing: mina.backin,
    loop: true,
    loopCount: 3,
    path: '#wave-path',
    reset: true,
    rewind: true
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate Path - Options - rewindDelay' anchor='animatepath-options-rewinddelay'>
              <DocSpecs property='rewindDelay' type='Number' def='0' />
              <p>A delay can be added in milliseconds before a rewind animation begins.</p>
              <CodeBlock>
{`const options = {
    callbackAt: 'loop',
    delay: 500,
    duration: 2500,
    easing: mina.backin,
    loop: true,
    loopCount: 3,
    path: '#wave-path',
    reset: true,
    rewind: true,
    rewindDelay: 250
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate Path - Options - rewindDuration' anchor='animatepath-options-rewindduration'>
              <DocSpecs property='rewindDuration' type='Number' def='options.duration' />
              <p>By default, the rewind animation will use the same duration value as the initial animation. However, the <span className='is-code-ref'>rewindDuration</span> property can be set to have a different behavior on the rewind.</p>
              <CodeBlock>
{`const options = {
    callbackAt: 'loop',
    delay: 500,
    duration: 2500,
    easing: mina.backin,
    loop: true,
    loopCount: 3,
    path: '#wave-path',
    reset: true,
    rewind: true,
    rewindDelay: 250,
    rewindDuration: 1000
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate Path - Options - rewindEasing' anchor='animatepath-options-rewindeasing'>
              <DocSpecs property='rewindEasing' type='Function' def='options.easing || mina.linear' />
              <p>By default, the rewind animation will use the same easing function as the initial animation. However, the <span className='is-code-ref'>rewindEasing</span> property can be set to have a different behavior on the rewind.</p>
              <CodeBlock>
{`const options = {
    callbackAt: 'loop',
    delay: 500,
    duration: 2500,
    easing: mina.backin,
    loop: true,
    loopCount: 3,
    path: '#wave-path',
    reset: true,
    rewind: true,
    rewindDelay: 250,
    rewindDuration: 1000,
    rewindEasing: mina.backout
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate Path - Options - reverse' anchor='animatepath-options-reverse'>
              <DocSpecs property='reverse' type='Boolean' def='False' />
              <p>Setting the <span className='is-code-ref'>reverse</span> property to true allows the element to begin at the end of the path and animate to the beginning.</p>
              <CodeBlock>
{`const options = {
    callbackAt: 'loop',
    delay: 500,
    duration: 2500,
    easing: mina.backin,
    loop: true,
    loopCount: 3,
    path: '#wave-path',
    reverse: true
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate Path - Options - stagger' anchor='animatepath-options-stagger'>
              <DocSpecs property='stagger' type='Number' def='0' />
              <p>If animating numerous objects use the stagger property to place a delay between each object before its animation begins. The value should be entered in milliseconds.</p>
              <CodeBlock>
{`const options = {
    callbackAt: 'loop',
    delay: 500,
    duration: 2500,
    easing: mina.backin,
    loop: true,
    loopCount: 3,
    path: '#wave-path',
    reverse: true,
    stagger: 500
};`}</CodeBlock>
            </DocSection>

            <DocSection subHeader='Animate Path - Callback' anchor='animatepath-callback'>
              <DocSpecs type='Function' />
              <p>Provide a callback that will execute based upon the <span className='is-code-ref'>callbackAt</span> value. Each callback is scoped to the animated element itself, so using <span className='is-code-ref'>$(this)</span> will return the current element.</p>
              <CodeBlock>
{`SnapFoo.animatePath('circle', obj, function() {
    $(this).attr('fill','#000');
});`}</CodeBlock>
            </DocSection>


          </section>
        </section>
      </div>
    );
  }
}

export default Docs;
