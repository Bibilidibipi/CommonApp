var FrontendActions = require('../actions/frontend_actions');

module.exports = React.createClass({
  render: function () {
    return <button type='button' onClick={FrontendActions.addBlankAddress}>Add Address</button>;
  }
});

