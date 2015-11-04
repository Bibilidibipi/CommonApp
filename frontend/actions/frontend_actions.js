var ApplicationConstants = require('../constants/application_constants');

module.exports = {
  beginSave: function () {
    AppDispatcher.dispatch({
      actionType: ApplicationConstants.BEGIN_SAVE
    });  
  },

  addBlankAddress: function () {
    AppDispatcher.dispatch({
      actionType: ApplicationConstants.ADDRESS_ADDED
    });
  },

  removeAddress: function (address) {
    AppDispatcher.dispatch({
      actionType: ApplicationConstants.ADDRESS_REMOVED,
      address: address
    });
  },

  update: function (type, id, props) {
    AppDispatcher.dispatch({
      actionType: ApplicationConstants[ApplicationConstants.changeConstant(type)],
      id: id,
      props: props
    });
  }
};
