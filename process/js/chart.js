var React = require('react');
const COLS = 10;

var Chart = React.createClass({

  getClasses: function () {

  },

  classesIterator: function (circles) {
    return Number.isInteger(circles) ? circles : Math.ceil(circles);
  },

  generateExtraClass: function (count, circles) {
    var extraClass = "";
    if( !Number.isInteger(circles) && count == 1 ) {
      extraClass = " filled half-circle";
    }
    else {
      extraClass = " border filled";
    }
    return extraClass;
  },

  renderCircles: function () {
    var chart = [];
    var circles = this.props.circles;
    var count = this.classesIterator(circles);
    var extraClass = "";
    for (var i = 0; i < COLS; i++) {
      var col = [];
      for (var j = 0; j < COLS; j++) {
        if (count > 0) {
          extraClass = this.generateExtraClass(count, circles); 
          count--;
        }
        else {
          extraClass = " border";
        }
        col.push(React.createElement('span', { key: 'row' + i + 'col' + j, className: "chart-circle" + extraClass }, null));
      }
      row = React.createElement('div', { key: 'row' + i,  className: "chart-row" }, col);
      chart.push(row);
    }
    return chart;
  },

  render: function () {
    console.log(this.props.circles);
    var chart = this.renderCircles();
    return (
      <div className="prep-chart">
        { chart }
      </div>
    );
  }
});

module.exports = Chart;
