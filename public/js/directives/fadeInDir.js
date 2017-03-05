angular.module('hikeApp')
.directive('fadeInDir', function(){
   return {
      restrict: 'A',
      link: function(scope, elem, attrs){

         $(document).bind('scroll', function(){
            var startFade = 400;
            var endFade = 700;
            var pyo = pageYOffset;
            var fadeOpacity = (endFade-pageYOffset) / (endFade - startFade);

            if(pyo < startFade){
               elem.css('opacity', 0);
            } else if(pyo >= startFade && pyo <= endFade){
               elem.css('opacity', 1-fadeOpacity);
            } else if(pyo > endFade){
               elem.css('opacity', 1);
            }
         });
      }
   }
});