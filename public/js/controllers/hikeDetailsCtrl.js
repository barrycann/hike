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
         for(var i=0;i<response.length; i++){
            var time = response[i].reviewtime;
            time = moment(time, "YYYY-M-D hh:mm")._d.toString();
            var bt = time.substring(0, 21);
            response[i].reviewtime = bt;
         }

         $scope.reviews = response;
      });
   }

   $scope.getHikeDetails();

   $scope.createReview = function(review){
      var currentTime = new Date();
      review.reviewtime = currentTime;
      review.hikeid = $scope.hikeDetail.hikeid;
      review.userid = $scope.user.userid;
      hikeDetailsService.createReview(review)
      .then(function(response){
         if(response){
            alert("Review submitted.")
         } else {
            alert("No review submitted");
         }
      });
   }
});