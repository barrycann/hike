angular.module('hikeApp')
.service('homeService', function($http){

   var calculateDistance = function(hlat, hlon, lat, lon){
      var rad = function(x) {
         return x * Math.PI / 180;
      };

      var R = 6378137; // Earth’s mean radius in meter
      var dLat = rad(lat - hlat);
      var dLong = rad(lon - hlon);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
         Math.cos(rad(hlat)) * Math.cos(rad(lat)) *
         Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d; // returns the distance in meter
   }

   this.getPerfectHike = function(len1, len2, feat, lat, lon){
      return $http.get('/api/hikes/'+ len1 + '/' + len2 + '/' + feat)
      .then(function(response){
         var theHikes = response.data;
         for(var i=0;i<theHikes.length;i++){
            var hikeLat = theHikes[i].latitude;
            var hikeLon = theHikes[i].longitude;

            var distance = calculateDistance(hikeLat, hikeLon, lat, lon);
            theHikes[i].distance = Math.round(distance * 0.000621371);
         }
         console.log(theHikes);
         return theHikes;
      })
   }

   this.getLocalCoords = function(){
      return $http.get('http://ip-api.com/json')
      .then(function(response){
         return response.data;
      });
   }
});