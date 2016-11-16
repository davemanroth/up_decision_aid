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

  handleArrowClick: function (target) {
    console.log(target);
  },
  

  render: function () {
    return (
      <div className="up-decision-aid">
        <Steps 
          currentStep={ this.state.currentStep }
          updateStep= { this.updateStep }
        />
        <div className="arrows clearfix">
          <Arrow
            direction="left"
            text="Back"
            onArrowClick={ this.handleArrowClick }
          />
          <Arrow
            direction="right"
            text="Next"
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
