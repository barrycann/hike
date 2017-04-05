angular.module('hikeApp')
.controller('exploreCtrl', function($scope, exploreService){
   
  $scope.diffTypes = [
    {name: "-- ALL --", value: undefined},
    {name: "Easy", value: "easy"},
    {name: "Medium", value: "medium"},
    {name: "Challenging", value: "challenging"},
    {name: "Strenuous", value: "strenuous"}
  ];

  $scope.featTypes = [
    {name: "-- ALL --", value: undefined},
    {name: "Lake", value: "lake"},
    {name: "Waterfall", value: "waterfall"},
    {name: "Peak", value: "peak"}
  ];

   $scope.getHikes = function(){
      exploreService.getHikes()
      .then(function(data){
         $scope.hikeData = data;
      });
   }

   $scope.getHikes();
});