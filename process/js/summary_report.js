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

  step1render: function (step, results, entry, idx) {
    var question = entry.question.split("?").shift() + "?";
    return (
      <div key= { idx }>
        <p dangerouslySetInnerHTML= { { __html: question } } />
        <p>You answered: <strong> { results[entry.ref] } </strong></p>
      </div>
    );
  },

  step2render: function (step, results) {
    return (
      <div className="row">
        <div className="col-md-6">
          <p>If 100 men who answered like you <strong>are not taking PrEP</strong></p>
          <Chart circles= { results.noPrep.circles } />
        </div>
        <div className="col-md-6">
          <p>If 100 men who answered like you <strong>are taking PrEP</strong></p>
          <Chart circles= { results.prep.circles } />
        </div>
      </div>
    );
  },

  step3render: function (step, results, entry, idx) {
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
  },

  step4render: function (step, results, question) {
    return (
      <div>
        <p> { question } </p>
        <p>Your answer: { results }</p>
      </div>
    );
  },

  stepRenderer: function (step, results, entry, idx) {
    switch (step) {
      case 0:
        return this.step1render(step, results, entry, idx);
      case 2:
        return this.step3render(step, results, entry, idx);
      default:
        return null;
    }
  },

  renderStep: function (step) {
    var questions = this.props.questionsData[step];
    var results = this.props.stepsData[step];
    if (step === 1) {
      return this.step2render(step, results);
    }
    else if (step === 3) {
      return this.step4render(step, results, questions.question);
    }
    return (
      <div>
        { questions.map( function (entry, idx) {
          return this.stepRenderer(step, results, entry, idx);
        }.bind(this))}
      </div>
    );
  },
          
  render: function () {
    var titles = this.props.titles;
    return (
      <div className="report">
        <h1>Your assessment report</h1>
        { titles.map( function (title, idx) {
          return (
            <div key= { idx }>
              <h2> { title } </h2>
              { this.renderStep(idx) }
            </div>
          );
        }.bind(this))}
      </div>
    );
  }
  /*
          { this.step1render() }
          <h2>Step 2: Assessment results</h2>

          <h2>Step 3: How PrEP fits with what matters most to you</h2>
          { this.step3render() }
          <h2>Step 4: Your next steps</h2>
          <p>Your choice is: { this.props.stepsData[3] } </p>
        </div>
*/
});

module.exports = SummaryReport;

