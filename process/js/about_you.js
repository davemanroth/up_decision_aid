const React = require('react');
const ReactDOM = require('react-dom');
const ABOUT_DATA = './js/about_you_questions.json';

class AboutYou extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.serverRequest = $.get(ABOUT_DATA, function (data) {
      this.state{
        data: data,
        safeData: data
      }
    }.bind(this));
  }

  componentWillUnmount () {
    this.serverReqest.abort();
  }


  render () {
    return (
    );
  }
}

