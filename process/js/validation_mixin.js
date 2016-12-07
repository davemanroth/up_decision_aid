var React = require('react');
var Validator = require('validator');

var Validate = {

  messages: {
    blank: "Oops, looks like you forgot to fill this out. Please enter a number",
    number: "Numbers only, please. No letters or symbols",
    condomless: "This number cannot exceed the number you entered for question 1",
    hiv: "This number cannot exceed the number you entered for question 2"
  },

  checkForErrors: function (data) {
    var idx = 0;
    for (var key in data) {
      if ( data.hasOwnProperty(key) ) {
        if ( Validator.isEmpty(data[key].trim()) ) {
          this.addToErrors(this.messages.blank, idx);
          idx++;
        }
      }
    }

  },

  addToErrors: function (message, idx) {
    var errors = this.state.errors;
    errors[idx].push(message);
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
