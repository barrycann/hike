angular.module('hikeApp')
.service('homeService', function($http){

   this.getPerfectHike = function(length, feature){
      return $http.get('/api/hikes?length='+length+'&feature='+feature)
      .then(function(response){
         console.log(response);
      })
   }

   this.getLocalCoords = function(){
      return $http.get('http://ip-api.com/json')
      .then(function(response){
         return response.data;
      });
   }
});