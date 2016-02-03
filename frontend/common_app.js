require('angular');
require('angular-route');
require('./main/main.js');
require('./application/application.js');

angular.module('templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('main', require('./main/template.js'));
  $templateCache.put('application', require('./application/template.js'));
}]);

var app = angular.module('commonApp', ['templates', 'ngRoute', 'main', 'application'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'main', 
      controller: 'mainController'
    })
    .when('/application', {
      templateUrl: 'application', 
      controller: 'applicationController'
    })
    .otherwise({redirectTo: '/'});
});
