const React = require('react');
const ReactDOM = require('react-dom');

class Question extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="question-row">
        <p className="question">
          { this.props.question }

