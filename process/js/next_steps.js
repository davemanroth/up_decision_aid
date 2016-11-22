var React = require('react');
var StepsMixin = require('./steps_mixin');
const NEXT_STEPS_DATA = './js/next_steps_question.json';

var NextSteps = React.createClass({
  mixins: [StepsMixin(NEXT_STEPS_DATA)],

  getInitialState: function () {
    return {
      questionData: {},
      response: null
    };
  },

  handleClickAction: function (e) {
    var idx = this.refs.nextStep.value;
    console.log(idx);
    var response = this.state.questionData.choices[idx];
    this.props.submitData(response);
  },

  storeData: function (data) {
    if (!data) {
      return;
    }
    this.setState({
      questionData: data
    });
  },

  render: function () {
    var choices = this.state.questionData.choices;
    if(!choices) { return null; }
    return (
      <div className="step4">
        <h1>Step 4: Your next steps</h1>
        <div className="questions">
          <p>{ this.state.questionData.question }</p>
          <div className="radios">
            { choices.map( function (choice, idx) {
                return (
                  <div key={ idx } className="radio">
                    <label>
                      <input type="radio" ref="nextStep"  name="nextStep" value={ idx } /> { choice }
                    </label>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NextSteps;



