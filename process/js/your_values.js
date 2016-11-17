var React = require('react');
var Slider = require('./slider');
var StepsMixin = require('./steps_mixin');
const VALUES_DATA = './js/values_questions.json';

var YourValues = React.createClass({
  mixins: [StepsMixin(VALUES_DATA)],

  getInitialState: function () {
    return {
      questionData: []
    }
  },

  handleClickAction: function (e) {
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
    return (
      <div className="step3">
        <h1>Step 3: How PrEP fits with what matters most to you</h1>
        <div className="questions">
          { this.state.questionData.map( function (entry, idx) {
            return (
              <Slider
                key={ idx }
                question={ entry.question }
                leftLimit={ entry.left_limit}
                rightLimit={ entry.right_limit }
              />
            );
          })}
        </div>
      </div>
    );
  }
});

module.exports = YourValues;

