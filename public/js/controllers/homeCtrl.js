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

   $scope.setLength = function(param){
      $scope.hikeLength = param;
      if(param == 2){
         $scope.box1Class = "selected";
         $scope.box2Class = "little-box";
         $scope.box3Class = "little-box";
      }
      if(param == 5){
         $scope.box1Class = "little-box";
         $scope.box2Class = "selected";
         $scope.box3Class = "little-box";
      }
      if(param == 6){
         $scope.box1Class = "little-box";
         $scope.box2Class = "little-box";
         $scope.box3Class = "selected";
      }
      console.log("Length: ", $scope.hikeLength);
      console.log("Feature: ", $scope.hikeFeature);
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
      console.log("Length: ", $scope.hikeLength);
      console.log("Feature: ", $scope.hikeFeature);
   }

   $scope.getHike = function(length, feature, lat, lon){
      if(length === undefined || feature === undefined){
         alert("You must select a hike and a feature!");
      } else {
         //mainService.getPerfectHike(length, feature)
         //.then(function(response){
            console.log("Getting hike with length, " + length + ", and feature, " + feature + ".");
            console.log("Nearest to the coordinates of Latitude: " + lat + ", and Longitude " + lon + ".")
         //});
      }
   }

});