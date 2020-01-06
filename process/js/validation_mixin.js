// This mixin module validates user entered data from the About You component.
// Along with checking for blanks and type mismatches, it also checks for
// "realistic" values, predetermined by the study PI.

var React = require('react');
var Validator = require('validator');

var Validation = {

  messages: {
    blank: "Oops! It looks like this question was left blank. To give you the best information for making your decision about PrEP, all of the questions on this page need to be answered. If you are not sure of the answer, please give your best guess.",
    number: "Oops! The answer must be a number (no decimals). Please make sure that a number has been entered.",
		stds: "Oops! Please answer yes or no to all questions",
    condomless: "Oops! This number can't be bigger than the number you entered for question 1",
    hiv: "Oops! This number can't be bigger than the number you entered for questions 1 or 2"
  },

  hasNoErrors: function (data) {
    this.checkForErrors(data);
    return this.state.errors.length === 0;
  },

	allErrorsCleared: function () {
		this.state.errors.map( function (err, idx) {
			if ( err[0] !== null ) {
				return false;
			}
		});
		return true;
	},

  isInArray: function (val, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        return true;
      }
    }
    return false;
  },

  checkIndividualFields: function (data, idx) {
    var numPartners = parseInt(data.numPartners);
    var withoutCondoms = parseInt(data.withoutCondoms);
    var hivPartners = parseInt(data.hivPartners);
    switch (idx) {
      case 1:
        if (withoutCondoms > numPartners) {
          console.log(numPartners);
          console.log(numPartners > withoutCondoms);
          this.addToErrors(this.messages.condomless, idx);
        }
        break;
      case 2:
        if (hivPartners > withoutCondoms ||
            hivPartners > numPartners ) {
          this.addToErrors(this.messages.hiv, idx);
        }
        break;
      case 3:
        // Make stds into array again
        var stds = data.stds.split(",");
        if (stds.length === 3 && !this.isInArray(null, stds) && !this.isInArray("", stds) ) {
        // reassign array to Object only if it is valid
          data.stds = stds;
        }
        else {
          this.addToErrors(this.messages.stds, idx);
        }
        break;
      default:
    }
  },

  checkForErrors: function (data) {
    var idx = 0;
    for (var key in data) {
      if ( data.hasOwnProperty(key) ) {
      // Convert each object value into a string in order to use Validator module
        data[key] += "";
        if ( Validator.isEmpty(data[key]) ) {
          this.addToErrors(this.messages.blank, idx);
        }
        else if (idx !== 3 && !Validator.isInt(data[key]) ) {
          this.addToErrors(this.messages.number, idx);
        }
        else {
          this.checkIndividualFields(data, idx);
        }//else
      }//if
      idx++;
    }//for
  },
/*
          if (data.withoutCondoms > data.numPartners) {
            this.addToErrors(this.messages.condomless, 1);
          }
          if (data.hivPartners > data.withoutCondoms ||
              data.hivPartners > data.numPartners ) {
            this.addToErrors(this.messages.condomless, 2);
          }
          if (data.stds.length !== 3) {
            this.addToErrors(this.messages.stds, 3);
          }
        }

          switch (idx) {
            case 1:
              if (data.withoutCondoms > data.numPartners) {
                this.addToErrors(this.messages.condomless, idx);
              }
              break;
            case 2:
              if (data.hivPartners > data.withoutCondoms ||
                  data.hivPartners > data.numPartners ) {
                this.addToErrors(this.messages.condomless, idx);
              }
              break;
            case 3:
              if (data.stds.length !== 3) {
                this.addToErrors(this.messages.stds, idx);
              }
              break;
            default:
          }//switch
        }// else

        else if ( idx === 1 && data.withoutCondoms > data.numPartners ) {
          this.addToErrors(this.messages.condomless, idx);
        }
        else if ( idx === 2 && 
									( data.hivPartners > data.withoutCondoms || 
									data.hivPartners > data.numPartners ) ) {
          this.addToErrors(this.messages.hiv, idx);
        }
				else if ( idx === 3 && data.stds.split(",").length !== 3) {
          this.addToErrors(this.messages.stds, idx);
        }
        else if ( idx !== 3 && !Validator.isInt(data[key]) ) {
          this.addToErrors(this.messages.number, idx);
        }
				else {}
*/

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
/*
		var errors = [];
		this.state.questionData.map( function (val, idx) {
			errors.push([null]);
		});
*/
    this.setState({
      errors: []
    });
  }
}

module.exports = Validation;
