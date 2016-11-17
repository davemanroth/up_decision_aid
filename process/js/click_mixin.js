var ClickMixin = {
  componentDidMount: function () {
    document.addEventListener('click', this.handleClick, false);
  },

  componentWillUnmount: function () {
    document.removeEventListener('click', this.handleClick, false);
  },

  handleClick: function (e) {
    if (e.target.id !== "next") {
      return;
    }
    this.handleClickAction(e);
  },
};

module.exports = ClickMixin;
