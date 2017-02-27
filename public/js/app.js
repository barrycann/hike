angular.module('hikeApp', ['ui.router'])
.config(function($urlRouterProvider, $stateProvider){
   
   $stateProvider
      .state('home', {
         url: '/home',
         templateUrl: './views/home.html'
      })
      .state('explore', {
         url: '/explore',
         templateUrl: './views/explore.html'
      })
      .state('prepare', {
         url: '/prepare',
         templateUrl: './views/prepare.html'
      })
      .state('shop', {
         url: '/shop',
         templateUrl: './views/shop.html'
      })
      .state('profile', {
         url: '/profile',
         templateUrl: './views/profile.html'
      })
      .state('login', {
         url: '/login',
         templateUrl: '/login.html'
      })
      .state('hikeAdmin', {
         url: '/hikeAdmin',
         templateUrl: './views/hikeAdmin.html'
      })
      .state('hikeDetails', {
         url: '/hikeDetails/:hikeName',
         templateUrl: './views/hikeDetails.html',
         controller: 'hikeDetailsCtrl'
      })

      $urlRouterProvider
         .otherwise('/home');
});