angular.module('hikeApp')
.controller('mainCtrl', function($scope, mainService){

   $scope.getHikes = function(){
      mainService.getHikes()
      .then(function(data){
         $scope.hikeData = data;
      });
   }

   $scope.createHike = function(hike){
      console.log(hike);

      mainService.createHike(hike)
      .then(function(response){
         console.log(response);
         if(response){
            alert("Hike submitted.")
         } else {
            alert("Nothing happened");
         }
      });
   }

   $scope.clearSearch = function(){
      $scope.searchAll = null;      
   }

});