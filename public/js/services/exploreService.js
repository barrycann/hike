angular.module('hikeApp')
.service('exploreService', function($http){
   
   this.getHikes = function(){
      return $http.get('/api/hikes')
      .then(function(response){
         var reviewArr =  response.data;
         for(var i=0;i<reviewArr.length;i++){
            var diff = reviewArr[i].difficulty;
            var urlArr = ['./img/ratings/ratings/rating1.png','./img/ratings/rating2.png','./img/ratings/rating3.png','./img/ratings/rating4.png','./img/ratings/rating5.png','./img/ratings/rating6.png','./img/ratings/rating7.png','./img/ratings/rating8.png','./img/ratings/rating9.png','./img/ratings/rating10.png'];
            
            switch(diff){
               case 1:
               case 2:
               case 3:
                  reviewArr[i].diffText = 'easy';
                  break;
               case 4:
               case 5:
               case 6:
                  reviewArr[i].diffText = 'medium';
                  break;
               case 7:
               case 8:
                  reviewArr[i].diffText = 'challenging';
                  break;
               case 9:
               case 10:
                  reviewArr[i].diffText = 'strenuous';
                  break;
               default:
                  reviewArr[i].diffText = 'None Assigned';
            }
            reviewArr[i].ratingurl = urlArr[reviewArr[i].rating - 1];
         }
         return reviewArr;
      })
   }

   this.getFilteredHikes = function(){
      return $http.get('/api/hikes/' + filters)
      .then(function(response){

         var reviewArr =  response.data;
         var diffArr = ['easy','medium','challenging','strenuous'];
         for(var i=0;i<reviewArr.length;i++){
            reviewArr[i].diffText = urlArr[reviewArr[i].reviewrating - 1];
         }
         return reviewArr;
      })
   }
   
});