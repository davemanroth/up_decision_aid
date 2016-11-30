var React = require('react');
var Chart = require('./chart');
var StepsMixin = require('./steps_mixin');

var AssessmentResults = React.createClass({
  mixins: [StepsMixin(false)],
  getInitialState: function () {
    return {
      score: 0,
      results: {}
    };
  },

  getScore: function () {
    var responses = this.props.responses;
    var score = 0;

    if (responses.numPartners >= 10) {
      score += 2;
    }
    
    if (responses.withoutCondoms > 0 && responses.numPartners >= 5) {
      score += 3;
    }

    if (responses.hivPartners > 0) {
      score += 3;
    }

    if ( responses.stds.includes("yes") ) {
      score += 2;
    }

    return score;
  },

  getResults: function (score) {
    var results = {
      prep: {
        circles: 0,
        numMen: 0
      },
      noPrep: {
        circles: 0,
        numMen: 0
      }
    };

    if (score >= 0 && score < 3) {
      results.noPrep.circles = 1;
      results.prep.circles = 0.5;
      results.noPrep.numMen = 1;
      results.prep.numMen = "0-1";
    }

    else if (score >= 2 && score < 5) {
      results.noPrep.circles = 2;
      results.prep.circles = 1.5;
      results.noPrep.numMen = 2;
      results.prep.numMen = "1-2";
    }

    else if (score === 5) {
      results.noPrep.circles = 4;
      results.prep.circles = 3.5;
      results.noPrep.numMen = 4;
      results.prep.numMen = "3-4";
    }

    else if (score >= 6 && score < 8) {
      results.noPrep.circles = 7;
      results.prep.circles = 6;
      results.noPrep.numMen = 7;
      results.prep.numMen = 6;
    }

    else if (score === 8) {
      results.noPrep.circles = 11;
      results.prep.circles = 10;
      results.noPrep.numMen = 11;
      results.prep.numMen = 10;
    }
      
    else if (score === 10) {
      results.noPrep.circles = 15;
      results.prep.circles = 13.5;
      results.noPrep.numMen = 15;
      results.prep.numMen = "13-14";
    }
    
    else {
      return null;
    }
      
    return results;
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
    return (
      <div className="step2">
        <h1>Step 2: Chances of getting HIV, with and without PrEP</h1>
        <div className="row">
          <div className="col-md-6">
            <p>If 100 men who answered like you <strong>are not taking PrEP</strong></p>
            <Chart circles= { this.state.results.noPrep.circles } />
          </div>
          <div className="col-md-6">
            <p>If 100 men who answered like you <strong>are taking PrEP</strong></p>
            <Chart circles= { this.state.results.prep.circles } />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AssessmentResults;
