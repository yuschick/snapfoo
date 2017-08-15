import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './DocSection.css';

/* eslint-disable react/prop-types */
class DocSection extends Component {
  render() {
    return (
      <section id={this.props.anchor} className='doc-property-container'>
        {this.props.groupHeader ? <h4 className='has-spacer'>{this.props.groupHeader}</h4> : false}
        {this.props.subHeader ? <h5 className='is-strong'>{this.props.subHeader}</h5> : false}
        {this.props.children}
      </section>
    );
  }
}
/* eslint-enable react/prop-types */

DocSection.propTypes = {
  groupHeader: PropTypes.string,
  subHeader: PropTypes.string,
  anchor: PropTypes.string.isRequired,
};

export default DocSection;
