angular.module('hikeApp')
.controller('navCtrl', function($scope, authService, $state){

   $scope.logout = function(){
      authService.logout()
      .then(function(response){
         delete $scope.user;
         $state.go('home', {}, {reload: true});
      });
   }

});