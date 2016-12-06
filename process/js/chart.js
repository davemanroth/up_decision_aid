var React = require('react');
const COLS = 10;

var Chart = React.createClass({

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

  manOrMen: function (number) {
    return number === 1 ? "man" : "men";
  },

  generateStats: function () {
    var numMen = this.props.numMen;
    var hivNeg = this.props.hivNeg;
    return (
      <div className="result-numbers">
        <p><span className="text-danger">{ numMen }</span> { this.manOrMen(numMen) } <br /> will become HIV-positive</p>
        <p><span className="text-success">{ hivNeg }</span> { this.manOrMen(hivNeg) } <br /> will stay HIV-negative</p>
      </div> 
    );
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
    var chart = this.renderCircles();
    var stats = this.generateStats();
    return (
      <div className="prep-chart">
        { chart }
        { stats }
      </div>
    );
  }
});

module.exports = Chart;
