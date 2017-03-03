angular.module('hikeApp')
.directive('fadeOutDir', function(){
   return {
      restrict: 'A',
      link: function(scope, elem, attrs){

         $(document).bind('scroll', function(){
            var startFade = 100;
            var endFade = 600;
            var pyo = pageYOffset;
            var fadeOpacity = (endFade-pageYOffset) / (endFade - startFade);

            if(pyo < startFade){
               elem.css('opacity', 1);
            } else if(pyo >= startFade && pyo <= endFade){
               elem.css('opacity', fadeOpacity);
            } else if(pyo > endFade){
               elem.css('opacity', 0);
            }
         });
      }
   }
});