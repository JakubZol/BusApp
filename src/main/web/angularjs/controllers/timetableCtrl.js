app.controller("timetableCtrl", function($scope, $http, $q){

    $q.all([$http.get("data/mockdata/lines.json"), $http.get("data/mockdata/stopswithlines.json")]).then(function(response){
        $scope.lines = response[0].data;
        $scope.stops = response[1].data;
    }).catch((error) => console.log(error));


});

app.controller("linetimetableCtrl", function($scope, $routeParams, $http, dataProvider){

    $scope.line = $routeParams.line;
    $scope.currentCourse = 0;
    $scope.currentTimetable = 0;
    $scope.stopsClasses = [];
    $scope.contentLoaded = false;

    $http.get("data/mockdata/courses.json").then(function(courses){

        $scope.courses = courses.data;
        const id = $scope.courses[0].courseId;

        $http.get("data/mockdata/route1.json").then(function(route){
            $scope.route = route.data;

            angular.forEach($scope.route, function(){
                $scope.stopsClasses.push("regular");
            });

            $scope.$parent.map.drawStopsMarkers(route.data);
            $scope.$parent.map.drawRoute(route.data);
            $scope.contentLoaded = true;
        }).catch((error) => console.log(error));

    }).catch((error) => console.log(error));


    $scope.setCurrentCourse = function (index) {

        $scope.currentCourse = index;

        $scope.stopsClasses = [];

        const id = $scope.courses[$scope.currentCourse].courseId;
        const path = $scope.currentCourse === 0 ? "data/mockdata/route1.json" : "data/mockdata/route2.json"; //later replace with api address based on id
        $http.get(path).then(function(route){

            $scope.route = route.data;

            angular.forEach($scope.route, function(){
                $scope.stopsClasses.push("regular");
            });

            $scope.$parent.map.drawStopsMarkers(route.data);
            $scope.$parent.map.drawRoute(route.data);
            $scope.$parent.map.zoomInitial();
        });
    };

    $scope.displayTimetable = function (index) {

        for(let idx in $scope.stopsClasses){
            $scope.stopsClasses[idx] = "non-visible";
        }

        $scope.stopsClasses[index] = "active";

        $scope.currentStopIndex = index;

        $scope.$parent.map.zoomStop($scope.route[index].name, 18);


        /*
        Data for Api querry:

        const id = $scope.courses[$scope.currentCourse].courseId;
        const ordNumber = index + 1;
        */

        $http.get("data/mockdata/timetable.json").then(function(timetable){
            $scope.timetable = timetable.data;
            console.log($scope.timetable);
        }).catch(function(error){
            console.log(error);
        })

    };

    $scope.setCurrentTimetable = function(index){
        $scope.currentTimetable = index;
    };

    $scope.displayRoute = function(){

        for(let idx in $scope.stopsClasses){
            $scope.stopsClasses[idx] = "regular";
        }

        $scope.currentTimetable = 0;
        $scope.$parent.map.zoomInitial();
    };

});

app.controller("stoptimetableCtrl", function($scope, $routeParams, $filter, $q, dataProvider, $http){

    $scope.stop = $routeParams.stop.split("+").join(" ");
    $scope.currentPage = 0;
    $scope.contentLoaded = false;


    $http.get("data/mockdata/departures.json").then(function(response){

        $scope.contentLoaded = true;
        $scope.departures = response.data;
        console.log($scope.departures);

    }).catch((error) => console.log(error));

    $scope.$parent.map.zoomStop($scope.stop, 18);

    $scope.switchTimetablePage = function(step){
        $scope.currentPage += step;
    }



});