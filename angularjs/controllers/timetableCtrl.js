app.controller("timetableCtrl", function($scope, $http, dataProvider){

    $scope.getTimetable = function(url){
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

app.controller("linetimetableCtrl", function($scope, $routeParams, dataProvider){

    $scope.line = $routeParams.line;
    $scope.currentCourse = 0;
    $scope.stopsClasses = [];
    $scope.contentLoaded = false;
    $scope.checkError = false;


    $scope.getTimetable = function(url){
        dataProvider.getData(url).then(function(data){
            $scope.lineTimetable = data.data;

            angular.forEach($scope.lineTimetable.routes[0].stops, function(){
                $scope.stopsClasses.push("regular");
            });

            $scope.contentLoaded = true;
        }).catch(function(error){ //TO DO
            $scope.checkError = true;
            $scope.error = error;
            //console.log(error);
        });
    };

    $scope.getTimetable("data/timetable/newline" + $scope.line + ".json");


    $scope.setCurrentCourse = function (index) {

        $scope.currentCourse = index;

        $scope.stopsClasses = [];

        angular.forEach($scope.lineTimetable.routes[$scope.currentCourse].stops, function(){
            $scope.stopsClasses.push("regular");
        });
    };

    $scope.displayTimetable = function (index) {

        for(let idx in $scope.stopsClasses){
            $scope.stopsClasses[idx] = "non-visible";
        }

        $scope.stopsClasses[index] = "active";

        $scope.currentStopIndex = index;

        $scope.buildTimetable(0, index);

    };

    $scope.buildTimetable = function(timetableIndex, stopIndex){

        $scope.currentTimetableIndex = timetableIndex;

        $scope.currentTimetable = [];

        for(let time of $scope.lineTimetable.routes[$scope.currentCourse].timetable[timetableIndex].courses){
            let x = $scope.currentTimetable.filter(obj => obj.hour === time[stopIndex].hour);

            if(x.length === 0){
                $scope.currentTimetable.push({hour: time[stopIndex].hour, minutes: [time[stopIndex].minutes]});
            }
            else{
                let idx = $scope.currentTimetable.indexOf(x[0]);
                $scope.currentTimetable[idx].minutes.push(time[stopIndex].minutes);
            }
        }
    };

    $scope.displayRoute = function(){

        for(let idx in $scope.stopsClasses){
            $scope.stopsClasses[idx] = "regular";
        }

        $scope.currentTimetableIndex = 0;
    };

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

            const minId = stopsIds.sort()[0];
            const lines = $filter('mergeLine')(stops, $scope.stop)[0].lines;

            let promises = [];

            for(let line of lines) {
                promises.push(dataProvider.getData("data/timetable/newline" + line + ".json"));
            }

            $q.all(promises).then(function (data) {
                let responses = [];
                for(let response of data){
                    responses.push(response.data);
                }

                const d = new Date();
                const currentHour = d.getHours();
                const currentMinutes = d.getMinutes();
                const currentDayIndex = d.getDay();
                $scope.timetable = [];

                let weekendDay = currentDayIndex === 0 ? "Niedziela" : "Sobota";
                let currentDayName = currentDayIndex % 6 !== 0 ? "Dni powszednie" : weekendDay;


                for(let line of responses) {
                    for (let route of line.routes) {
                        console.log($scope.stop);
                        console.log(route.stops);
                        let searchedStops = route.stops.filter(stop => stop.name === $scope.stop);
                        console.log(searchedStops);
                        for (let sstop of searchedStops){
                            let stopIndex = route.stops.indexOf(sstop);
                            if (route.timetable.length > 0 && stopIndex > -1) {
                                for (let entry of route.timetable.filter(entry => entry.period === currentDayName)[0].courses) {
                                    console.log(stopIndex);
                                    if (entry[stopIndex].hour === currentHour && entry[stopIndex].minutes > currentMinutes || entry[stopIndex].hour > currentHour) {
                                        $scope.timetable.push({line: line.line, destination: route.destination, time: entry[stopIndex], stopId: route.stops[stopIndex].id - minId + 1})
                                    }
                                }
                            }
                        }
                    }
                }

                $scope.timetable = $filter("sortByTime")($scope.timetable).slice(0, 20);

                $scope.currentTimetable = $scope.timetable.slice(0, 10);

                $scope.contentLoaded = true;

            }).catch(function (error) {
                console.log(error);
            });
        }).catch(function (error) {
            console.log(error);
        });
    };

    $scope.getLine("data/bus-stops.json");

    $scope.switchTimetablePage = function(step){
        $scope.currentTimetablePage += step;
        $scope.currentTimetable = $scope.timetable.slice($scope.currentTimetablePage * 10 , ($scope.currentTimetablePage + 1) * 10);
    }



});