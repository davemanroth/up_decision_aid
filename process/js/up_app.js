var React = require('react');
var ReactDOM = require('react-dom');
var Steps = require('./steps');
var Notes = require('./notes');
var Arrow = require('./arrow');

var UpDecisionAid = React.createClass({
  getInitialState: function () {
    return {
      initiateSubmit: false,
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

  handleArrowClick: function (target) {
    if (target.id == "next" ) {
      this.setState({
        initiateSubmit: true
      });
    }
  },
  

  render: function () {
    var backArrow = "";
    if (this.state.currentStep === 1) {
      backArrow = 
        <Arrow
          direction="left"
          text="Back"
          name="back"
          onArrowClick={ this.handleArrowClick }
        />
    }
    return (
      <div className="up-decision-aid">
        <Steps 
          initiateSubmit={ this.state.initiateSubmit }
          currentStep={ this.state.currentStep }
          updateStep= { this.updateStep }
        />
        <div className="arrows clearfix">
          { backArrow }
          <Arrow
            direction="right"
            text="Next"
            name="next"
            onArrowClick={ this.handleArrowClick }
          />
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
