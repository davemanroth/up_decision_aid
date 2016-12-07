var React = require('react');
var StepsMixin = require('./steps_mixin');
var Validator = require('./validation_mixin');
const ABOUT_DATA = './js/about_you_questions.json';

var AboutYou = React.createClass({
  mixins: [StepsMixin(ABOUT_DATA), Validator],

  getInitialState: function () {
    return {
      questionData: [],
      stds: [],
      data: {},
      errors: []
    };
  },

  componentWillMount: function () {
    if (this.props.data) {
      this.setState({
        data: this.props.data,
        stds: this.props.data.stds
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
            <input onChange= { this.handleRadios } type="radio" name={ idx } value="yes" checked={ this.state.stds[idx] === "yes" } /> Yes
          </label>
          <label className="radio-inline">
            <input onChange= { this.handleRadios } type="radio" name={ idx } value="no" checked={ this.state.stds[idx] === "no" } /> No
          </label>
        </div>
      );
    }.bind(this));
    return rendered;
  },

  handleChange: function (e) {
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
    this.props.storeQuestions(data);
  },

  handleClickAction: function (id) {
    this.resetErrors();
    var data = {
      numPartners: this.refs.numPartners.value,
      withoutCondoms: this.refs.withoutCondoms.value,
      hivPartners: this.refs.hivPartners.value,
      stds: this.state.stds
    };

    var result = this.checkForErrors(data);
    this.props.submitData(data);
  },

/*
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
*/
  renderErrors: function (idx) {
    var errors = this.state.errors;
    if (errors[idx]) {
      errors[idx].map( function (message, idy) {
        return (
          <p key={ idy } className="txt-danger"> { message } </p>
        );
      });
    }
    return null;

/*
    if (this.state.errors.length === 0) { return null }
    return (
      <p className="txt-danger">This is a test</p>
    );
  */
  },

  render: function () {
    var errors = this.state.errors;
    return (
      <div className="step1">
        <h1>{ this.props.title }</h1>
        <p>Please answer 4 questions about yourself. Some of the questions are personal, but try to answer as honestly as you can to get the best information for making your decision about PrEP. If you are unsure of the answer, give your best guess.</p>
        <form className="questions">
          <ol>
            { this.state.questionData.map( function (entry, idx) {
              if (entry.type === "radio") {
                var radios = this.getRadioChoices(entry.choices);
                return (
                  <div key={ idx } className="radios">
                    <li>
                      <p dangerouslySetInnerHTML={ { __html: entry.question } } />
                      { radios }
                    </li>
                  </div>
                );
              }
              return (
                <div key={ idx } className="form-group">
                  <li>
                    <p dangerouslySetInnerHTML={ { __html: entry.question } } />
                    { this.renderErrors(idx) }
                    <input type={ entry.type } id= { entry.ref } ref={ entry.ref } className="form-control text-input" value = { this.state.data[entry.ref] } onChange= { this.handleChange } />
                  </li>
                </div>
              );
            }.bind(this))}
          </ol>
        </form>
      </div>
    )
  }

});

module.exports = AboutYou;
