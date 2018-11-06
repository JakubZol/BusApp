app.controller("searchCtrl", function($scope, dataProvider, $q, $filter){

    $scope.destinationIsSet = false;
    $scope.startIsSet = false;
    $scope.date = new Date();


    $scope.currentTime = function(){
        const d = new Date();
        const year = d.getFullYear();
        const month = d.getMonth();
        const day = d.getDay();
        const hour = d.getHours();
        const minutes = d.getMinutes();
        return new Date(year, month, day, hour, minutes);
    };


    $scope.time = $scope.currentTime();


    $scope.getBusStops = function(url){
        dataProvider.getData(url).then(function(data){
            $scope.stops = data.data;
        }).catch(function (error){
            $scope.error = "ERROR " + error.status;
        });
    };

    $scope.getBusStops("data/bus-stops.json");

    $scope.setStartStop = function(stop){
        $scope.start = stop;
        $scope.startIsSet = true;
    };

    $scope.setDestinationStop = function(stop){
        $scope.destination = stop;
        $scope.destinationIsSet = true;
    };

    $scope.unlockStartInput = function () {
        $scope.startIsSet = false;
    };

    $scope.unlockDestinationInput = function(){
        $scope.destinationIsSet = false;
    };

    $scope.searchConnection = function(){

        let startStops = $scope.stops.filter(entry => entry.stop === $scope.start);
        let destinationStops = $scope.stops.filter(entry => entry.stop === $scope.destination);

        let startLines = $filter('mergeLine')(startStops, $scope.start)[0].lines;
        let destinationLines= $filter('mergeLine')(destinationStops, $scope.destination)[0].lines;

        let lines = [];

        for(let line of destinationLines){
            if(startLines.indexOf(line) >= 0){
                lines.push(line);
            }
        }

        console.log(lines);


        /*
        let lines = [];

        for(let sstop of startStops){
            for(let line of sstop.lines) {
                for (let dstop of destinationStops) {
                    if (dstop.lines.indexOf(line) >= 0 && lines.indexOf(line) < 0) {
                        lines.push(line);
                    }
                }
            }

        }

        let promises = [];

        for (line of lines){
            promises.push(dataProvider.getData("data/timetable/line" + line + ".json"));
        }

        $q.all(promises).then(function(data) {
            let timetables = [];
            angular.forEach(data, function (response) {
                timetables.push(response.data)
            });


            let connections = [];


            for (let line of timetables) {
                for (let course of line) {
                    let startIndex = -1;
                    let destinationIndex = -1;
                    for (let index in course.route) {
                        if (course.route[index].stop === $scope.start) {
                            startIndex = parseInt(index);
                        }
                        if (course.route[index].stop === $scope.destination) {
                            destinationIndex = parseInt(index);
                            if (startIndex >= 0) {
                                break;
                            }
                        }

                    }
                    if (startIndex < destinationIndex && startIndex >= 0 && destinationIndex > 0) {
                        connections.push({
                            route: (course.route.slice(startIndex, destinationIndex + 1)),
                            destination: course.destination,
                            line: course.line
                        });
                    }
                }
            }

            console.log(connections);

            /*
            let initialDay = $scope.date.getDay();
            let initialHour = $scope.time.getHours();
            let initialMinutes = $scope.time.getMinutes();

            let hour = initialHour;
            let day = initialDay;
            let array = [];
            let currentIndex = 0;



        }).catch(function(error){
            console.log(error);
        });

*/

    }

});