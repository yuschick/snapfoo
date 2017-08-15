import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BuildingYourFirstWatch from './../../Guides/BuildingYourFirstWatch';

class Guide extends Component {
  constructor() {
    super();

    this.getGuide = this.getGuide.bind(this);
  }

  getGuide() {
    switch (this.props.id) {
      case 1:
        return <BuildingYourFirstWatch />;
      default:
        return false;
    }
  }

  render() {
    const theGuideComponent = this.getGuide();

    return (
      <div>
        {theGuideComponent}
      </div>
    );
  }
}

Guide.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Guide;
