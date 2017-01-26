'use strict';

angular.module('myApp.view1')
  .controller('View1Ctrl', function($scope, $resource) {
    $scope.name = "Pina colada";
    $scope.from = "Me";
    $scope.message = $scope.name + ", you are delicious af.";
    $scope.subtitle = "-" + $scope.from;
    $scope.submit = function() {
      var Fuck = $resource('https://www.foaas.com/' + $scope.level + '/:name/:from', {name: '@name', from: '@from'});
      Fuck.get({name: $scope.name, from: $scope.from}, function(response) {
        $scope.message = response.message;
        $scope.subtitle = response.subtitle;
      });
    };
  });
