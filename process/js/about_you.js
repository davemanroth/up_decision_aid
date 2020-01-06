// This is the AboutYou step component of the decision aid. It asks
// the user a series of questions about their sexual history and, 
// with the help of the StepsMixin module, passes the responses to 
// the parent Steps component. 

var React = require('react');
var StepsMixin = require('./steps_mixin');
var Validation = require('./validation_mixin');
var ErrorMessage = require('./error_message');
const ABOUT_DATA = 'about_you_questions.json';

var AboutYou = React.createClass({
  mixins: [StepsMixin(ABOUT_DATA), Validation],

  getInitialState: function () {
    return {
      questionData: [],
      stds: [],
      data: {},
      errors: []
    };
  },

  componentWillMount: function () {
    if (this.props.data && !this.props.restart) {
      this.setState({
        data: this.props.data,
        stds: this.props.data.stds
      });
    }
  },


  getRadioChoices: function(choices, errors) {
    var rendered = [];
    choices.map( function(choice, idx) {
      rendered.push(
        <tr key={ idx} className= { errors ? "has-error"  : "" }>
          <td>
            <label className="radio-inline">
              <span>{ choice }</span>
            </label>
          </td>
          <td>
            <label className="radio-inline">
              <input onChange= { this.handleRadios } type="radio" name={ idx } value="yes" checked={ this.state.stds[idx] === "yes" } /> Yes
            </label>
          </td>
          <td>
            <label className="radio-inline">
              <input onChange= { this.handleRadios } type="radio" name={ idx } value="no" checked={ this.state.stds[idx] === "no" } /> No
            </label>
          </td>
        </tr>
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
    this.props.resetRestart();
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
        <p className="prep-instructions">Please answer 4 questions about yourself. Some of the questions are personal, but try to answer as accurately as you can to get the best information for making your decision about PrEP. If you are unsure of the answer, give your best guess.</p>
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
                      <table className="table std-table">
                        <tbody>
                          { radios }
                        </tbody>
                      </table>
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
