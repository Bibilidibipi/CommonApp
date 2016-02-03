angular.module('application', [])

.controller('applicationController', ['$scope', 'apiService', function($scope) {
  $scope.application = apiService.fetchApplication();
}]);
