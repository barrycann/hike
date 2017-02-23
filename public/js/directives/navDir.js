angular.module('hikeApp')
.directive('navDir', function(){
   return {
      restrict: 'AE',
      scope: {
         //brand: '='
      },
      templateUrl: './views/navTemplate.html'
      //controller: function($scope, $elem, $attrs){

      //}
   }
})