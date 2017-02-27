angular.module("hikeApp")
.controller('hikeDetailsCtrl', function($scope, $stateParams, $http){
   
   $scope.getHikeDetails = function(){
      $http.get('/api/hikes/' + $stateParams.hikeName)
      .then(function(response){
         $scope.hikeDetail = response.data[0];
      })
   }

   $scope.getHikePhotos = function(){
      $http.get('/api/photos/' + $stateParams.hikeName)
      .then(function(response){
         $scope.hikePhotos = response.data[0];
      })
   }

   $scope.getHikeDetails();
});