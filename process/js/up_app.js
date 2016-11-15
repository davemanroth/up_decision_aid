var React = require('react');
var ReactDOM = require('react-dom');
var Steps = require('./steps');

var UpDecisionAid = React.createClass({
  getInitialState: function () {
    return {
      currentStep: 0
    };
  },

  updateStep: function (step) {
    nextStep = this.state.currentStep + step;
    if (nextStep < 0) {
      return null;
    }
    this.setState({
      currentStep: nextStep
    });
  },

  render: function () {
    return (
      <Steps 
        currentStep={ this.state.currentStep }
        updateStep= { this.updateStep }
      />
    );
  } //render
}); // UpDecisionAid


ReactDOM.render(
  <UpDecisionAid />,
  document.getElementById('up-app')
); // render
