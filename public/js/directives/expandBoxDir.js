angular.module('hikeApp')
.directive('expandBox', function(){
   return{
      restrict: 'A',
      link: function(scope, elem, attrs){
         $(elem).bind("click", function(){
            $(".expandable").slideToggle(300, function(){
            });
         })
      }
   }
})