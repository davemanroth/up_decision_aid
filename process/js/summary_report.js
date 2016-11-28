var React = require('react');
var Chart = require('./chart');
var StepsMixin = require('./steps_mixin');

var SummaryReport = React.createClass({

  render: function () {
    return (
      <div className="report">
        <h1>Your assessment report</h1>
        <h2>Step 1: About you</h2>
        <p>Step 1 data</p>
        <h2>Step 2: Assessment results</h2>
        <div className="row">
          <div className="col-md-6">
            <p>If 100 men who answered like you <strong>are not taking PrEP</strong></p>
            <Chart circles= { this.props.stepsData[1].noPrep.circles } />
          </div>
          <div className="col-md-6">
            <p>If 100 men who answered like you <strong>are taking PrEP</strong></p>
            <Chart circles= { this.props.stepsData[1].prep.circles } />
          </div>
        </div>
        <h2>Step 3: How PrEP fits with what matters most to you</h2>
        <p>Your values:</p> 
        <h2>Step 4: Your next steps</h2>
        <p>Your choice is: { this.props.stepsData[3] } </p>
      </div>
    );
  }
});

module.exports = SummaryReport;

