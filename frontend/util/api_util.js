var ApiActions = require('../actions/api_actions');
var FrontendActions = require('../actions/frontend_actions');

module.exports = {
  logOut: function () {
    $.ajax({
      url: "session",
      method: "delete",
      success: function () {
        location = 'session/new';
      }
    });
  },

  fetchApplication: function () {
    $.ajax({
      url: "api/applications",
      success: function (application) {
        ApiActions.receiveApplication(application);
      }
    });
  },  

  saveApplication: function (application) {
    FrontendActions.beginSave();

    $.ajax({
      url: "api/applications/" + application.id,
      method: "PUT",
      data: ({ application: JSON.stringify(application) }),
      success: function (application) { 
        ApiActions.receiveApplication(application, ["Application saved"]);
      },
      error: function (errors) {
        ApiActions.receiveErrors(JSON.parse(errors.responseText));
      }
    });
  }
};
