import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import './AsideNav.css';

class AsideNav extends Component {
  constructor() {
    super();

    this.state = {
      fixed: false,
    };

    this.formatHeader = this.formatHeader.bind(this);
    this.scrollToView = this.scrollToView.bind(this);
  }

  formatHeader(header) {
      return header.toLowerCase().replace('/', '-').replace(' ', '-');
  }

  scrollToView(id) {
    document.getElementById(id).scrollIntoView();
  }

  render() {
    let label;

    return (
      <section className={`aside-nav-container ${this.props.fixed ? 'is-fixed' : ''}`}>
        <nav className='aside-nav'>
          <ul className='main-menu'>
            {
              this.props.menu.map(item => {
                label = this.formatHeader(item.header);

                return (
                  <li key={label} className={`menu-group ${item.active ? 'active' : ''}`} data-group={this.formatHeader(item.header)} onClick={() => {this.props.update(item.header);}}>
                    <span className={`group-header ${this.props.guide ? 'guide' : ''}`}>{item.header}</span>

                    {item.items ?
                      <ul className='sub-menu'>
                        {
                          item.items.map(subitem => {
                            return (
                              <li key={this.formatHeader(subitem.label)} onClick={() => {
                                  this.scrollToView(subitem.anchor);
                                }
                              }>
                                <Link to={`#${subitem.anchor}`}>{subitem.label}</Link>
                              </li>
                            )
                          })
                        }
                      </ul>
                    : false}
                  </li>
                )
              })
            }
          </ul>
        </nav>
      </section>
    );
  }
}

AsideNav.propTypes = {
  menu: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired,
  fixed: PropTypes.bool,
  guide: PropTypes.bool,
}

export default AsideNav;
