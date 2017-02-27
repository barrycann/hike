angular.module('hikeApp')
.directive('weatherDir', function(){
   return {
      restrict: 'E',
      templateUrl: './views/weatherTemplate.html',
      controller: '../weatherCtrl.js'
   }
})