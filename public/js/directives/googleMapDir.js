angular.module('hikeApp')
.directive('googleMap', function(){
  return {
    restrict: 'E',
    template: "<div id='map'></div>",
    scope: {
      name: '=',
      zoom: '='
    },
    link: function(scope, elem, attrs){
      scope.theName = scope.name.replace(/ /g, '');

      function initMap(){
        var map = new google.maps.Map(document.getElementById(scope.theName), {
          zoom: scope.zoom,
          center: {
            lat: 25.555,
            lng: 110.544
          },
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ['roadmap','terrain']
          },
          scrollWheel: false,
          gestureHandling: 'cooperative',
          fullscreenControl: true
        })
      }
    }
  }
})