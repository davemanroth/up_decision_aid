/**
 * Root component for UP decision aid
 *
 * Author: Dave Rothfarb
 * Project: UP Decision aid
 * Health Communication Core 2017
 *
 * This root component keeps track of the user's current step in the decision
 * aid and renders the primary components: Steps, Notes, and StepsButtons.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Steps = require('./steps');
var Notes = require('./notes');
var StepsButtons = require('./steps_buttons');

var UpDecisionAid = React.createClass({
  getInitialState: function () {
    return {
      currentStep: 0,
    };
  },

  updateStep: function (step) {
    var nextStep = this.state.currentStep + step;
    if (nextStep < 0) {
      return null;
    }
    this.setState({
      currentStep: nextStep
    });
  },

  render: function () {
    return (
      <div className="up-decision-aid">
        <div className="tool-header">
          <p><span className="bolder">A decision tool </span>
          for men and their health providers</p>
        </div>
        <Steps 
          currentStep={ this.state.currentStep }
          updateStep= { this.updateStep }
        />
        <Notes />
        <div className="clearfix">
          <StepsButtons currentStep= { this.state.currentStep } />
        </div>
      </div>
    );
  } //render
}); // UpDecisionAid


ReactDOM.render(
  <UpDecisionAid />,
  document.getElementById('up-app')
); // render
