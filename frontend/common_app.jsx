window.$ = require('jquery');
window.React = require('react');
window.ReactDOM = require('react-dom');
window.AppDispatcher = require('./dispatcher/dispatcher');
window.ApplicationStore = require('./stores/application');
ApplicationStore.setMaxListeners(44);
window.AddressStore = require('./stores/address');
AddressStore.setMaxListeners(22);
window.View = require('./view.jsx');

$(function () {
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });
});
