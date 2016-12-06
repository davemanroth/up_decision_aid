var React = require('react');
var SliderQuestion = require('./slider_question');
var StepsMixin = require('./steps_mixin');
const VALUES_DATA = './js/values_questions.json';

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
        <h1>{ this.props.title }</h1>
        <p>Your answers to the following questions may help you see if taking PrEP fits with what matters most to you. 
        Whatever your answers may show, talking to your healthcare provider about them may help you to decide. 
        For each question, click on the blue circle and slide it to the place on the line (from 0 to 10) that fits your answer. </p>
        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <div className="questions">
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
          </div>
        </div>
      </div>
    );
  }
});

module.exports = YourValues;

