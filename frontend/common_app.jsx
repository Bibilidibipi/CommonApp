window.$ = require('jquery');
window.React = require('react');
window.ReactDOM = require('react-dom');
window.AppDispatcher = require('./dispatcher/dispatcher');
window.ApplicationStore = require('./stores/application');
window.View = require('./view.jsx');

$(function () {
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });
});