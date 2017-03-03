angular.module('hikeApp')
.directive('parallaxDir', function(){
   return {
      restrict: 'A',
      link: function(scope, elem, attrs){
         $(document).on("scroll", function(event){
            var depth, movement, translate3d, layer;
            var layers = document.querySelectorAll("[data-type='parallax']");
            for(var i=0; i<layers.length; i++){
               layer = layers[i];
               depth = layer.getAttribute('data-depth');
               movement = -(pageYOffset * depth);
               translate3d = 'translate3d(0, ' + movement + 'px, 0)';
               layer.style['-webkit-transform'] = translate3d;
               layer.style['-moz-transform'] = translate3d;
               layer.style['-ms-transform'] = translate3d;
               layer.style['-o-transform'] = translate3d;
               layer.style.transform = translate3d;
            }
         })
      }
   }
})