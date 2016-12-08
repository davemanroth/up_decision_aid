var React = require('react');
var Validator = require('validator');

var Validate = {

  messages: {
    blank: "Oops, looks like you forgot to fill this out. Please enter a number",
    number: "Numbers only, please. No letters or symbols",
    condomless: "This number cannot exceed the number you entered for question 1",
    hiv: "This number cannot exceed the number you entered for question 2"
  },

  hasNoErrors: function (data) {
    this.checkForErrors(data);
    return this.state.errors.length === 0;
  },

  checkForErrors: function (data) {
    var idx = 0;
    for (var key in data) {
      if ( data.hasOwnProperty(key) ) {
        data[key] += "";
        if ( Validator.isEmpty(data[key]) ) {
          this.addToErrors(this.messages.blank, idx);
          idx++;
        }
      }
    }

  },

  addToErrors: function (message, idx) {
    var errors = this.state.errors;
    if ( Array.isArray(errors[idx]) ) {
      errors[idx].push(message);
    }
    else {
      errors[idx] = [message];
    }
    this.setState({
      errors: errors
    });
  },

  resetErrors: function () {
    this.setState({
      errors: []
    });
  }
}

module.exports = Validate;
