module.exports = {
  find: function (type) {
    return {
      'address': AddressStore
    }[type];
  }
};
