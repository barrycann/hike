angular.module('hikeApp')
.directive('fadeInDir', function(){
   return {
      restrict: 'A',
      link: function(scope, elem, attrs){
         elem.css('opacity', 0);
         $(document).bind('scroll', function(){
            var startFade;
            var endFade;
            if(window.innerHeight > 1100){
               startFade = 200;
               endFade = 350;
            } else {
               startFade = 350;
               endFade = 650;
            }
            var fadeOpacity = (endFade-pageYOffset) / (endFade - startFade);
            var pyo = pageYOffset;
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