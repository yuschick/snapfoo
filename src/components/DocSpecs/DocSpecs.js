import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './DocSpecs.css';

class DocSpecs extends Component {
  render() {
    return (
      <div className='flex-container doc-specs'>
        <div>
          <span className='is-strong'>Property:</span> {this.props.property}
        </div>
        <div>
          <span className='is-strong'>Type:</span> {this.props.type || 'Object'}
        </div>
        <div>
          <span className='is-strong'>Required:</span> {this.props.required || 'False'}
        </div>
        {!this.props.required ?
          <div>
            <span className='is-strong'>Default:</span> {this.props.def || 'null'}
          </div>
        : false}
      </div>
    );
  }
}

DocSpecs.propTypes = {
  property: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.string,
  def: PropTypes.string,
};

export default DocSpecs;
