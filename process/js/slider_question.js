var React = require('react');
var Slider = require('rc-slider');

var SliderQuestion = React.createClass({
  
  getInitialState: function () {
    return {
      value: 5
    }
  },

  componentDidMount: function () {
    if (this.props.storedValue) {
      this.setState({
        value: this.props.storedValue
      });
    }
  },

  handleChange: function (value) {
    this.setState({
      value: value
    });
    if (this.props.setValue) {
      this.props.setValue(value, this.props.iteration);
    }
  },

  render: function () {
    return (
      <div className="slider-question">
        <p> { this.props.question } </p>
        <div className="values clearfix">
          <span className="pull-left">
            { this.props.leftLimit }
          </span>
          <span className="pull-right">
            { this.props.rightLimit }
          </span>
        </div>
        <Slider
          max= {10}
          dots= { true }
          value= { this.state.value }
          onChange= { this.handleChange }
          disabled= { this.props.disabled }
        />
      </div>
    );
  }
});

module.exports = SliderQuestion;
