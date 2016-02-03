angular.module('apiService', [])

.factory('apiService', [$http, function($http) {
  var fetchApplication = function() {
    return $http.get('/applications').then(function(success) {console.log('boo')}, function(error) {});
  };

  return {fetchApplication: fetchApplication};
}]);
