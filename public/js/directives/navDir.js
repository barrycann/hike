angular.module('hikeApp')
.directive('navDir', function(){
   return {
      restrict: 'E',
      templateUrl: './views/navTemplate.html',
      controller: 'navCtrl'
   }
})