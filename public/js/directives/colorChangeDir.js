angular.module('hikeApp')
.directive('colorChange', function(){
   return {
      restrict: 'A',
      replace: true,
      link: function(scope, elem, attrs){
         elem.bind('click', function(){
            console.log(scope.$state);
         });
         elem.bind('mouseover', function(){
            elem.css('cursor', ' ');
         })
      }
   }
});