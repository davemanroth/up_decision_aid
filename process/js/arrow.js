var React = require('react');

var Arrow = React.createClass({

  handleClick: function (e) {
    this.props.onArrowClick(e.target);
    e.preventDefault();
  },

  render: function () {
    return (
      <div className= { "arrow pull-" + this.props.direction }>
        <button 
          id= { "arrow-" + this.props.direction }
          role="button" 
          className={ this.props.direction }
          onClick={ this.handleClick }>
          { this.props.text }
        </button>
      </div>
    );
  }
});

module.exports = Arrow;
