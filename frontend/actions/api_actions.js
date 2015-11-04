var ApplicationUtil = require('../util/application_util');
var ApplicationConstants = require('../constants/application_constants');

module.exports = {
  receiveApplication: function (application, notifications) {
    var applicationFields = {};
    ApplicationUtil.applicationFields.forEach(function (field) {
      applicationFields[field] = application[field];
    });

    AppDispatcher.dispatch({
      actionType: ApplicationConstants.APPLICATION_RECEIVED,
      application: applicationFields,
      addresses: application.previous_addresses,
      notifications: notifications
    }); 
  },

  receiveErrors: function (errors) {
    AppDispatcher.dispatch({
      actionType: ApplicationConstants.ERRORS_RECEIVED,
      errors: errors
    });
  } 
};
