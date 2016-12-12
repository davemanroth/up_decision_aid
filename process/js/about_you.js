var React = require('react');
var StepsMixin = require('./steps_mixin');
var Validator = require('./validation_mixin');
var ErrorMessage = require('./error_message');
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
        stds: this.props.data.stds.split(",")
      });
    }
  },


  getRadioChoices: function(choices, errors) {
    var rendered = [];
    choices.map( function(choice, idx) {
      rendered.push(
        <div key= { idx } className= { errors ? "has-error"  : "" }>
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

    if (this.hasNoErrors(data)) {
      this.props.submitData(data);
    }
  },

  render: function () {
    var errors = this.state.errors;
    return (
      <div className="step1">
        <h1><span className="bolder">Step { this.props.currentStep + 1 }:</span> { this.props.title }</h1>
        <p className="prep-instructions">Please answer 4 questions about yourself. Some of the questions are personal, but try to answer as honestly as you can to get the best information for making your decision about PrEP. If you are unsure of the answer, give your best guess.</p>
        <form className="questions">
          <ol>
            { this.state.questionData.map( function (entry, idx) {
              if (entry.type === "radio") {
                var radios = this.getRadioChoices(entry.choices, errors[idx]);
                return (
                  <div key={ idx } className="radios">
                    <li>
                      <p dangerouslySetInnerHTML={ { __html: entry.question } } />
                      <ErrorMessage 
                        errors= { errors[idx] ? errors[idx] : null } 
                      />
                      { radios }
                    </li>
                  </div>
                );
              }
              return (
                <div key={ idx } className={ errors[idx] ? "form-group has-error"  : "form-group" }>
                  <li>
                    <p dangerouslySetInnerHTML={ { __html: entry.question } } />
                    <ErrorMessage 
                      errors= { errors[idx] ? errors[idx] : null } 
                    />
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
