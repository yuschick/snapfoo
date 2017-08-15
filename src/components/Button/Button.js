import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


import './Button.css';

class Button extends Component {
  render() {
    if (this.props.url !== '#') {
      return (
        <Link to={this.props.url} className={`btn ${this.props.type}`} data-type={this.props.data ? `${this.props.data}` : ''} onClick={this.props.action}>{this.props.text}</Link>
      );
    } else {
      return (
        <a href={this.props.url} className={`btn ${this.props.type}`} data-type={this.props.data ? `${this.props.data}` : false} onClick={this.props.action}>{this.props.text}</a>
      );
    }
  }
}

Button.propTypes = {
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  data: PropTypes.string,
  action: PropTypes.func,
}

export default Button;
