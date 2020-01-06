// This simple component renders a Notes textarea element
// where a user can type in notes as he progresses through
// the decision aid. It appears on every step.

var React = require('react');
var StepsMixin = require('./steps_mixin');

var Notes = React.createClass({
  mixins: [StepsMixin(false)],

  handleClickAction: function (id) {
    if (id === "restart") {
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
