// This is step component presents the user with a series of questions
// which pertain to certain values. It uses the SliderQuestion component,
// allowing the user to click and drag a slider to a number
// representing how strongly he feels about a value.

var React = require('react');
var SliderQuestion = require('./slider_question');
var StepsMixin = require('./steps_mixin');
var SliderScale = require('./slider_scale');
const VALUES_DATA = 'values_questions.json';

var YourValues = React.createClass({
  mixins: [StepsMixin(VALUES_DATA)],

  getInitialState: function () {
    return {
      questionData: [],
      sliderValues: []
    }
  },

  handleClickAction: function (id) {
    this.props.submitData(this.state.sliderValues);
  },

  setSliderValue: function (val, idx) {
    var sliderValues = this.state.sliderValues;
    sliderValues[idx] = val;
    this.setState({
      sliderValues: sliderValues
    });
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
    return (
      <div className="step3">
        <h1><span className="bolder">Step { this.props.currentStep + 1 }:</span><br /> { this.props.title }</h1>
        <p className="prep-instructions">Your answers to the following questions may help you see if taking PrEP fits with what matters most to you. Whatever your answers may show, talking to your healthcare provider about them may help you to decide.</p> 
        <p className="prep-instructions">For each question, click on the blue circle and slide it to the place on the line (from 0 to 10) that fits your answer. </p>
        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <div className="slider-questions-container">
              { this.state.questionData.map( function (entry, idx) {
                return (
                  <SliderQuestion
                    key={ idx }
                    iteration= { idx }
                    question={ entry.question }
                    leftLimit={ entry.left_limit}
                    rightLimit={ entry.right_limit }
                    setValue= { this.setSliderValue }
                  />
                );
              }.bind(this))}
            </div>
            <SliderScale />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = YourValues;
