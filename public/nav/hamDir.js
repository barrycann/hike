angular.module('hikeApp')
.directive('hamDir', function(){
  return{
    restrict: 'E',
    template: `<nav class="ham-menu">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </nav>`,
    link: function(scope, elem, attrs){
      $('.ham-menu').on('click', function(){
        $('.ham-menu').toggleClass('open');
        $('.mobile-menu').toggleClass('menu-extend');
      });
    }
  }
})