angular.module('hikeApp')
.directive('smallHikeDir', function(){
   return {
      restrict: 'E',
      templateUrl: './views/smallHikeTemplate.html'
   }
})