var constants = {
  BEGIN_SAVE: "BEGIN_SAVE",
  APPLICATION_RECEIVED: "APPLICATION_RECEIVED",
  ERRORS_RECEIVED: "ERRORS_RECEIVED",
  ADDRESS_ADDED: "ADDRESS_ADDED",
  ADDRESS_UPDATED: "ADDRESS_UPDATED",
  APPLICATION_REMOVED: "APPLICATION_REMOVED",

  changeConstant: function (type) {
    return {
      'address': constants.ADDRESS_UPDATED
    }[type];
  }
};

module.exports = constants;
