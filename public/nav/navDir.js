angular.module('hikeApp')
.directive('navDir', function(){
   return {
      restrict: 'E',
      templateUrl: './nav/navTemplate.html',
      controller: 'navCtrl'
   }
})