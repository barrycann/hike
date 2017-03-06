angular.module('hikeApp')
.controller('homeCtrl', function($scope, homeService){

   $scope.box1Class = "little-box";
   $scope.box2Class = "little-box";
   $scope.box3Class = "little-box";
   $scope.box4Class = "little-box";
   $scope.box5Class = "little-box";
   $scope.box6Class = "little-box";

   $scope.getLocalCoords = function(){
      homeService.getLocalCoords()
      .then(function(response){
         $scope.localLat = response.lat;
         $scope.localLon = response.lon;
      });
   }
   $scope.getLocalCoords();

   $scope.setLength = function(len1, len2){
      $scope.hikeLength1 = len1;
      $scope.hikeLength2 = len2;

      if(len2 == 2){
         $scope.box1Class = "selected";
         $scope.box2Class = "little-box";
         $scope.box3Class = "little-box";
      }
      if(len2 == 5){
         $scope.box1Class = "little-box";
         $scope.box2Class = "selected";
         $scope.box3Class = "little-box";
      }
      if(len2 == 15){
         $scope.box1Class = "little-box";
         $scope.box2Class = "little-box";
         $scope.box3Class = "selected";
      }
   }

   $scope.setFeature = function(param){
      $scope.hikeFeature = param
      if(param == 'lake'){
         $scope.box4Class = "selected";
         $scope.box5Class = "little-box";
         $scope.box6Class = "little-box";
      }
      if(param == 'waterfall'){
         $scope.box4Class = "little-box";
         $scope.box5Class = "selected";
         $scope.box6Class = "little-box";
      }
      if(param == 'peak'){
         $scope.box4Class = "little-box";
         $scope.box5Class = "little-box";
         $scope.box6Class = "selected";
      }
   }

   $scope.getPerfectHike = function(len1, len2, feat, lat, lon){
      if(len1 === undefined || feat === undefined){
         alert("You must select a hike length and a feature!");
      } else {
         homeService.getPerfectHike(len1, len2, feat, lat, lon)
         .then(function(response){
            console.log(response);
            return response;
         });
      }
   }
});