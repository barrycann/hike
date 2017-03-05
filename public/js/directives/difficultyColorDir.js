angular.module('hikeApp')
.directive('difficultyColor', function(){
   return {
      restrict: 'A',
      link: function(scope, elem, attrs){ 
         var diff = scope.hike.diffText;
         var bgColor;
         switch(diff){
            case 'easy':
               bgColor = '#28965A'
               break;
            case 'medium':
               bgColor = '#F18231'
               break;
            case 'challenging':
               bgColor = '#892E33'
               break;
            case 'strenuous':
               bgColor = '#311126'
               break;
            default:
               bgColor = 'black'
               break;
         }
         $(elem).css('background-color', bgColor);
      }
   }
});