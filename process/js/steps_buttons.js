// Used in conjunction with the Steps component, this component
// renders a set of buttons at the bottom of the screen. The buttons' labels
// and functionality depend on which step of the decision aid the user is.

var React = require('react');
var Arrow = require('./arrow');
var SummaryButton = require('./summary_button');

var StepsButtons = React.createClass({

  renderArrows: function (step) {
    switch (step) {
      case 1:
        return (
          <div className="clearfix">
            <Arrow direction="left" text="Back" name="back" />
            <Arrow direction="right" currStep= { step + 2 } text="Continue to Step " name="next" />
          </div>
        );
      case 3:
        return <Arrow direction="right" text="Finish" name="finish" key= { 0 }/>
      default: 
        return <Arrow direction="right" currStep= { step + 2 } text="Continue to Step " name="next" />
    }
  },

  renderSummaryButtons: function () {
    return (
      <div className="summary-buttons">
        <div className="button-container">
          <SummaryButton
            name="print-summary"
            text="Print a summary of your answers and notes"
          />
        </div>
        <p className="italic">None of your answers will be saved on this website or anywhere else</p>
        <div className="button-container">
          <Arrow direction="left" text="Restart" name="restart" />
        </div>
        <p className="clearfix disclaimer">This information is not intended to replace the advice of a healthcare provider. We encourage you to talk to your healthcare provider about PrEP and your answers. See our tips for talking to your provider about sexual health and PrEP.</p>
      </div>
    );
  },

  render: function () {
    var step = this.props.currentStep;
    if (step === 4) {
      return this.renderSummaryButtons();
    }
    return this.renderArrows(step);
  }
});

module.exports = StepsButtons;

