var React = require('react');

var ErrorMessage = React.createClass({

  getInitialState: function () {
    return {
      errors: null
    }
  },

  componentWillReceiveProps: function () {
    if (this.props.errors) {
      var errors = this.props.errors;
      this.setState({
        errors: errors
      });
    }
  },

  render: function () {
    var errors = this.props.errors;
    if (!errors) {
      return null;
    }
    else if (Array.isArray(errors) && errors.length > 0) {
      errors.map( function (err, idx) {
        return <p className="text-danger" key= { idx } > { err } </p>
      });
    }
   return <p className="text-danger">{ errors }</p>
  }
});

module.exports = ErrorMessage;