'use strict';

angular.module('hikeApp', ['ui.router']).config(function ($urlRouterProvider, $stateProvider) {

   $stateProvider.state('home', {
      url: '/home',
      templateUrl: './views/home.html'
   }).state('explore', {
      url: '/explore',
      templateUrl: './views/explore.html'
   }).state('prepare', {
      url: '/prepare',
      templateUrl: './views/prepare.html'
   }).state('shop', {
      url: '/shop',
      templateUrl: './views/shop.html'
   }).state('profile', {
      url: '/profile',
      templateUrl: './views/profile.html'
   }).state('login', {
      url: '/login',
      templateUrl: '/login.html'
   }).state('hikeAdmin', {
      url: '/hikeAdmin',
      templateUrl: './views/hikeAdmin.html'
   }).state('hikeDetails', {
      url: '/hikeDetails/:hikeName',
      templateUrl: './views/hikeDetails.html',
      controller: 'hikeDetailsCtrl'
   });

   $urlRouterProvider.otherwise('/home');
});
'use strict';

angular.module("hikeApp").controller('hikeDetailsCtrl', function ($scope, $stateParams, $http) {

   $scope.getHikeDetails = function () {
      $http.get('/api/hikes/' + $stateParams.hikeName).then(function (response) {
         $scope.hikeDetail = response.data[0];
      });
   };

   $scope.getHikePhotos = function () {
      $http.get('/api/photos/' + $stateParams.hikeName).then(function (response) {
         $scope.hikePhotos = response.data[0];
      });
   };

   $scope.getHikeDetails();
});
'use strict';

angular.module('hikeApp').service('hikeDetailsService', function ($http, $q) {

   this.getHikeDetails = function () {
      var def = $q.defer();
      $http.get('/api/hikes', { params: { name: $stateParams.hikename } }).then(function (response) {
         console.log(response);
         return response.data;
      });
   };
});
'use strict';

angular.module('hikeApp').controller('mainCtrl', function ($scope, mainService) {

   $scope.getHikes = function () {
      mainService.getHikes().then(function (data) {
         $scope.hikeData = data;
      });
   };
   $scope.getHikes();

   $scope.createHike = function (hike) {
      console.log(hike);

      mainService.createHike(hike).then(function (response) {
         console.log(response);
         if (response) {
            alert("Hike submitted.");
         } else {
            alert("Nothing happened");
         }
      });
   };
});
'use strict';

angular.module('hikeApp').service('mainService', function ($http, $q) {

   this.getHikes = function () {
      return $http.get('/api/hikes').then(function (response) {
         var parsed = response.data;
         return parsed;
      });
   };

   this.createHike = function (hike) {
      return $http.post('/api/hikes', hike);
   };
});
'use strict';

angular.module('hikeApp').controller('weatherCtrl', function ($scope, weatherService) {
   $scope.getWeather = function () {
      weatherService.getWeather().then(function (data) {
         $scope.weatherInfo = data;
      });
   };
   $scope.getWeather();
});
'use strict';

angular.module('hikeApp').service('weatherService', function ($http) {
   this.getWeather = function () {
      return $http.get('http://api.wunderground.com/api/693fef8ebff56c61/forecast/q/40.482525,-111.7501595.json').then(function (response) {
         var parsed = response.forecast.simpleforecast.forecastday;
         var weatherInfo = {
            todayname: parsed[0].date.weekday,
            todaylogo: parsed[0].icon_url,
            todayhigh: parsed[0].high.fahrenheit,
            todaylow: parsed[0].low.fahrenheit,
            day1name: parsed[1].date.weekday,
            day1logo: parsed[1].icon_url,
            day1high: parsed[1].high.fahrenheit,
            day1low: parsed[1].low.fahrenheit,
            day2name: parsed[2].date.weekday,
            day2logo: parsed[2].icon_url,
            day2high: parsed[2].high.fahrenheit,
            day2low: parsed[2].low.fahrenheit,
            day3name: parsed[3].date.weekday,
            day3logo: parsed[3].icon_url,
            day3high: parsed[3].high.fahrenheit,
            day3low: parsed[3].low.fahrenheit
         };
         return weatherInfo;
      });
   };
});
'use strict';

angular.module('hikeApp').directive('navDir', function () {
   return {
      restrict: 'E',
      templateUrl: './views/navTemplate.html'
   };
});
'use strict';

angular.module('hikeApp').directive('smallHikeDir', function () {
   return {
      restrict: 'E',
      templateUrl: './views/smallHikeTemplate.html'
   };
});
'use strict';

angular.module('hikeApp').directive('weatherDir', function () {
   return {
      restrict: 'E',
      templateUrl: './views/weatherTemplate.html',
      controller: '../weatherCtrl.js'
   };
});
//# sourceMappingURL=bundle.js.map
