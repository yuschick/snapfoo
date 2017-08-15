import React, {Component} from 'react';
import SecondaryNav from './components/SecondaryNav/SecondaryNav';

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
        <section className='panel flex-container-column center-content has-gears'>
          <div className='container'>
            <div className='header-watch-container'>

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
          </div>
        </section>
        <section className='panel container'>
          <h4>About</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vulputate tincidunt sodales. Curabitur et mauris at nisl dictum feugiat. Etiam facilisis molestie risus, non gravida dolor egestas finibus. Praesent tincidunt ante imperdiet enim dignissim convallis id vel ex. Vivamus nec sapien nec erat viverra vestibulum aliquam vel elit. Donec ut sapien faucibus diam elementum vehicula. Donec nec lectus nunc. Duis sed sem vel metus maximus sollicitudin quis non metus. Mauris porta commodo metus, eu venenatis est ultrices eu. Mauris et placerat urna. In ut mollis odio, ut viverra sem.</p>
          <p>In tempor, metus quis volutpat finibus, lectus quam mollis enim, sit amet efficitur ligula mi in orci. Vestibulum nec convallis nibh. Mauris at tellus quis tortor dapibus finibus. Nullam sed leo augue. Maecenas et mi purus. Sed cursus elementum felis. Donec dapibus, neque ut dictum luctus, ex velit aliquet arcu, vitae luctus nunc sapien eget velit. Sed pulvinar porttitor nibh in sagittis. Praesent vehicula varius ex quis consectetur. Proin consectetur euismod condimentum. Aenean venenatis suscipit dui eget fermentum. Mauris tempor porta quam. Cras sollicitudin ultricies semper.</p>
          <p>Pellentesque libero nibh, lacinia eu facilisis eget, hendrerit in velit. Morbi ut dui interdum, aliquet urna ut, consectetur diam. Maecenas ac massa eget nisi fringilla malesuada. Vestibulum sagittis eget tortor suscipit porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vestibulum est velit, at mattis eros vestibulum sed. Nulla risus tortor, porttitor et lacus sed, euismod placerat enim. Nunc scelerisque purus ac ipsum condimentum, at dictum nunc auctor. Nulla faucibus cursus dui, at fermentum nisi eleifend eu. Suspendisse posuere et ipsum in tempor.</p>
        </section>
      </div>
    );
  }
}

export default Home;
