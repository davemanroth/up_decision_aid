var React = require('react');
var ReactDOM = require('react-dom');
var Steps = require('./steps');
var Notes = require('./notes');
var Arrow = require('./arrow');

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

  renderArrows: function (currStep) {
    var backArrow = <Arrow direction="left" text="Back" name="back" key= { 0 }/>;
    var nextArrow = <Arrow direction="right" text="Next" name="next" key= { 1 }/>;
    if (currStep === 1) {
      return [backArrow, nextArrow];
    }
    else if( currStep === 4) {
      return null;
    }
    else {
      return nextArrow;
    }
  },

  render: function () {
    var backArrow = "";

    return (
      <div className="up-decision-aid">
        <Steps 
          currentStep={ this.state.currentStep }
          updateStep= { this.updateStep }
        />
        <div className="arrows clearfix">
          { this.renderArrows(this.state.currentStep) }
        </div>
        <Notes />
      </div>
    );
  } //render
}); // UpDecisionAid


ReactDOM.render(
  <UpDecisionAid />,
  document.getElementById('up-app')
); // render
