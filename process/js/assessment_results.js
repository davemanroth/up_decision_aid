var React = require('react');
var Chart = require('./chart');

var AssessmentResults = React.createClass({

  getInitialState: function () {
    return {
      score: 0,
      results: {}
    };
  },

  getScore: function () {
  },


  render: function () {
    return (
      <div className="step2">
        <h1>Step 2: Chances of getting HIV, with and without PrEP</h1>
        <div className="row">
          <div className="col-md-6">
            <p>If 100 men who answered like you <strong>are not taking PrEP</strong></p>
            <Chart />
          </div>
          <div className="col-md-6">
            <p>If 100 men who answered like you <strong>are taking PrEP</strong></p>
            <Chart />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AssessmentResults;
