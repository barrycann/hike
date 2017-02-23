'use strict';

angular.module('hikeApp', ['ui.router']).config(function ($urlRouterProvider, $stateProvider) {

   $stateProvider.state('home', {
      url: '/',
      templateUrl: './views/home.html'
   }).state('hikenow', {
      url: '/hikenow',
      templateUrl: './views/hikenow.html'
   }).state('browse', {
      url: '/browse',
      templateUrl: './views/browse.html'
   }).state('educate', {
      url: '/educate',
      templateUrl: './views/educate.html'
   }).state('shop', {
      url: '/shop',
      templateUrl: './views/shop.html'
   }).state('profile', {
      url: '/profile',
      templateUrl: './views/profile.html'
   }).state('hikeAdmin', {
      url: '/hikeAdmin',
      templateUrl: './views/hikeAdmin.html'
   });

   $urlRouterProvider.otherwise('/');
});
'use strict';

angular.module('hikeApp').controller('mainCtrl', function ($scope, mainService) {

   $scope.getHikes = function () {
      mainService.getHikes().then(function (data) {
         $scope.hikeData = data;
      });
   };

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

   $scope.clearSearch = function () {
      $scope.searchAll = null;
   };
});
'use strict';

angular.module('hikeApp').service('mainService', function ($http, $q) {

   this.getHikes = function () {
      var def = $q.defer();
      $http.get('/api/hikes').then(function (response) {
         var parsed = response.data;
         def.resolve(parsed);
      });
      return def.promise;
   };

   this.createHike = function (hike) {
      return $http.post('/api/hikes', hike);
   };
});
'use strict';

angular.module('navDir').controller('navCtrl', function ($scope) {});
'use strict';

angular.module('hikeApp').directive('navDir', function () {
   return {
      restrict: 'AE',
      scope: {
         //brand: '='
      },
      templateUrl: './views/navTemplate.html'
      //controller: function($scope, $elem, $attrs){

      //}
   };
});
//# sourceMappingURL=bundle.js.map
