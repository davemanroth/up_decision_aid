var React = require('react');

var AboutYou = React.createClass({

  getInputType: function (type, ref) {
    if( type === "radio") {
      return (
        <div className="radios">
          <div className="radio">
            <label>
              <input type={ type } ref={ ref } className="form-control" name={ ref } value="yes" /> Yes
            </label>
          </div>
          <div className="radio">
            <label>
              <input type={ type } ref={ ref } className="form-control" name={ ref } value="no" /> No
            </label>
          </div>
        </div>
      );
    }
    return (
      <input type={ type } ref={ ref } className="form-control text-input" />
    );
  },

  handleSubmit: function (e) {
    var data = {
      numPartners: this.refs.numPartners.value,
      withoutCondoms: this.refs.withoutCondoms.value,
      hivParners: this.refs.hivPartners.value,
      stds: this.refs.stds.value,
    };
    e.preventDefault();
    if (this.isValidData(data)) {
      this.props.submitData(data);
    }
    else {
      console.log('Not numbers');
    }
  },

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


  render: function () {
    var _this = this;
    return (
      <div className="step1">
        <h1>Step 1: About you</h1>
        <form className="questions" onSubmit={ this.handleSubmit }>
          { this.props.questionData.map( function (entry, idx) {
            return (
              <div key={ idx } className="form-group">
                <p>{ entry.question }</p>
                { _this.getInputType(entry.type, entry.ref) }
              </div>
            );
          })}
          <button type="submit" className="btn btn-primary btn-lg">Calculate risk</button>
        </form>
      </div>
    )
  }

});

module.exports = AboutYou;
