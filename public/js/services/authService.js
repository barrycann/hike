angular.module('hikeApp')
.service('authService', function($http){

   this.logout = function(){
      return $http.get('/api/logout')
      .then(function(response){
         return response;
      })
   };

   this.getCurrentUser = function(){
      return $http.get('/api/me')
      .then(function(response){
         return response;
      })
   };

   this.editUser = function(user){
      return $http.put('/api/user/current', user)
      .then(function(response){
         return response;
      });
   }

});