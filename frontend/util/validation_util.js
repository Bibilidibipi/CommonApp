var ApplicationConstants = require('../constants/application_constants');
var ApiActions = require('../actions/api_actions');

var ValidationUtil = {
  validate: function (application) {
    var errors = {};
    var valid = true;
    errors.applicationErrors = {};
    ApplicationConstants.applicationFields.forEach(function (field) {
      var error = ValidationUtil.validateApplication(
        field, 
        application[field]
      );
      if(error) { 
        errors.applicationErrors[field] = error;
        valid = false;
      }
    })

    errors.addressErrors = [];
    application.addresses.forEach(function (address) {
      var errs = { adr_id: address.id };
      ApplicationConstants.addressFields.forEach(function (field) {
        var error = ValidationUtil.validateAddress(
          field,
          address[field]
        );
        if(error) {
          errs[field] = error;
          valid = false;
        }
      })
      errors.addressErrors.push(errs);
    })

    if(valid) {

    } else {
      ApiActions.receiveErrors(errors);
    }
  },

  validateApplication: function (field, data) {
    switch(field) {
      case 'first_name':
        if(!data) { return "shouldn't be blank"; }
        break;
    } 
  },

  validateAddress: function (field, data) {
    switch(field) {
      case 'street_address':
        if(!data) { return "shouldn't be blank"; }
        break;
      case 'state':
        if(!data) { return "shouldn't be blank"; }
        break;
    }
  } 
};

module.exports = ValidationUtil;
