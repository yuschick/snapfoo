import React, {Component} from 'react';
import AsideNav from './components/AsideNav/AsideNav';
import Guide from './components/Guide/Guide';

class Guides extends Component {
  constructor() {
    super();

    this.updateActiveMenu = this.updateActiveMenu.bind(this);
    this.checkScrollPosition = this.checkScrollPosition.bind(this);
    this.toggleDocTreeGroups = this.toggleDocTreeGroups.bind(this);
    this.triggerScrollEvent = this.triggerScrollEvent.bind(this);

    this.state = {
      fixed: false,
      activeGuide: 1,
      menu: [
        {
          header: 'Building Your First Watch',
          active: true,
          id: 1,
        },
      ],
    }
  }

  componentWillMount() {
    window.addEventListener('scroll', this.triggerScrollEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.triggerScrollEvent);
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
    if (pos >= 57) {
      this.setState({fixed: true});
    } else {
      this.setState({fixed: false});
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
    let activeGuide = 0;

    menu.forEach(item => {
      item.active = false;
      if (item.header === header) {
        item.active = true;
        activeGuide = item.id;
      }
    });

    this.setState({menu, activeGuide});
  }

  render() {
    return (
      <div className='container flex-container'>
        <AsideNav menu={this.state.menu} guide={true} update={this.updateActiveMenu} fixed={this.state.fixed} />
        <section className={`flex-four docs-container ${this.state.fixed ? 'fixed-nav' : ''}`}>
          <Guide id={this.state.activeGuide} />
        </section>
      </div>
    );
  }
}

export default Guides;
