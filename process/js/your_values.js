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

  handleClickAction: function (e) {
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
  },

  render: function () {
    var _this = this;
    return (
      <div className="step3">
        <h1>Step 3: How PrEP fits with what matters most to you</h1>
        <div className="questions">
          { this.state.questionData.map( function (entry, idx) {
            return (
              <SliderQuestion
                key={ idx }
                iteration= { idx }
                question={ entry.question }
                leftLimit={ entry.left_limit}
                rightLimit={ entry.right_limit }
                setValue= { _this.setSliderValue }
              />
            );
          })}
        </div>
      </div>
    );
  }
});

module.exports = YourValues;

