var React = require('react');

var SummaryButton = React.createClass({

  render: function () {
    return (
      <div className="col-md-6">
        <button 
          id= { this.props.name }
          role="button" 
          className="btn btn-prep btn-prep-summary">
          { this.props.text }
        </button>
      </div>
    );
  }
});

module.exports = SummaryButton;
