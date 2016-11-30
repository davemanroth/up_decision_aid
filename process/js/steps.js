var React = require('react');
var AboutYou = require('./about_you');
var AssessmentResults = require('./assessment_results');
var YourValues = require('./your_values');
var NextSteps = require('./next_steps');
var SummaryReport = require('./summary_report');
const TITLES = [
  "Step 1: About you",
  "Step 2: Chances of getting HIV, with and without PrEP",
  "Step 3: How PrEP fits with what matters most to you",
  "Step 4: Your next steps"
];

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
    var currStep = this.props.currentStep;
    switch (this.props.currentStep) {
      case 0:
        return (
          <AboutYou 
            title= { TITLES[currStep] }
            currentStep={ this.props.currentStep }
            submitData={ this.submitData }
            data = { this.state.steps[0] }
            storeQuestions= { this.storeQuestions }
          />
        );
      case 1:
        return (
          <AssessmentResults 
            title= { TITLES[currStep] }
            responses={ this.state.steps[0] }
            submitData={ this.submitData }
            backStep = { this.backStep }
            storeQuestions= { this.storeQuestions }
          />
        );
      case 2:
        return (
          <YourValues 
            title= { TITLES[currStep] }
            submitData={ this.submitData }
            storeQuestions= { this.storeQuestions }
          />
        );
      case 3:
        return (
          <NextSteps 
            title= { TITLES[currStep] }
            submitData={ this.submitData }
            storeQuestions= { this.storeQuestions }
          />
        );
      case 4:
        return (
          <SummaryReport 
            titles= { TITLES }
            stepsData= { this.state.steps }
            questionsData= { this.state.questions }
          />
        );
      default:
        return null;
    }
  }
});

module.exports = Steps
