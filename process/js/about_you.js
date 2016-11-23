var React = require('react');
var StepsMixin = require('./steps_mixin');
const ABOUT_DATA = './js/about_you_questions.json';

var AboutYou = React.createClass({
  mixins: [StepsMixin(ABOUT_DATA)],

  getInitialState: function () {
    return {
      questionData: [],
      stds: null
    };
  },

  getInputType: function (type, ref) {
    if( type === "radio") {
      return (
        <div className="radios">
          <div className="radio">
            <label>
              <input onChange= { this.handleRadios } type={ type } name={ ref } value="yes" /> Yes
            </label>
          </div>
          <div className="radio">
            <label>
              <input onChange= { this.handleRadios } type={ type } name={ ref } value="no" /> No
            </label>
          </div>
        </div>
      );
    }
    return (
      <input type={ type } ref={ ref } className="form-control text-input" />
    );
  },

  handleRadios: function (e) {
    var choice = e.target.value;
    this.setState({
      stds: choice
    });
  },

  storeData: function (data) {
    if (!data) {
      return;
    }
    this.setState({
      questionData: data
    });
  },

  handleClickAction: function (e) {
    var data = {
      numPartners: this.refs.numPartners.value,
      withoutCondoms: this.refs.withoutCondoms.value,
      hivPartners: this.refs.hivPartners.value,
      stds: this.state.stds
    };
    this.props.submitData(data);
  },

  isValidData: function (data) {
    values = Object.values(data);
    values = values.slice(0, values.length - 1);
    return this.isNumerical(values);
  },

  isNumerical: function (values) {
    return values.every(this.isNum);
  },

  isNum: function (val) {
    return parseInt(val, 10);
  },


  render: function () {
    return (
      <div className="step1">
        <h1>Step 1: About you</h1>
        <form className="questions">
          { this.state.questionData.map( function (entry, idx) {
            return (
              <div key={ idx } className="form-group">
                <p>{ entry.question }</p>
                { this.getInputType(entry.type, entry.ref) }
              </div>
            );
          }.bind(this))}
        </form>
      </div>
    )
  }

});

module.exports = AboutYou;
