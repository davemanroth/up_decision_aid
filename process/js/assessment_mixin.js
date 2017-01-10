var AssessmentMixin = {

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
        circles: 0.5,
        numMen: "0-1",
        hivNeg: "99-100"
      },
      noPrep: {
        circles: 0,
        numMen: 0
      }
    };

    if (score === 0) {
      results.prep.circles = 0;
      results.prep.numMen = 0;
      results.prep.hivNeg = 100;
    }

    else if (score > 0 && score < 3) {
      results.noPrep.circles = 1;
      results.noPrep.numMen = 1;
    }

    else if (score >= 2 && score < 5) {
      results.noPrep.circles = 2;
      results.noPrep.numMen = 2;
    }

    else if (score === 5) {
      results.noPrep.circles = 4;
      results.noPrep.numMen = 4;
    }

    else if (score >= 6 && score < 8) {
      results.noPrep.circles = 7;
      results.noPrep.numMen = 7;
      results.prep.circles = 1;
      results.prep.numMen = 1;
      results.prep.hivNeg = 99;
    }

    else if (score === 8) {
      results.noPrep.circles = 11;
      results.noPrep.numMen = 11;
      results.prep.circles = 1;
      results.prep.numMen = 1;
      results.prep.hivNeg = 99;
    }
      
    else if (score === 10) {
      results.noPrep.circles = 15;
      results.noPrep.numMen = 15;
      results.prep.circles = 1.5;
      results.prep.numMen = "1-2";
      results.prep.hivNeg = "98-99";
    }
    
    else {
      return null;
    }
      
    return results;
  }
}

module.exports = AssessmentMixin;



