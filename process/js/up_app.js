var React = require('react');
var ReactDOM = require('react-dom');
var Steps = require('./steps');
var Notes = require('./notes');
var StepsButtons = require('./steps_buttons');

var UpDecisionAid = React.createClass({
  getInitialState: function () {
    return {
      currentStep: 0,
      notes: null
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
