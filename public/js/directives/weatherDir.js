angular.module('hikeApp')
.directive('weatherDir', function(){
   return {
      restrict: 'EA',
      scope: {
         hikeInfo: '=info'
      },
      templateUrl: './views/weatherTemplate.html',
      controller: 'weatherCtrl'
   }
})