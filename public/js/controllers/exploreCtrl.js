angular.module('hikeApp')
.controller('exploreCtrl', function($scope, exploreService){

   $scope.hikeFilter = {};

   $scope.getHikes = function(){
      exploreService.getHikes()
      .then(function(data){
         $scope.hikeData = data;
      });
   }

   $scope.getFilteredHikes = function(filters){
      exploreService.getFilteredHikes(filters)
      .then(function(data){
         $scope.hikeData = data;
      });
   }

   $scope.difficultFilter = function(){

   }

   $scope.getHikes();
});