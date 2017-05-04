angular.module("hikeApp")
.service('hikeDetailsService', function($http, $stateParams){

   this.getHikeDetails = function(){
      return $http.get('/api/hikes/' + $stateParams.hikeName)
      .then(function(response){
         var theHike = response.data[0];

         var diff = theHike.difficulty;
         var urlArr = ['./img/ratings/rating1.png','./img/ratings/rating2.png','./img/ratings/rating3.png','./img/ratings/rating4.png','./img/ratings/rating5.png','./img/ratings/rating6.png','./img/ratings/rating7.png','./img/ratings/rating8.png','./img/ratings/rating9.png','./img/ratings/rating10.png'];

         theHike.ratingurl = urlArr[theHike.rating - 1];
         
         switch(diff){
            case 1:
            case 2:
            case 3:
               theHike.diffText = 'easy';
               break;
            case 4:
            case 5:
            case 6:
               theHike.diffText = 'medium';
               break;
            case 7:
            case 8:
               theHike.diffText = 'challenging';
               break;
            case 9:
            case 10:
               theHike.diffText = 'strenuous';
               break;
            default:
               theHike.diffText = 'None Assigned';
         }
         return theHike;
      })
   }

   this.getHikeReviews = function(param){
      return $http.get('/api/reviews/' + param)
      .then(function(response){
         var reviewArr =  response.data;
         var urlArr = ['./img/ratings/rating1.png','./img/ratings/rating2.png','./img/ratings/rating3.png','./img/ratings/rating4.png','./img/ratings/rating5.png','./img/ratings/rating6.png','./img/ratings/rating7.png','./img/ratings/rating8.png','./img/ratings/rating9.png','./img/ratings/rating10.png'];
         for(var i=0;i<reviewArr.length;i++){
            console.log(reviewArr[i].reviewrating);
            reviewArr[i].ratingurl = urlArr[reviewArr[i].reviewrating - 1];
         }
         console.log(reviewArr);
         return reviewArr;
      });
   }

   this.createReview = function(review){
      return $http.post('/api/reviews', review)
      .then(function(response){
         return response;
      });
   }
})