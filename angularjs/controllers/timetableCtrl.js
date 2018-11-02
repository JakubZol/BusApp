app.controller("timetableCtrl", function($scope, $http, dataProvider, $rootScope){

    $scope.getTimetable = function(url){ //wystarczą tylko linie z oddzielnego pliku
        dataProvider.getData(url).then(function(data){
            $scope.lines = data.data.lines;
        }).catch(function(error){
            $scope.error = "ERROR " + error.status;
        });
    };

    $scope.getBusStops = function(url){
        dataProvider.getData(url).then(function(data){
            $scope.stops = data.data;
        }).catch(function (error){
            $scope.error = "ERROR " + error.status;
        });
    };

    $scope.getTimetable("data/lines.json");
    $scope.getBusStops("data/bus-stops.json");

});

app.controller("linetimetableCtrl", function($scope, $routeParams, dataProvider, $timeout){

    $scope.line = $routeParams.line;
    $scope.currentCourse = 0;
    $scope.currentTimetable = 0;
    $scope.stopsClasses = [];
    $scope.contentLoaded = false;


    $scope.getTimetable = function(url){
        dataProvider.getData(url).then(function(data){ //wybrać odpowiedni plik
            $scope.courses = data.data;
            angular.forEach($scope.courses[0].route, function(){
                $scope.stopsClasses.push("regular");
            });
            $scope.contentLoaded = true;
        }).catch(function(error){
            
        });
    };

    $scope.getTimetable("data/timetable/line" + $scope.line + ".json");


    $scope.setCurrentCourse = function (index) {

        $scope.currentCourse = index;

        for(let idx in $scope.courses[$scope.currentCourse].route){
            $scope.stopsClasses[parseInt(idx)] = "regular";
        }

        $scope.currentTimetable = 0;
    };

    $scope.displayTimetable = function (index) {

        for(let idx in $scope.stopsClasses){
            $scope.stopsClasses[idx] = "non-visible";
        }

        $scope.stopsClasses[index] = "active";
    };

    $scope.displayRoute = function(){

        for(let idx in $scope.stopsClasses){
            $scope.stopsClasses[idx] = "regular";
        }

        $scope.currentTimetable = 0;
    };

    $scope.setTimetable = function(index){
        $scope.currentTimetable = index;
    }


});

app.controller("stoptimetableCtrl", function($scope, $routeParams, $filter, $q, dataProvider){

    $scope.stop = $routeParams.stop.split("+").join(" ");
    $scope.currentTimetablePage = 0;
    $scope.contentLoaded = false;


    $scope.timeFromNow = function(hour, minutes){
        const d = new Date();
        const currentHour = d.getHours();
        const currentMinutes = d.getMinutes();

        if(currentHour === hour){
            return minutes - currentMinutes;
        }
        else {
            return 60 - currentMinutes + (hour - currentHour - 1) * 60 + minutes;
        }
    };


    $scope.getLine = function(url) {
        dataProvider.getData(url).then(function (data) {

            const stops = data.data.filter(stop => stop.stop === $scope.stop);
            let stopsIds = [];
            for (let stop of stops) {
                if (stopsIds.indexOf(stop.id) < 0) {
                    stopsIds.push(stop.id);
                }
            }

            stopsIds.sort();
            const minId = stopsIds[0];
            const lines = $filter('mergeLine')(stops, $scope.stop)[0].lines;

            let promises = [];

            angular.forEach(lines, function (line) {
                promises.push(dataProvider.getData("data/timetable/line" + line + ".json"));
            });

            $q.all(promises).then(function (data) {
                let coursesList = [];
                angular.forEach(data, function (line) {
                    coursesList.push(line.data);
                });

                const d = new Date();
                const currentHour = d.getHours();
                const currentMinutes = d.getMinutes();
                const currentDay = d.getDay();
                $scope.timetable = [];


                for (let hour = currentHour; hour < 24; hour++) {
                    for (let courses of coursesList) {
                        for (let course of courses) {

                            let stops = course.route.filter(stop => stop.stop === $scope.stop);

                            if (stops.length > 0) {
                                for (stop of stops) {

                                    let time = stop.timetable.filter(x => x.hour === hour);

                                    if (time.length > 0) {

                                        let weekendDay = (currentDay === 0) ? "Niedziela" : "Sobota";
                                        let searchedEntry = time[0].minutes.filter(entry => entry.period === weekendDay)[0];
                                        let weekendIndex = time[0].minutes.indexOf(searchedEntry);
                                        let week = 0;
                                        let periodIndex = (currentDay % 6 === 0) ? weekendIndex : week;

                                        if (periodIndex >= 0 && periodIndex < time[0].minutes.length) {

                                            let mins = time[0].minutes[periodIndex].values;

                                            for (let min of mins) {
                                                if (hour === currentHour && min > currentMinutes || hour > currentHour) {
                                                    $scope.timetable.push({
                                                        line: course.line,
                                                        destination: course.destination,
                                                        time: {hour: hour, minutes: min},
                                                        stopId: stop.id - minId + 1
                                                    });
                                                }
                                            }
                                        }
                                    }

                                }
                            }
                        }

                    }

                    if ($scope.timetable.length >= 20) {
                        break;
                    }
                }

                $scope.timetable = $filter("sortByTime")($scope.timetable).slice(0, 20);

                $scope.currentTimetable = $scope.timetable.slice(0, 10);

                $scope.contentLoaded = true;

            }).catch(function (error) {

            });
        }).catch(function (error) {

        });
    }

    $scope.getLine("data/bus-stops.json");

    $scope.switchTimetablePage = function(step){
        $scope.currentTimetablePage += step;
        $scope.currentTimetable = $scope.timetable.slice($scope.currentTimetablePage * 10 , ($scope.currentTimetablePage + 1) * 10);
    }



});