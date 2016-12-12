var React = require('react');
var Arrow = require('./arrow');
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
    var question = entry.question.split("?").shift();
    if (entry.choices) {
      return (
        <div key= { idx }>
          <p dangerouslySetInnerHTML= { { __html: question } } />
          <ul>
            { entry.choices.map( function (choice, idy) {
              return (
                <li key= { idy }>
                  { choice }: { results.stds[idy] }
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
    question = question + "?";
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
          <Chart 
            circles= { results.noPrep.circles } 
            numMen= { results.noPrep.numMen } 
            hivNeg= { 100 - results.noPrep.numMen } 
          />
        </div>
        <div className="col-md-6">
          <p>If 100 men who answered like you <strong>are taking PrEP</strong></p>
          <Chart
            circles= { results.prep.circles } 
            numMen= { results.prep.numMen } 
            hivNeg= { results.prep.hivNeg } 
          />
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

  renderStep: function (step) {
    var questions = this.props.questionsData[step];
    var results = this.props.stepsData[step];
    switch (step) {
      // Step 1: About you
      case 0:
        return (
          <div>
            { questions.map( function (entry, idx) {
              return this.step1render(step, results, entry, idx);
            }.bind(this))}
          </div>
        );

      //Step 2: Chances of getting HIV
      case 1:
        return this.step2render(step, results);

      //Step 3: How PrEP fits with what matters to you
      case 2:
        return (
          <div className="row">
            <div className="col-md-8 col-md-push-2">
              { questions.map( function (entry, idx) {
                return this.step3render(step, results, entry, idx);
              }.bind(this))}
            </div>
          </div>
        );

      // Your next steps
      case 3:
        return this.step4render(step, results, questions[0].question);

      default:
        return null;
    }
  },
          
  render: function () {
    var titles = this.props.titles;
    return (
      <div className="report">
        <h1>Your summary</h1>
        { titles.map( function (title, idx) {
          return (
            <div key= { idx }>
              <h2>Step { idx + 1 }: { title } </h2>
              { this.renderStep(idx) }
            </div>
          );
        }.bind(this))}
        <div className="row clearfix">
          <div className="col-md-6 col-md-push-3">
            <div className="col-md-4">
              <Arrow direction="left" name="print_report" text="Print this report" />
            </div>
            <div className="col-md-4">
              <Arrow direction="left" name="download_report" text="Download this report" />
            </div>
            <div className="col-md-4">
              <Arrow direction="right" name="restart" text="Restart" />
            </div>
          </div>
        </div>
        <div className="bottomText">
          <p>None of your answers will be saved on this website or anywhere else. </p>
          <p>This information is not intended to replace the advice of a healthcare provider. We encourage you to talk to your healthcare provider about PrEP and your answers. See our tips for talking to your provider about sexual health and PrEP.</p>
        </div>
      </div>
    );
  }

});

module.exports = SummaryReport;

