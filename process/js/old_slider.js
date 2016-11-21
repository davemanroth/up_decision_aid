var React = require('react');

var Slider = React.createClass({

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
        <div className="slider"></div>
      </div>
    );
  }
});

//module.exports = Slider;
