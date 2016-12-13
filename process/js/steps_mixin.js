function StepsMixin (path) {

  var Mixin = {
    componentDidMount: function () {
      document.addEventListener('click', this.handleClick, false);
      if (path) {
        this.serverRequest = jQuery.get(path, function (data) {
          this.storeData(data);
        }.bind(this));
      }
    },

    componentWillUnmount: function () {
      document.removeEventListener('click', this.handleClick, false);
      //this.serverReqest.abort();
    },

    handleClick: function (e) {
      if (e.target.id === "next" || e.target.id === "back" || e.target.id === "finish") {
      //if (e.target.tagName === "BUTTON") {
        this.handleClickAction(e.target.id);
        e.preventDefault();
      }
      return;
    },
  };
  return Mixin;
}

module.exports = StepsMixin;
