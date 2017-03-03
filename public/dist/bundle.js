'use strict';

angular.module('hikeApp', ['ui.router', 'ngAnimate']).config(function ($urlRouterProvider, $stateProvider) {

   $urlRouterProvider.otherwise('/');

   $stateProvider.state('home', {
      url: '/',
      templateUrl: './views/home.html',
      controller: 'homeCtrl'
   }).state('explore', {
      url: '/explore',
      templateUrl: './views/explore.html',
      controller: 'exploreCtrl'
   }).state('prepare', {
      url: '/prepare',
      templateUrl: './views/prepare.html'
   }).state('shop', {
      url: '/shop',
      templateUrl: './views/shop.html'
   }).state('profile', {
      url: '/profile',
      templateUrl: './views/profile.html',
      controller: 'profileCtrl',
      resolve: {
         user: function user(authService, $state) {
            return authService.getCurrentUser().then(function (response) {
               console.log('response: data', response.data);
               if (!response.data) {
                  $state.go('home');
               }
               return response.data;
            }).catch(function (err) {
               $state.go('home');
            });
         }
      }
   }).state('hikeAdmin', {
      url: '/hikeAdmin',
      templateUrl: './views/hikeAdmin.html'
   }).state('hikeDetails', {
      url: '/hikeDetails/:hikeName',
      templateUrl: './views/hikeDetails.html',
      controller: 'hikeDetailsCtrl'
   });
});
'use strict';

angular.module('hikeApp').directive('colorChange', function () {
   return {
      restrict: 'A',
      replace: true,
      link: function link(scope, elem, attrs) {
         elem.bind('click', function () {
            console.log(scope.$state);
         });
         elem.bind('mouseover', function () {
            elem.css('cursor', ' ');
         });
      }
   };
});
'use strict';

angular.module('hikeApp').directive('navDir', function () {
   return {
      restrict: 'E',
      templateUrl: './views/navTemplate.html',
      controller: 'navCtrl'
   };
});
'use strict';

angular.module('hikeApp').directive('parallaxDir', function () {
   return {
      restrict: 'A',
      link: function link(scope, elem, attrs) {

         $(document).on("scroll", function (event) {
            var depth, movement, translate3d, layer;
            var topDistance = pageYOffset;
            var layers = document.querySelectorAll("[data-type='parallax']");
            for (var i = 0; i < layers.length; i++) {
               layer = layers[i];
               depth = layer.getAttribute('data-depth');
               movement = -(topDistance * depth);
               translate3d = 'translate3d(0, ' + movement + 'px, 0)';
               layer.style['-webkit-transform'] = translate3d;
               layer.style['-moz-transform'] = translate3d;
               layer.style['-ms-transform'] = translate3d;
               layer.style['-o-transform'] = translate3d;
               layer.style.transform = translate3d;
            }
         });
      }
   };
});
'use strict';

angular.module('hikeApp').directive('reviewDir', function () {
   return {
      restrict: 'E',
      templateUrl: './views/reviewTemplate.html'
   };
});
'use strict';

angular.module('hikeApp').directive('reviewFormDir', function () {
      return {
            restrict: 'AE',
            templateUrl: './views/reviewFormTemplate.html',
            controller: 'reviewFormCtrl'
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
      restrict: 'EA',
      scope: {
         hikeInfo: '=info'
      },
      templateUrl: './views/weatherTemplate.html',
      controller: 'weatherCtrl'
   };
});
'use strict';

angular.module('hikeApp').controller('exploreCtrl', function ($scope, exploreService) {

   $scope.getHikes = function () {
      exploreService.getHikes().then(function (data) {
         $scope.hikeData = data;
      });
   };

   $scope.getFilteredHikes = function (filters) {
      exploreService.getFilteredHikes(filters).then(function (data) {
         $scope.hikeData = data;
      });
   };

   $scope.getHikes();
});
"use strict";

angular.module("hikeApp").controller('hikeDetailsCtrl', function ($scope, hikeDetailsService) {

   $scope.getHikeDetails = function () {
      hikeDetailsService.getHikeDetails().then(function (response) {
         $scope.hikeDetail = response;
         $scope.getHikeReviews();
      });
   };

   $scope.getHikeReviews = function () {
      hikeDetailsService.getHikeReviews($scope.hikeDetail.hikeid).then(function (response) {
         $scope.reviews = response;
      });
   };

   $scope.getHikeDetails();
});
'use strict';

angular.module('hikeApp').controller('homeCtrl', function ($scope) {});
'use strict';

angular.module('hikeApp').controller('mainCtrl', function ($scope, mainService) {

   $scope.createHike = function (hike) {
      mainService.createHike(hike).then(function (response) {
         if (response) {
            alert("Hike submitted.");
         } else {
            alert("Nothing happened");
         }
      });
   };

   $scope.createReview = function (review) {
      var currentTime = new Date();
      review.reviewtime = currentTime;
      mainService.createReview(review).then(function (response) {
         if (response) {
            alert("Review submitted.");
         } else {
            alert("No review submitted");
         }
      });
   };

   $scope.deleteHike = function () {
      mainService.deleteHike($scope.hikeData.name).then(function (data) {});
   };
});
'use strict';

angular.module('hikeApp').controller('navCtrl', function ($scope, authService, $state) {

   $scope.logout = function () {
      authService.logout().then(function (response) {
         $state.go('home');
      });
   };
});
'use strict';

angular.module('hikeApp').controller('profileCtrl', function ($scope, user, authService) {
   $scope.user = user;

   $scope.updateUser = function (user) {
      authService.editUser(user).then(function (reponse) {
         $scope.user = response.data;
      });
   };
});
'use strict';

angular.module('hikeApp').controller('weatherCtrl', function ($scope, weatherService, $timeout) {

   $scope.getWeather = function () {
      weatherService.getWeather($scope.hikeInfo.latitude, $scope.hikeInfo.longitude).then(function (data) {
         $scope.weatherInfo = data;
      });
   };

   $timeout($scope.getWeather, 100);
});
'use strict';

angular.module('hikeApp').service('authService', function ($http) {

   this.logout = function () {
      return $http.get('/api/logout').then(function (response) {
         return response;
      });
   };

   this.getCurrentUser = function () {
      return $http.get('/api/me').then(function (response) {
         return response;
      });
   };

   this.editUser = function (user) {
      return $http.put('/api/user/current', user).then(function (response) {
         return response;
      });
   };
});
'use strict';

angular.module('hikeApp').service('exploreService', function ($http) {

   this.getHikes = function () {
      return $http.get('/api/hikes').then(function (response) {
         var parsed = response.data;
         return parsed;
      });
   };

   this.getFilteredHikes = function () {
      return $http.get('/api/hikes/' + filters).then(function (response) {
         var parsed = response.data;
         return parsed;
      });
   };
});
'use strict';

angular.module("hikeApp").service('hikeDetailsService', function ($http, $stateParams) {

   var getDifficulty = function getDifficulty(diff) {};

   this.getHikeDetails = function () {
      return $http.get('/api/hikes/' + $stateParams.hikeName).then(function (response) {
         return response.data[0];
      });
   };

   this.getHikeReviews = function (param) {
      return $http.get('/api/reviews/' + param).then(function (response) {
         var reviewArr = response.data;
         var urlArr = ['./img/rating1.png', './img/rating2.png', './img/rating3.png', './img/rating4.png', './img/rating5.png', './img/rating6.png', './img/rating7.png', './img/rating8.png', './img/rating9.png', './img/rating10.png'];
         for (var i = 0; i < reviewArr.length; i++) {
            reviewArr[i].ratingurl = urlArr[reviewArr[i].reviewrating - 1];
         }
         return reviewArr;
      });
   };
});
'use strict';

angular.module('hikeApp').service('mainService', function ($http, $q) {

   this.createHike = function (hike) {
      return $http.post('/api/hikes', hike);
   };

   this.createReview = function (review) {
      return $http.post('/api/reviews', review);
   };

   this.deleteHike = function (name) {
      return $http.delete('/api/hikes', name);
   };
});
'use strict';

angular.module('hikeApp').service('weatherService', function ($http) {
   this.getWeather = function (lat, lon) {
      return $http.get('http://api.wunderground.com/api/693fef8ebff56c61/forecast/q/' + lat + ',' + lon + '.json').then(function (response) {
         var parsed = response.data.forecast.simpleforecast.forecastday;
         var weatherInfo = {
            todayname: parsed[0].date.weekday_short,
            todaylogo: parsed[0].icon_url,
            todayhigh: parsed[0].high.fahrenheit,
            todaylow: parsed[0].low.fahrenheit,
            day1name: parsed[1].date.weekday_short,
            day1logo: parsed[1].icon_url,
            day1high: parsed[1].high.fahrenheit,
            day1low: parsed[1].low.fahrenheit,
            day2name: parsed[2].date.weekday_short,
            day2logo: parsed[2].icon_url,
            day2high: parsed[2].high.fahrenheit,
            day2low: parsed[2].low.fahrenheit,
            day3name: parsed[3].date.weekday_short,
            day3logo: parsed[3].icon_url,
            day3high: parsed[3].high.fahrenheit,
            day3low: parsed[3].low.fahrenheit
         };
         return weatherInfo;
      });
   };
});
//# sourceMappingURL=bundle.js.map
