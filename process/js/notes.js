var React = require('react');

var Notes = React.createClass({

  render: function () {
    return (
      <div className="notes">
        <h2>Notes</h2>
        <textarea className="form-control"></textarea>
      </div>
    );
  }

});

module.exports = Notes;
