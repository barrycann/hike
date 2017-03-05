angular.module('hikeApp')
.directive('reviewFormDir', function(){
      return {
            restrict: 'AE',
            templateUrl: './views/reviewFormTemplate.html'
      }
});