angular.module('hikeApp')
.service('hikeDetailsService', function($http, $q){

   this.getHikeDetails = function(){
      var def = $q.defer();
      $http.get('/api/hikes', {params: {name: $stateParams.hikename}})
      .then(function(response){
         console.log(response);
         return response.data;
      })
   }
})