angular.module('hikeApp', ['ui.router'])
.config(function($urlRouterProvider, $stateProvider){
   
   $stateProvider
      .state('home', {
         url: '/',
         templateUrl: './views/home.html'
      })
      .state('hikenow', {
         url: '/hikenow',
         templateUrl: './views/hikenow.html'
      })
      .state('browse', {
         url: '/browse',
         templateUrl: './views/browse.html'
      })
      .state('educate', {
         url: '/educate',
         templateUrl: './views/educate.html'
      })
      .state('shop', {
         url: '/shop',
         templateUrl: './views/shop.html'
      })
      .state('profile', {
         url: '/profile',
         templateUrl: './views/profile.html'
      })
      .state('hikeAdmin', {
         url: '/hikeAdmin',
         templateUrl: './views/hikeAdmin.html'
      })

      $urlRouterProvider
         .otherwise('/');
});