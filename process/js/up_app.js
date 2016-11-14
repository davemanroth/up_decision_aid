var React = require('react');
var ReactDOM = require('react-dom');
var AboutYou = require('./about_you');
const ABOUT_DATA = './js/about_you_questions.json';

var UpDecisionAid = React.createClass({
  getInitialState: function () {
    return {
      step: 1,
      data: [],
      user: 
      {
        step1: null,
        step2: null,
        step3: null,
        step4: null,
        notes: null,
      }
    };
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

  submitData: function (data) {
    this.setState({
      user: {
        step1: data
      }
    });
  },


  render: function () {
    return (
      <AboutYou 
        questionData={ this.state.data } 
        submitData={ this.submitData }
      />
    );
  } //render
}); // UpDecisionAid


ReactDOM.render(
  <UpDecisionAid />,
  document.getElementById('up-app')
); // render
