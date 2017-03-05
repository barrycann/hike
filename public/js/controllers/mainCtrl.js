angular.module('hikeApp')
.controller('mainCtrl', function($scope, mainService, authService){

   $scope.getUserData = function(){
      authService.getCurrentUser()
      .then(function(response){
         if(response.data){
            $scope.user = response.data;
         }
      })
      .catch(function(err){
         console.log(err);
      });
   }

   $scope.getUserData();

   $scope.createHike = function(hike){
      mainService.createHike(hike)
      .then(function(response){
         if(response){
            alert("Hike submitted.")
         } else {
            alert("Nothing happened");
         }
      });
   }

   $scope.createReview = function(review){
      var currentTime = new Date();
      review.reviewtime = currentTime;
      mainService.createReview(review)
      .then(function(response){
         if(response){
            alert("Review submitted.")
         } else {
            alert("No review submitted");
         }
      });
   }

   $scope.deleteHike = function(){
      mainService.deleteHike($scope.hikeData.name)
      .then(function(data){
         
      })
   }
});