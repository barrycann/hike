angular.module("hikeApp")
.service('hikeDetailsService', function($http, $stateParams){

   var getDifficulty = function(diff){
      
   }

   this.getHikeDetails = function(){
      return $http.get('/api/hikes/' + $stateParams.hikeName)
      .then(function(response){
         return response.data[0];
      })
   }

   this.getHikeReviews = function(param){
      return $http.get('/api/reviews/' + param)
      .then(function(response){
         var reviewArr =  response.data;
         var urlArr = ['./img/rating1.png','./img/rating2.png','./img/rating3.png','./img/rating4.png','./img/rating5.png','./img/rating6.png','./img/rating7.png','./img/rating8.png','./img/rating9.png','./img/rating10.png'];
         for(var i=0;i<reviewArr.length;i++){
            reviewArr[i].ratingurl = urlArr[reviewArr[i].reviewrating - 1];
         }
         return reviewArr;
      });
   }
})