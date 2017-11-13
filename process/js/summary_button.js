var React = require('react');

var SummaryButton = React.createClass({

  render: function () {
    return (
      <button 
        id= { this.props.name }
        role="button" 
        className="btn btn-prep btn-prep-summary">
        { this.props.text }
      </button>
    );
  }
});

module.exports = SummaryButton;
