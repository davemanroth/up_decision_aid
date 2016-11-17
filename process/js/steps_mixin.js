function StepsMixin (path) {

  var Mixin = {
    componentDidMount: function () {
      document.addEventListener('click', this.handleClick, false);
      if (path) {
        this.serverRequest = $.get(path, function (data) {
          this.storeData(data);
        }.bind(this));
      }
    },

    componentWillUnmount: function () {
      document.removeEventListener('click', this.handleClick, false);
      //this.serverReqest.abort();
    },

    handleClick: function (e) {
      if (e.target.id !== "next") {
        return;
      }
      this.handleClickAction(e);
    },
  };
  return Mixin;
}

module.exports = StepsMixin;
