var React = require('react');
var AboutYou = require('./about_you');
var AssessmentResults = require('./assessment_results');
var YourValues = require('./your_values');
var NextSteps = require('./next_steps');

var Steps = React.createClass({
  getInitialState: function () {
    return {
      steps: []
    }
  },

  updateStep: function (step) {
    this.props.updateStep(step);
  },

  submitData: function (data) {
    var steps = this.state.steps
    var currStep = this.props.currentStep;
    steps[currStep] = data
    this.setState({
      steps: steps,
    });
    this.updateStep(1);
  },

  render: function () {
    switch (this.props.currentStep) {
      case 0:
        return (
          <AboutYou 
            currentStep={ this.props.currentStep }
            submitData={ this.submitData }
          />
        );
      case 1:
        return (
          <AssessmentResults 
            responses={ this.state.steps[0] }
            submitData={ this.submitData }
          />
        );
      case 2:
        return (
          <YourValues 
            submitData={ this.submitData }
          />
        );
      case 3:
        return (
          <NextSteps 
            submitData={ this.submitData }
          />
        );
      default:
        return null;
    }
  }
});

module.exports = Steps
