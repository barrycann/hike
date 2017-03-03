angular.module('hikeApp')
.controller('navCtrl', function($scope, authService, $state){
   
   $scope.logout = function(){
      authService.logout()
      .then(function(response){
         $state.go('home');
      });
   }
   
});