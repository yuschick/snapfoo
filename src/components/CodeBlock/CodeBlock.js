import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Code from 'react-code-prettify';
import './CodeBlock.css';

class CodeBlock extends Component {
  render() {
    return (
      <Code codeString={this.props.children} language={this.props.lang || 'javascript'} />
    );
  }
}

CodeBlock.propTypes = {
  lang: PropTypes.string,
  children: PropTypes.string,
}

export default CodeBlock;
