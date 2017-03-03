angular.module('hikeApp')
.service('exploreService', function($http){
   
   this.getHikes = function(){
      return $http.get('/api/hikes')
      .then(function(response){
         var parsed = response.data;
         return parsed;
      })
   }

   this.getFilteredHikes = function(){
      return $http.get('/api/hikes/' + filters)
      .then(function(response){
         var parsed = response.data;
         return parsed;
      })
   }
   
});