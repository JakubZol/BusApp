app.config(function($routeProvider, $locationProvider){
   $locationProvider.hashPrefix('');
   $routeProvider.when('/',{
       templateUrl: "./info.html",
       controller: "infoCtrl"
   }).when('/timetable',{
       templateUrl: "./timetablemain.html",
       controller: "timetablemainCtrl"
   }).when('/timetable/line/:line',{
       templateUrl: "./courses.html",
       controller: "coursesCtrl"
   }).when('/timetable/line/:line/course/:courseId/stop/:stop/:order',{
       templateUrl: "./timetable.html",
       controller: "timetableCtrl"
   }).when('/timetable/stop/:stop', {
       templateUrl: "./departures.html",
       controller: "departuresCtrl"
   }).when('/search',{
       templateUrl: "./search.html",
       controller: "searchCtrl"
   }).when('/search/connection/from/:start/to/:destination/lines/:lines/time/:time/date/:date/',{
       templateUrl: "./connection.html",
       controller: "connectionCtrl"
   }).when('/prices',{
       templateUrl: "./prices.html",
       controller: "pricesCtrl"
   }).otherwise({
       redirectTo: "/"
   })
});

