var React = require('react');
var ReactDOM = require('react-dom');
var AboutYou = require('./about_you');
var AssessmentResults = require('./assessment_results');
const ABOUT_DATA = './js/about_you_questions.json';

var UpDecisionAid = React.createClass({
  getInitialState: function () {
    return {
      currentStep: 0,
      data: [],
      steps: [],
      notes: null    
    };
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
  },//componentWillUnmount

  submitData: function (data) {
    var steps = this.state.steps
    var currStep = this.state.currentStep;
    steps[currStep] = data
    this.setState({
      user: {
        steps: steps
      }
    });
  },


  render: function () {
    switch (this.state.currentStep) {
      case 0:
        return (
          <AboutYou 
            questionData={ this.state.data } 
            submitData={ this.submitData }
          />
        );
      case 1:
        return (
          <AssessmentResults />
        );
      default:
        return null;
    }
  } //render
}); // UpDecisionAid


ReactDOM.render(
  <UpDecisionAid />,
  document.getElementById('up-app')
); // render
