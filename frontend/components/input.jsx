var ReactAddons = require('react-addons');
var StoresUtil = require('../util/stores_util');
var FrontendActions = require('../actions/frontend_actions');
var Error = require('./error.jsx');

module.exports = React.createClass({
  mixins: [ReactAddons.LinkedStateMixin],

  getInitialState: function () {
    var state = { className: "" };
    if(this.props.type) {
      var Store = StoresUtil.find(this.props.type);
      state[this.props.name] = Store.find(this.props.id)[this.props.name]
    } else {
      state[this.props.name] = this.props.form.state[this.props.name];
    }
    return state;
  },

  componentDidMount: function () {
    ApplicationStore.addSaveListener(this._onSave);
    ApplicationStore.addErrorListener(this._onError);
  },

  componentWillUnmount: function () {
    ApplicationStore.removeSaveListener(this._onSave);
    ApplicationStore.removeErrorListener(this._onError);
  },

  _onError: function () {
    var error = ApplicationStore.errors()[this.props.name];
    if(error) {
      this.setState({ 
        error: error, 
        errorClass: "show",
        className: "error-label"
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

    if(this.props.type) { 
      FrontendActions.update(this.props.type, this.props.id, this.state);
    } else {


    //FrontendAction to reset store triggers props change  ???
    //Input would have to keep track of an object instead of a form
    //Let's do it!!!! TG for git.


      this.props.form.setState(this.state);
    }
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
        name={this.props.name}
        valueLink={this.linkState(this.props.name)}
      ></input></label>
    </div>;
  }
});
