var React = require('react');
var Chart = require('./chart');
var SliderQuestion = require('./slider_question');
var StepsMixin = require('./steps_mixin');

var SummaryReport = React.createClass({

  getInitialState: function () {
    return {
      count: 0
    }
  },

  updateCount: function () {
    var newCount = this.state.count;
    newCount++;
    this.setState({
      count: newCount
    });
  },

  step1render: function () {
    var questions = this.props.questionsData[0];
    var results = this.props.stepsData[0];
    return (
      <div>
        { questions.map( function (entry, idx) {
            var question = entry.question.split("?").shift() + "?";
            return (
              <div key= { idx }>
                <p dangerouslySetInnerHTML= { { __html: question } } />
                <p>You answered: <strong> { results[entry.ref] } </strong></p>
              </div>
            );
        })}
      </div>
    );
  },

  step3render: function () {
    var questions = this.props.questionsData[2];
    var results = this.props.stepsData[2];
    return (
      <div>
        { questions.map( function (entry, idx) {
          return (
            <SliderQuestion
              key={ idx }
              iteration= { idx }
              question={ entry.question }
              leftLimit={ entry.left_limit}
              rightLimit={ entry.right_limit }
              storedValue= { results[idx] }
              disabled= { true }
            />
          );
        })}
      </div>
    );
  },

  render: function () {
    return (
      <div className="report">
        <h1>Your assessment report</h1>
        <h2>Step 1: About you</h2>
        { this.step1render() }
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
        { this.step3render() }
        <h2>Step 4: Your next steps</h2>
        <p>Your choice is: { this.props.stepsData[3] } </p>
      </div>
    );
  }
});

module.exports = SummaryReport;

