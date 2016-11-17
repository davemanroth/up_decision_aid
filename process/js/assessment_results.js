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
    
    if (responses.stds === "yes") {
      score += 2;
    }

    return score;
  },

  getResults: function (score) {
    var results = {
      prep: {
        circles: 0
      },
      noPrep: {
        circles: 0
      }
    };

    if (score >= 0 && score < 3) {
      results.noPrep.circles = 1;
      results.prep.circles = 0.5;
    }

    else if (score >= 2 && score < 5) {
      results.noPrep.circles = 2;
      results.prep.circles = 1.5;
    }

    else if (score === 5) {
      results.noPrep.circles = 4;
      results.prep.circles = 3.5;
    }

    else if (score >= 6 && score < 8) {
      results.noPrep.circles = 7;
      results.prep.circles = 6;
    }

    else if (score === 8) {
      results.noPrep.circles = 11;
      results.prep.circles = 10;
    }
      
    else if (score === 10) {
      results.noPrep.circles = 15;
      results.prep.circles = 13.5;
    }
    
    else {
      return null;
    }
      
    return results;
  },

  componentWillMount: function () {
    var score = this.getScore();
    var results = this.getResults();
    this.setState({
      score: score
    });
  },


  render: function () {
    return (
      <div className="step2">
        <h1>Step 2: Chances of getting HIV, with and without PrEP</h1>
        <div className="row">
          <div className="col-md-6">
            <p>If 100 men who answered like you <strong>are not taking PrEP</strong></p>
            <Chart circles="" />
          </div>
          <div className="col-md-6">
            <p>If 100 men who answered like you <strong>are taking PrEP</strong></p>
            <Chart circles="" />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AssessmentResults;
