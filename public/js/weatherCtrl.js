angular.module('hikeApp')
.controller('weatherCtrl', function($scope, weatherService){
   $scope.getWeather = function(){
      weatherService.getWeather()
      .then(function(data){
         $scope.weatherInfo = data;
      });
   }
   $scope.getWeather();
})