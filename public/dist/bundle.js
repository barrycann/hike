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
      templateUrl: './views/prepare.html',
      controller: 'prepareCtrl'
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
               } else {
                  return response.data;
               }
            }).catch(function (err) {
               console.log("Error on profile resolve: ", err);
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

angular.module('hikeApp').controller('exploreCtrl', function ($scope, exploreService) {

   $scope.hikeFilter = {};

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

   $scope.difficultFilter = function () {};

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

angular.module('hikeApp').controller('mainCtrl', function ($scope, mainService, authService) {

   $scope.getUserData = function () {
      authService.getCurrentUser().then(function (response) {
         if (response.data) {
            $scope.user = response.data;
         }
      }).catch(function (err) {
         console.log(err);
      });
   };
   $scope.getUserData();

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
         delete $scope.user;
         $state.go('home', {}, { reload: true });
      });
   };
});
'use strict';

angular.module('hikeApp').controller('prepareCtrl', function ($scope) {});
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

angular.module('hikeApp').directive('colorChange', function () {
   return {
      restrict: 'A',
      link: function link(scope, elem, attrs) {

         $(elem).bind("click", function () {
            setTimeout(function () {
               var pageString = decodeURIComponent(window.location.hash);
               var pageName = pageString.split('/');
               switch (pageName[1]) {
                  case '':
                     $(".nav-bar").css("background-color", '#212');
                     break;
                  case 'explore':
                     $(".nav-bar").css("background-color", '#471311'); //#3D0B09
                     break;
                  case 'prepare':
                     $(".nav-bar").css("background-color", '#042735');
                     break;
                  case 'hikeDetails':
                     $(".nav-bar").css("background-color", 'pink');
                     break;
                  case 'profile':
                     $(".nav-bar").css("background-color", '#042735');
                     break;
                  default:
                     $(".nav-bar").css("background-color", '#212');
                     break;
               }
            }, 100);
         });
      }
   };
});
'use strict';

angular.module('hikeApp').directive('difficultyColor', function () {
   return {
      restrict: 'A',
      link: function link(scope, elem, attrs) {
         var diff = scope.hike.diffText;
         var bgColor;
         switch (diff) {
            case 'easy':
               bgColor = '#28965A';
               break;
            case 'medium':
               bgColor = '#F18231';
               break;
            case 'challenging':
               bgColor = '#892E33';
               break;
            case 'strenuous':
               bgColor = '#311126';
               break;
            default:
               bgColor = 'black';
               break;
         }
         $(elem).css('background-color', bgColor);
      }
   };
});
'use strict';

angular.module('hikeApp').directive('expandBox', function () {
   return {
      restrict: 'A',
      link: function link(scope, elem, attrs) {
         $(elem).bind("click", function () {
            $(".expandable").slideToggle(300, function () {});
         });
      }
   };
});
'use strict';

angular.module('hikeApp').directive('fadeInDir', function () {
   return {
      restrict: 'A',
      link: function link(scope, elem, attrs) {

         $(document).bind('scroll', function () {
            var startFade = 400;
            var endFade = 700;
            var pyo = pageYOffset;
            var fadeOpacity = (endFade - pageYOffset) / (endFade - startFade);

            if (pyo < startFade) {
               elem.css('opacity', 0);
            } else if (pyo >= startFade && pyo <= endFade) {
               elem.css('opacity', 1 - fadeOpacity);
            } else if (pyo > endFade) {
               elem.css('opacity', 1);
            }
         });
      }
   };
});
'use strict';

angular.module('hikeApp').directive('fadeOutDir', function () {
   return {
      restrict: 'A',
      link: function link(scope, elem, attrs) {

         $(document).bind('scroll', function () {
            var startFade = 100;
            var endFade = 500;
            var pyo = pageYOffset;
            var fadeOpacity = (endFade - pageYOffset) / (endFade - startFade);

            if (pyo < startFade) {
               elem.css('opacity', 1);
            } else if (pyo >= startFade && pyo <= endFade) {
               elem.css('opacity', fadeOpacity);
            } else if (pyo > endFade) {
               elem.css('opacity', 0);
            }
         });
      }
   };
});
'use strict';

angular.module('hikeApp').directive('footerDir', function () {
   return {
      restrict: 'E',
      templateUrl: './views/footer.html'
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
            var layers = document.querySelectorAll("[data-type='parallax']");
            for (var i = 0; i < layers.length; i++) {
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
            templateUrl: './views/reviewFormTemplate.html'
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
         var reviewArr = response.data;
         for (var i = 0; i < reviewArr.length; i++) {
            var diff = reviewArr[i].difficulty;
            var urlArr = ['./img/rating1.png', './img/rating2.png', './img/rating3.png', './img/rating4.png', './img/rating5.png', './img/rating6.png', './img/rating7.png', './img/rating8.png', './img/rating9.png', './img/rating10.png'];

            switch (diff) {
               case 1:
               case 2:
               case 3:
                  reviewArr[i].diffText = 'easy';
                  break;
               case 4:
               case 5:
               case 6:
                  reviewArr[i].diffText = 'medium';
                  break;
               case 7:
               case 8:
                  reviewArr[i].diffText = 'challenging';
                  break;
               case 9:
               case 10:
                  reviewArr[i].diffText = 'strenuous';
                  break;
               default:
                  reviewArr[i].diffText = 'None Assigned';
            }
            reviewArr[i].ratingurl = urlArr[reviewArr[i].rating - 1];
         }
         return reviewArr;
      });
   };

   this.getFilteredHikes = function () {
      return $http.get('/api/hikes/' + filters).then(function (response) {

         var reviewArr = response.data;
         var diffArr = ['easy', 'medium', 'challenging', 'strenuous'];
         for (var i = 0; i < reviewArr.length; i++) {
            reviewArr[i].diffText = urlArr[reviewArr[i].reviewrating - 1];
         }
         return reviewArr;
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
