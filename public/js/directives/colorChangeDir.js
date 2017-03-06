angular.module('hikeApp')
.directive('colorChange', function(){
   return{
      restrict: 'A',
      link: function(scope, elem, attrs){

         $(elem).bind("click", function(){
            setTimeout(function(){
               var pageString = decodeURIComponent(window.location.hash);
               var pageName = pageString.split('/');
               switch(pageName[1]){
                  case 'explore':
                     $(".nav-bar").css("background-color", '#471311');  //#3D0B09
                     break;
                  case 'hikeDetails':
                     $(".nav-bar").css("background-color", '#212');
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
   }
});