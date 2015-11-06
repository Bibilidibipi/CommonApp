var EventEmitter = require('events').EventEmitter;
var ApplicationConstants = require('../constants/application_constants');

var CHANGE_EVENT = "application_change";
var SAVE_EVENT = "application_save";
var ERROR_EVENT = "application_error";
var ADDRESS_EVENT = "address_event";
var _application;

var resetApplication = function (application) {
  _application = application;
};

var updateApplication = function (props) {
  $.extend(_application, props); 
};

var resetErrors = function (errors) {
  _application.errors = errors;
};

module.exports = $.extend({}, EventEmitter.prototype, {
  find: function () {
    if(!_application) { return {}; }
    return $.extend(true, {}, _application);
  },

  addSaveListener: function (callback) {
    this.on(SAVE_EVENT, callback);
  },
  removeSaveListener: function (callback) {
    this.removeListener(SAVE_EVENT, callback);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback); 
  },

  addErrorListener: function (callback) {
    this.on(ERROR_EVENT, callback);
  },
  removeErrorListener: function (callback) {
    this.removeListener(ERROR_EVENT, callback);
  },
    
  dispatcherID: AppDispatcher.register(function (payload) {
    switch(payload.actionType) {
      case ApplicationConstants.BEGIN_SAVE:
        ApplicationStore.emit(SAVE_EVENT);
        break;
      case ApplicationConstants.APPLICATION_RECEIVED:
        resetApplication(payload.application);
        ApplicationStore.emit(
          CHANGE_EVENT, 
          payload.notifications
        );
        break; 
      case ApplicationConstants.APPLICATION_UPDATED:
        updateApplication(payload.props);
        ApplicationStore.emit(CHANGE_EVENT);
        break;        
      case ApplicationConstants.ERRORS_RECEIVED:
        resetErrors(payload.errors.applicationErrors);
        ApplicationStore.emit(ERROR_EVENT);
        break;
    }
  })
});
