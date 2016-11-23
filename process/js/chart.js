var React = require('react');
const COLS = 10;

var Chart = React.createClass({

  renderCircles: function () {
    var chart = [];
    for (var i = 0; i < COLS; i++) {
      var col = [];
      for (var j = 0; j < COLS; j++) {
        col.push(React.createElement('span', { key: 'row' + i + 'col' + j, className: "chart-circle" }, null));
      }
      row = React.createElement('div', { key: 'row' + i,  className: "chart-row" }, col);
      chart.push(row);
    }
    return chart;
  },

  render: function () {
    var chart = this.renderCircles();
    return (
      <div className="prep-chart">
        { chart }
      </div>
    );
  }
});

module.exports = Chart;
