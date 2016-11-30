var React = require('react');
var AboutYou = require('./about_you');
var AssessmentResults = require('./assessment_results');
var YourValues = require('./your_values');
var NextSteps = require('./next_steps');
var SummaryReport = require('./summary_report');

var Steps = React.createClass({
  getInitialState: function () {
    return {
      questions: [],
      steps: []
    }
  },

  backStep: function () {
    this.updateStep(-1);
  },

  updateStep: function (step) {
    this.props.updateStep(step);
  },

  storeQuestions: function (toAdd) {
    var questions = this.state.questions;
    questions.push(toAdd);
    this.setState({
      questions: questions
    });
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
            data = { this.state.steps[0] }
            storeQuestions= { this.storeQuestions }
          />
        );
      case 1:
        return (
          <AssessmentResults 
            responses={ this.state.steps[0] }
            submitData={ this.submitData }
            backStep = { this.backStep }
            storeQuestions= { this.storeQuestions }
          />
        );
      case 2:
        return (
          <YourValues 
            submitData={ this.submitData }
            storeQuestions= { this.storeQuestions }
          />
        );
      case 3:
        return (
          <NextSteps 
            submitData={ this.submitData }
            storeQuestions= { this.storeQuestions }
          />
        );
      case 4:
        return (
          <SummaryReport 
            stepsData= { this.state.steps }
          />
        );
      default:
        return null;
    }
  }
});

module.exports = Steps
