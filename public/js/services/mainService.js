angular.module('hikeApp')
.service('mainService', function($http, $q){

   this.createHike = function(hike){
      return $http.post('/api/hikes', hike);
   }

   this.createReview = function(review){
      return $http.post('/api/reviews', review)
   }

   this.deleteHike = function(name){
      return $http.delete('/api/hikes', name)
   }

   

});