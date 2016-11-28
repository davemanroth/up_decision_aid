var React = require('react');
var StepsMixin = require('./steps_mixin');
const ABOUT_DATA = './js/about_you_questions.json';

var AboutYou = React.createClass({
  mixins: [StepsMixin(ABOUT_DATA)],

  getInitialState: function () {
    return {
      questionData: [],
      stds: [],
      data: {}
    };
  },

  componentWillMount: function () {
    if (this.props.data) {
      this.setState({
        data: this.props.data
      });
    }
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

  handleChange: function (e) {
    console.log(e.target);
    var data = this.state.data;
    data[e.target.id] = e.target.value;
    this.setState({
      data: data
    });
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

  handleClickAction: function (id) {
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
            if (entry.type === "radio") {
              var radios = this.getRadioChoices(entry.choices);
              return (
                <div key={ idx } className="radios">
                  { radios }
                </div>
              );
            }
            return (
              <div key={ idx } className="form-group">
                <p dangerouslySetInnerHTML={ { __html: entry.question } } />
                <input type={ entry.type } id= { entry.ref } ref={ entry.ref } className="form-control text-input" value = { this.state.data[entry.ref] } onChange= { this.handleChange } />
                  {/*this.getInputType(entry) */}
              </div>
            );
          }.bind(this))}
        </form>
      </div>
    )
  }

});

module.exports = AboutYou;
