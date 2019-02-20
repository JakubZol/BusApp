app.config(function($routeProvider, $locationProvider){
   $locationProvider.hashPrefix('');
   $routeProvider.when('/',{
       templateUrl: "./info.html",
       controller: "infoCtrl"
   }).when('/timetable',{
       templateUrl: "./timetable.html",
       controller: "timetableCtrl"
   }).when('/timetable/line/:line',{
       templateUrl: "./linetimetable.html",
       controller: "linetimetableCtrl"
   }).when('/timetable/stop/:stop', {
       templateUrl: "./stoptimetable.html",
       controller: "stoptimetableCtrl"
   }).when('/search',{
       templateUrl: "./search.html",
       controller: "searchCtrl"
   }).when('/search/connection/from/:start/to/:destination/:hour/:minutes/:date/:lines',{
       templateUrl: "./connection.html",
       controller: "connectionCtrl"
   }).when('/prices',{
       templateUrl: "./prices.html",
       controller: "pricesCtrl"
   }).otherwise({
       redirectTo: "/"
   })
});

