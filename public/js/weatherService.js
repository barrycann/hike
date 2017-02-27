angular.module('hikeApp')
.service('weatherService', function($http){
   this.getWeather = function(){
      return $http.get('http://api.wunderground.com/api/693fef8ebff56c61/forecast/q/40.482525,-111.7501595.json')
      .then(function(response){
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
            day3low: parsed[3].low.fahrenheit,
         }
         return weatherInfo;
      });
   }
})