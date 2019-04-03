app.controller("timetablemainCtrl", function($scope, $http, $q){

    $q.all([$http.get("data/mockdata/lines.json"), $http.get("data/mockdata/stopswithlines.json")]).then(function(response){
        $scope.lines = response[0].data;
        $scope.stops = response[1].data;
    }).catch((error) => console.log(error));

});


app.controller("coursesCtrl", function($scope, $routeParams, $http){

    $scope.line = $routeParams.line;
    $scope.currentCourse = 0;
    $scope.contentLoaded = false;

    $http.get("data/mockdata/courses.json").then(function(courses){

        $scope.courses = courses.data;
        $scope.courseId = $scope.courses[0].courseId;

        $http.get("data/mockdata/route1.json").then(function(route){

            $scope.route = route.data;

            $scope.$parent.map.resetStopsMarkers();
            $scope.$parent.map.drawRoute(route.data);
            $scope.contentLoaded = true;

        }).catch((error) => console.log(error));

    }).catch((error) => console.log(error));


    $scope.setCurrentCourse = function (index) {

        $scope.currentCourse = index;
        $scope.courseId = $scope.courses[$scope.currentCourse].courseId;

        const courseNumber = Math.floor(Math.random() * 3) + 1;
        const path = "data/mockdata/route" + courseNumber + ".json"; // replace with api address based on id

        $http.get(path).then(function(route){

            $scope.route = route.data;

            $scope.$parent.map.resetStopsMarkers();
            $scope.$parent.map.drawRoute(route.data);
            $scope.$parent.map.zoomInitial();
        });
    };

});


app.controller("timetableCtrl", function($scope, $routeParams, $http){

    //Data for API request
    $scope.courseId = $routeParams.courseId;
    $scope.order = $routeParams.order;

    $scope.stop = $routeParams.stop.split("+").join(" ");
    $scope.line = $routeParams.line;
    $scope.timetableIndex = 0;

    $scope.$parent.map.zoomStop($scope.stop, 18);

    $http.get("data/mockdata/timetable.json").then(function(timetable){

        $scope.timetable = timetable.data;

    }).catch((error) => console.log(error));

    $scope.switchTimetable = function(index){
        $scope.timetableIndex = index;
    }


});


app.controller("departuresCtrl", function($scope, $routeParams, $http){

    $scope.stop = $routeParams.stop.split("+").join(" ");
    $scope.currentPage = 0;
    $scope.stopIndexes = {};
    $scope.contentLoaded = false;


    $http.get("data/mockdata/departures.json").then(function(response){

        $scope.departures = response.data;

        let idx = 1;
        for(let d of $scope.departures){
            if(angular.isUndefined($scope.stopIndexes[d.stop.stop_id])){
                $scope.stopIndexes[d.stop.stop_id] = idx;
                idx += 1;
            }
        }

        $scope.contentLoaded = true;

    }).catch((error) => console.log(error));


    $scope.$parent.map.zoomStop($scope.stop, 18);


    $scope.switchTimetablePage = function(step){
        $scope.currentPage += step;
    }



});