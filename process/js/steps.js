var React = require('react');
var AboutYou = require('./about_you');
var AssessmentResults = require('./assessment_results');
const ABOUT_DATA = './js/about_you_questions.json';

var Steps = React.createClass({
  getInitialState: function () {
    return {
      data: [],
      steps: []
    }
  },

  componentDidMount: function () {
    this.serverRequest = $.get(ABOUT_DATA, function (data) {
      this.setState({
        data: data,
      })
    }.bind(this));
  },//componentDidMount

  componentWillUnmount: function () {
    this.serverReqest.abort();
    if (this.props.initiateSubmit) {
      console.log("Submit occurred");
    }
  },//componentWillUnmount

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
            questionData={ this.state.data } 
            submitData={ this.submitData }
          />
        );
      case 1:
        return (
          <AssessmentResults 
            responses={ this.state.steps[0] }
          />
        );
      default:
        return null;
    }
  }
});

module.exports = Steps
