app.service("dataProvider", function($http){
   this.getData = function(url){
       return $http.get(url);
    }
});

/*
app.service("stopTimetable", function($filter, $q, dataProvider) {
    this.getTimetable = function () {
    }
});
*/