angular.module('hikeApp')
.directive('mobileMenuDir', function(){
  return {
    restrict: 'E',
    templateUrl: './nav/mobileMenu.html',
    link: function(scope, elem, attrs){
      $()
    }
  }
})