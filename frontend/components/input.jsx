var ApplicationConstants = require('../constants/application_constants');
var ReactAddons = require('react-addons');
var FrontendActions = require('../actions/frontend_actions');
var Error = require('./error.jsx');

module.exports = React.createClass({
  mixins: [ReactAddons.LinkedStateMixin],

  getInitialState: function () {
    return $.extend({ className: "" }, this.getStateFromStore());
  },

  getStateFromStore: function () {
    var state = {};
    var Store = ApplicationConstants.findStore(this.props.type);
    var obj = Store.find(this.props.id);
    state[this.props.name] = obj && obj[this.props.name];
    return state;
  },

  componentDidMount: function () {
    ApplicationStore.addSaveListener(this._onSave);
    var Store = ApplicationConstants.findStore(this.props.type);
    Store.addErrorListener(this._onError);
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    ApplicationStore.removeSaveListener(this._onSave);
    var Store = ApplicationConstants.findStore(this.props.type);
    Store.removeErrorListener(this._onError);
    Store.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  _onError: function () {
    var Store = ApplicationConstants.findStore(this.props.type);
    var error = Store.find(this.props.id).errors[this.props.name];
    if(error) {
      this.setState({ 
        error: error, 
        errorClass: "show",
        className: "error-label"
      });
    } else {
      this.setState({
        error: '',
        errorClass: "no-show",
        className: ''
      });
    }
  },

  _onSave: function () {
    this.setState({
      error: undefined,
      errorClass: "no-show",
      className: ""
    });
  },

  _showEdit: function (e) {
    $(e.currentTarget).removeClass("hide-edit");
  },

  _edit: function (e) {
    FrontendActions.update(this.props.type, this.props.id, this.state);
    $(e.currentTarget).addClass("hide-edit");
  },  

  render: function () {
    return <div>
      <Error
        error={this.state.error}
        className={this.state.errorClass} 
      />
      <label className={this.state.className}>{this.props.displayName} <input 
        type="text"
        className="hide-edit"
        onFocus={this._showEdit}
        onBlur={this._edit}
        valueLink={this.linkState(this.props.name)}
      ></input></label>
    </div>;
  }
});
