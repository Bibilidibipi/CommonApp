var constants = {
  BEGIN_SAVE: "BEGIN_SAVE",
  APPLICATION_RECEIVED: "APPLICATION_RECEIVED",
  ERRORS_RECEIVED: "ERRORS_RECEIVED",
  ADDRESS_ADDED: "ADDRESS_ADDED",
  ADDRESS_UPDATED: "ADDRESS_UPDATED",
  APPLICATION_REMOVED: "APPLICATION_REMOVED",
  APPLICATION_UPDATED: "APPLICATION_UPDATED",

  changeConstant: function (type) {
    return {
      'application': constants.APPLICATION_UPDATED,
      'address': constants.ADDRESS_UPDATED
    }[type];
  },

  findStore: function (type) {
    return {
      'application': ApplicationStore,
      'address': AddressStore
    }[type];
  },  

  applicationFields: [
    'id',
    'first_name',
    'last_name',
    'middle_name',
    'ssn',
    'other_names',
    'dob',
    'email',
    'home_phone',
    'cell_phone',
    'id_type',
    'id_number',
    'id_issuer',
    'id_exp_date',
    'id_other',
    'current_rent',
    'pet_status',
    'pet_describe',
    'waterbed_status',
    'waterbed_describe',
    'current_income',
    'current_income_per',
    'bankruptcy',
    'eviction',
    'drugs',
    'other_occupants'
  ],

  addressFields: [
    'street_address',
    'city',
    'state',
    'zip',
    'date_in',
    'date_out',
    'agent_name',
    'agent_phone',
    'move_out_reason'
  ]  
};

module.exports = constants;
