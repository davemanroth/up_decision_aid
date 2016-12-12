var React = require('react');

var Arrow = React.createClass({

  render: function () {
    return (
      <div className= { "arrow pull-" + this.props.direction }>
        <button 
          id= { this.props.name }
          role="button" 
          className={"btn btn-prep btn-prep-" +  this.props.direction }>
          { this.props.text } { this.props.currStep } of 4
        </button>
      </div>
    );
  }
});

module.exports = Arrow;
