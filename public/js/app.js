angular.module('hikeApp', ['ui.router', 'ngAnimate'])
.run(function($rootScope, $window){
   $rootScope.$on('$stateChangeSuccess', function(){
      $window.scrollTo(0, 0);
   })
})
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
      .state('profile', {
         url: '/profile',
         templateUrl: './views/profile.html',
         controller: 'profileCtrl',
         resolve: {
            user: function(authService, $state){
               return authService.getCurrentUser()
               .then(function(response){
                  if(!response.data){
                     $state.go('home');
                  } else {
                     return response.data;
                  }
               })
               .catch(function(err){
                  console.error("Error on profile resolve: ", err)
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