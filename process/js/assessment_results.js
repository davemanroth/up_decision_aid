var React = require('react');
var Chart = require('./chart');
var StepsMixin = require('./steps_mixin');
var AssessmentMixin = require('./assessment_mixin');

var AssessmentResults = React.createClass({
  mixins: [StepsMixin(false), AssessmentMixin],
  getInitialState: function () {
    return {
      score: 0,
      results: {}
    };
  },

  componentWillMount: function () {
    var score = this.getScore();
    var results = this.getResults(score);
    this.setState({
      score: score,
      results: results
    });
    this.props.storeQuestions("");
  },

  handleClickAction: function (id) {
    if (id === "back") {
      this.props.backStep();
    }
    else {
      this.props.submitData(this.state.results);
    }
  },

  render: function () {
    if (!this.state.results) { return null; }
    var results = this.state.results;
    return (
      <div className="step2">
        <h1><span className="bolder">Step { this.props.currentStep + 1 }:</span><br /> { this.props.title }</h1>
        <p className="lead-in-text">This is an estimate of your chances of becoming HIV-positive over one year.</p>
        <div className="results-heading">
          <h2>Without PrEP</h2>
          <p>If 100 men who answered like you <strong>are not taking PrEP</strong></p>
        </div>
        <Chart 
          circles= { results.noPrep.circles } 
          numMen= { results.noPrep.numMen } 
          hivNeg= { 100 - results.noPrep.numMen } 
        />
        <div className="results-heading">
          <h2>WithPrEP</h2>
          <p>If 100 men who answered like you <strong>are taking PrEP</strong></p>
        </div>
        <Chart
          circles= { results.prep.circles } 
          numMen= { results.prep.numMen } 
          hivNeg= { results.prep.hivNeg } 
        />
      </div>
    );
  }
});

module.exports = AssessmentResults;
