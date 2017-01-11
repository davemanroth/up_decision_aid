var React = require('react');
var StepsMixin = require('./steps_mixin');
const NEXT_STEPS_DATA = 'next_steps_question.json';

var NextSteps = React.createClass({
  mixins: [StepsMixin(NEXT_STEPS_DATA)],

  getInitialState: function () {
    return {
      questionData: [],
      response: null,
      choice: null,
      otherClass: "hidden"
    };
  },

  handleClickAction: function (id) {
    var idx = this.state.choice;
    var response = '';
    if ( this.isOtherChoice(idx) ) {
      response = this.refs.otherText.value;
    }
    else {
      response = this.state.questionData[0].choices[idx];
    }
    this.props.submitData(response);
  },

  handleRadio: function (e) {
    var choice = e.target.value;
    var visibility = ( this.isOtherChoice(choice) ? "show" : "hidden" );
    this.setState({
      choice: choice,
      otherClass: visibility
    });
  },

  isOtherChoice: function (id) {
    return id === "4";
  },

  storeData: function (data) {
    if (!data) {
      return;
    }
    this.setState({
      questionData: data
    });
    this.props.storeQuestions(data);
  },

  render: function () {
    if (!this.state.questionData[0]) { return null; }
    var choices = this.state.questionData[0].choices;
    return (
      <div className="step4">
        <h1><span className="bolder">Step { this.props.currentStep + 1 }:</span><br /> { this.props.title }</h1>
        <div className="questions">
          <p className="prep-instructions">{ this.state.questionData[0].question }</p>
          <div className="radios">
            { choices.map( function (choice, idx) {
                return (
                  <div key={ idx } className="radio">
                    <label>
                      <input onChange= { this.handleRadio } type="radio" name="nextStep" value={ idx } /> { choice }
                    </label>
                  </div>
                );
            }.bind(this))}
          </div>
          <div className={ this.state.otherClass }>
            <input type="text" ref="otherText" className="form-control text-input" />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NextSteps;



