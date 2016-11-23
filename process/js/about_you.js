var React = require('react');
var StepsMixin = require('./steps_mixin');
const ABOUT_DATA = './js/about_you_questions.json';

var AboutYou = React.createClass({
  mixins: [StepsMixin(ABOUT_DATA)],

  getInitialState: function () {
    return {
      questionData: [],
      stds: []
    };
  },

  getRadioChoices: function(choices) {
    var rendered = [];
    choices.map( function(choice, idx) {
      rendered.push(
        <div key= { idx }>
          <label className="radio-inline">
            <span>{ choice }</span>
          </label>
          <label className="radio-inline">
            <input onChange= { this.handleRadios } type="radio" name={ idx } value="yes" /> Yes
          </label>
          <label className="radio-inline">
            <input onChange= { this.handleRadios } type="radio" name={ idx } value="no" /> No
          </label>
        </div>
      );
    }.bind(this));
    return rendered;
  },

  getInputType: function (entry) {
    if( entry.type === "radio") {
      var radios = this.getRadioChoices(entry.choices);
      return (
        <div className="radios">
          { radios }
        </div>
      );
    }
    return (
      <input type={ entry.type } ref={ entry.ref } className="form-control text-input" />
    );
  },

  handleRadios: function (e) {
    var stds = this.state.stds;
    var idx = e.target.name;
    var choice = e.target.value;
    stds[idx] = choice;
    this.setState({
      stds: stds
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
                <p dangerouslySetInnerHTML={ { __html: entry.question } } />
                { this.getInputType(entry) }
              </div>
            );
          }.bind(this))}
        </form>
      </div>
    )
  }

});

module.exports = AboutYou;
