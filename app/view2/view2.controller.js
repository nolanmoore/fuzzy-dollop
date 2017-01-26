'use strict';

angular.module('myApp.view2')
  .controller('View2Ctrl', function($scope, $resource, capitalizeFilter) {
    var PokeList = $resource('pokemon.json');
    $scope.pokelist = {
      data: PokeList.query(),
      selectedoption: ""
    };
    $scope.user = {};
    $scope.poke = {};
    $scope.timetoretreive = 0;
    $scope.results = {};
    $scope.submit = function() {
      if ($scope.user.name != "" && ($scope.user.weight > 0 || !isNaN($scope.user.weight)) && ($scope.user.height > 0 || !isNaN($scope.user.height))) {
        $scope.timetoretreive = Date.now();
        var Poke = $resource('http://pokeapi.co/api/v2/pokemon/' + $scope.pokelist.selectedoption);
        Poke.get(function(response) {
          angular.element(document.querySelector('#timetoretrieve')).text("It took " + (Date.now() - $scope.timetoretreive) + " ms to retreive the data");

          $scope.poke.name = response.name;
          $scope.poke.weight = response.weight / 10;
          $scope.poke.height = response.height / 10;

          $scope.results.cname = (capitalizeFilter($scope.poke.name) + " is a way better name than " + capitalizeFilter($scope.user.name));
          $scope.results.pweight = $scope.poke.weight;
          $scope.results.cweight = ("You weigh " + ($scope.user.weight / $scope.poke.weight).toFixed(2) + " times as much as " + capitalizeFilter($scope.poke.name));
          $scope.results.pheight = $scope.poke.height
          $scope.results.cheight = ("You are " + ($scope.user.height / $scope.poke.height).toFixed(2) + " times as tall as " + capitalizeFilter($scope.poke.name));
        });
      } else {
        alert("Please enter all necessary data");
        $scope.pokelist.selectedoption = "";
      }
    };
  });
