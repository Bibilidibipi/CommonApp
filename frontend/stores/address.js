var EventEmitter = require('events').EventEmitter;
var ApplicationConstants = require('../constants/application_constants');

var ADDRESS_EVENT = "address_event";
var _addresses = [];
var _pendingId = -1;

var resetAddresses = function (newAddresses) {
  _addresses = newAddresses;
};

var addAddress = function () {
  _addresses.push({ id: _pendingId-- });
};

var removeAddress = function (address) {
  var newAddresses = [];
  _addresses.forEach(function (adr) {
    if(address.id !== adr.id) { newAddresses.push(adr); }
  })
  _addresses = newAddresses;
};

module.exports = $.extend({}, EventEmitter.prototype, {
  all: function () {
    return _addresses.slice();
  },

  find: function (id) {
    var found;
    _addresses.forEach(function (adr) {
      if(id === adr.id) { found = adr; }
    })
    return found;
  },

  addChangeListener: function (callback) {
    this.on(ADDRESS_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(ADDRESS_EVENT, callback);
  },

  dispatcherID: AppDispatcher.register(function (payload) {
    switch(payload.actionType) {
      case ApplicationConstants.APPLICATION_RECEIVED:
        resetAddresses(payload.addresses);
        AddressStore.emit(ADDRESS_EVENT);
        break;
      case ApplicationConstants.ADDRESS_ADDED:
        addAddress();
        AddressStore.emit(ADDRESS_EVENT);
        break; 
      case ApplicationConstants.ADDRESS_REMOVED:
        removeAddress(payload.address);
        AddressStore.emit(ADDRESS_EVENT);
        break; 
    }
  })
});
