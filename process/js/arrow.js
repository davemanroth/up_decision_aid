var React = require('react');

var Arrow = React.createClass({

  getButtonText: function (text) {
    if (text === 'Back' || text === 'Finish') {
      return text;
    }
    return [this.props.text, this.props.currStep, "of 4"].join(" ");
  },

  render: function () {
    var buttonText = this.getButtonText(this.props.text);
    return (
      <div className= { "arrow pull-" + this.props.direction }>
        <button 
          id= { this.props.name }
          role="button" 
          className={"btn btn-prep btn-prep-" +  this.props.direction }>
          { buttonText }
        </button>
      </div>
    );
  }
});

module.exports = Arrow;
