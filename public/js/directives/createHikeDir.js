angular.module('hikeApp')
.directive('createHike', function(){
   return {
      restrict: 'E',
      templateUrl: './views/hikeAdminTmpl.html'
   }
});