angular.module('hikeApp')
.service('mainService', function($http, $q){

   
   this.getHikes = function(){
      var def = $q.defer();
      $http.get('/api/hikes')
      .then(function(response){
         var parsed = response.data;
         def.resolve(parsed);
      });
      return def.promise;
   }

   this.createHike = function(hike){
      return $http.post('/api/hikes', hike);
   }

});