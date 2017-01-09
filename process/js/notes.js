var React = require('react');
var StepsMixin = require('./steps_mixin');

var Notes = React.createClass({
  mixins: [StepsMixin(false)],

  handleClickAction: function (id) {
    if (id === "restart") {
      console.log("Reset was clicked");
      this.refs.notes.value = "";
    }
  },

  render: function () {
    return (
      <div className="notes">
        <h2>Notes</h2>
        <textarea ref="notes" className="form-control"></textarea>
      </div>
    );
  }

});

module.exports = Notes;
