var React = require('react');
var Slider = require('rc-slider');

var SliderQuestion = React.createClass({
  
  getInitialState: function () {
    return {
      value: 0
    }
  },

  componentDidMount: function () {
    //console.log(Slider);
  },

  handleChange: function (value) {
    this.setState({
      value: value
    });
    this.props.setValue(value, this.props.iteration);
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
          value= { this.state.value }
          onChange= { this.handleChange }
        />
      </div>
    );
  }
});

module.exports = SliderQuestion;
