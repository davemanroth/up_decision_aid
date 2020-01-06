// This simple component is used within the YourValues
// component and explains how numerical values from
// the SliderQuestion component represent support
// for/against PrEP

var React = require('react');
  
var SliderScale = React.createClass({

  render: function () {
    return (
      <div className="slider-scale-container">
        <div className="row">
          <div className="col-md-6">
            <div className="slider-scale slider-scale-left">
              <p>Answers on this side support taking PrEP</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="slider-scale slider-scale-right">
              <p>Answers on this side don't support taking PrEP</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SliderScale;
