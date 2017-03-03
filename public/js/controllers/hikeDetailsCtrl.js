angular.module("hikeApp")
.controller('hikeDetailsCtrl', function($scope, hikeDetailsService){

   $scope.getHikeDetails = function(){
      hikeDetailsService.getHikeDetails()
      .then(function(response){
         $scope.hikeDetail = response;
         $scope.getHikeReviews();
      })
   }

   $scope.getHikeReviews = function(){
      hikeDetailsService.getHikeReviews($scope.hikeDetail.hikeid)
      .then(function(response){
         $scope.reviews = response;
      });
   }

   $scope.getHikeDetails();
});