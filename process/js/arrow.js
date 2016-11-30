var React = require('react');

var Arrow = React.createClass({

  render: function () {
    return (
      <div className= { "arrow pull-" + this.props.direction }>
        <button 
          id= { this.props.name }
          role="button" 
          className={ this.props.direction }>
          { this.props.text }
        </button>
      </div>
    );
  }
});

module.exports = Arrow;
