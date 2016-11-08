var React = require('react');
var ReactDOM = require('react-dom');

class UpDecisionAid extends React.Component {
  constructor(props) {
    super(props);
    const state = {};
  }

  render () {
    return (
      <div>
        <h1>This is a test</h1>
      </div>
    );
  } //render
} // UpDecisionAid


ReactDOM.render(
  <UpDecisionAid />,
  document.getElementById('up-app')
); // render
