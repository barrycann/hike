angular.module('hikeApp')
.service('mainService', function($http, $q){

   this.getHikes = function(){
      return $http.get('/api/hikes')
      .then(function(response){
         var parsed = response.data;
         return parsed;
      })
   }

   this.createHike = function(hike){
      return $http.post('/api/hikes', hike);
   }

});