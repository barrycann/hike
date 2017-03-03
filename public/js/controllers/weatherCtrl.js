angular.module('hikeApp')
.controller('weatherCtrl', function($scope, weatherService, $timeout){

   $scope.getWeather = function(){
      weatherService.getWeather($scope.hikeInfo.latitude, $scope.hikeInfo.longitude)
      .then(function(data){
         $scope.weatherInfo = data;
      });
   }

   $timeout($scope.getWeather, 100);

})