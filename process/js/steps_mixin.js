// This is a mixin module that holds commonly used functions. It's 
// imported by specific step components and uses lifecycle methods
// to load data from JSON files and handle click events.

function StepsMixin (fileName) {
  const PATH = 'sites/all/modules/custom/prep_decision_aid/js/'

  var Mixin = {
    componentDidMount: function () {
      document.addEventListener('click', this.handleClick, false);
      if (fileName) {
        this.serverRequest = jQuery.get(PATH + fileName, function (data) {
          this.storeData(data);
        }.bind(this));
      }
    },

    componentWillUnmount: function () {
      document.removeEventListener('click', this.handleClick, false);
    },

    handleClick: function (e) {
      if (e.target.tagName === "BUTTON") {
        this.handleClickAction(e.target.id);
        jQuery('html, body').animate({ scrollTop: 0 }, "slow");
      }
      return;
    },
  };
  return Mixin;
}

module.exports = StepsMixin;
