var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var AptList = require('./aptlist');
var AddAppointment = require('./add_appointment');
const DATA_FILE = './js/data.json';

var MainInterface = React.createClass({
  getInitialState: function () {
    return {
      data: [],
      safeData: [],
      aptBodyVisible: false
    }
  },

  componentDidMount: function () {
    this.serverRequest = $.get(DATA_FILE, function (data) {
      this.setState({
        data: data,
        safeData: data
      })
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.serverReqest.abort();
  },

  deleteMessage: function (item) {
    var allData = this.state.data.slice();
    var afterDelete = _.without(allData, item);
    this.setState({
      data: afterDelete
    });
  },

  handleRestore: function(e) {
    this.setState({
      data: this.state.safeData
    });
  },

  render: function () {
    var filteredApts = this.state.data;

    return (
      <div className="interface">
        <AddAppointment 
          bodyVisible = { this.state.aptBodyVisible }
        />
        <div className="item-list media-list">
          <ul className="item-list media-list">
            { 
              filteredApts.map( function(item, idx) {
                return (
                  <AptList 
                    key = { idx }
                    item = { item }
                    onDelete = { this.deleteMessage }
                    whichItem = { item }
                  />
                )// return
              }.bind(this))// map
            }
          </ul>
          <div className="restore-data clearfix">
            <button className="pull-right btn btn-success btn-lg" 
                    onClick={ this.handleRestore }>Restore data</button>
          </div>
        </div>
      </div>

    )
  } //render
}); // MainInterface


ReactDOM.render(
  <MainInterface />,
  document.getElementById('petAppointments')
); // render
