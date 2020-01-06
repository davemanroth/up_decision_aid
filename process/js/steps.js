/**
 * This component houses each step of the decision aid. Each step
 * has its own corresponding component: AboutYou, AssessmentResults,
 * YourValues, NextSteps, SummaryReport. A switch statement evaluates 
 * the currentStep prop (passed by up_app parent) and renders the
 * appropriate step component.
 *
 * Stored in the component state are questions to be passed to the appropriate
 * step component, user responses to step components, and a flag indicating
 * whether or not the user chose to restart the decision aid, thus clearing
 * all stored data
 */

var React = require('react');
var AboutYou = require('./about_you');
var AssessmentResults = require('./assessment_results');
var YourValues = require('./your_values');
var NextSteps = require('./next_steps');
var SummaryReport = require('./summary_report');
const TITLES = [
  "About you",
  "Chances of getting HIV, with and without PrEP",
  "How PrEP fits with what matters most to you",
  "Your next steps"
];

var Steps = React.createClass({
  getInitialState: function () {
    return {
      questions: [],
      steps: [],
      restart: false
    }
  },

  restart: function () {
    this.setState({
      restart: true
    });
    this.updateStep(-4);
    this.setState({
      questions: [],
      steps: [],
    });
  },

  resetRestart: function () {
    this.setState({
      restart: false
    });
  },

  backStep: function () {
    this.updateStep(-1);
  },

  updateStep: function (step) {
    this.props.updateStep(step);
  },

  storeQuestions: function (toAdd) {
    var questions = this.state.questions;
    var currStep = this.props.currentStep;
    if (!questions[currStep]) {
      questions.push(toAdd);
      this.setState({
        questions: questions
      });
    }
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
            restart = { this.state.restart }
            resetRestart = { this.resetRestart }
            storeQuestions= { this.storeQuestions }
          />
        );
      case 1:
        return (
          <AssessmentResults 
            title= { TITLES[currStep] }
            currentStep={ this.props.currentStep }
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
            currentStep={ this.props.currentStep }
            submitData={ this.submitData }
            storeQuestions= { this.storeQuestions }
          />
        );
      case 3:
        return (
          <NextSteps 
            title= { TITLES[currStep] }
            currentStep={ this.props.currentStep }
            submitData={ this.submitData }
            storeQuestions= { this.storeQuestions }
          />
        );
      case 4:
        return (
          <SummaryReport 
            titles= { TITLES }
            currentStep={ this.props.currentStep }
            stepsData= { this.state.steps }
            questionsData= { this.state.questions }
            restart= { this.restart }
          />
        );
      default:
        return null;
    }
  }
});

module.exports = Steps
