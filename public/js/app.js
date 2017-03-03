angular.module('hikeApp', ['ui.router', 'ngAnimate'])
.config(function($urlRouterProvider, $stateProvider){
   
   $urlRouterProvider.otherwise('/');

   $stateProvider
      .state('home', {
         url: '/',
         templateUrl: './views/home.html',
         controller: 'homeCtrl'
      })
      .state('explore', {
         url: '/explore',
         templateUrl: './views/explore.html',
         controller: 'exploreCtrl'
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
         templateUrl: './views/profile.html',
         controller: 'profileCtrl',
         resolve: {
            user: function(authService, $state){
               return authService.getCurrentUser()
               .then(function(response){
                  console.log('response: data', response.data);
                  if(!response.data){
                     $state.go('home');
                  }
                  return response.data;
               })
               .catch(function(err){
                  $state.go('home');
               });
            }
         }
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
});