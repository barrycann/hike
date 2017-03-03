angular.module('hikeApp')
.directive('reviewDir', function(){
   return {
      restrict: 'E',
      templateUrl: './views/reviewTemplate.html'
   }
})