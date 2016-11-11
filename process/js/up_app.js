var React = require('react');
var ReactDOM = require('react-dom');
var AboutYou = require('./about_you');
const ABOUT_DATA = './js/about_you_questions.json';

var UpDecisionAid = React.createClass({
  getInitialState: function () {
    return {
      data: [],
    }
  },

  componentDidMount: function () {
    this.serverRequest = $.get(ABOUT_DATA, function (data) {
      this.setState({
        data: data,
      })
    }.bind(this));
  },//componentDidMount

  componentWillUnmount: function () {
    this.serverReqest.abort();
  },//componentWillUnmount


  render: function () {
    return (
      <AboutYou 
        questionData={ this.state.data } 
      />
    );
  } //render
}); // UpDecisionAid


ReactDOM.render(
  <UpDecisionAid />,
  document.getElementById('up-app')
); // render
