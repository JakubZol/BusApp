app.controller("searchCtrl", function($scope, dataProvider, $q, $filter){

    $scope.destinationIsSet = false;
    $scope.startIsSet = false;
    $scope.date = new Date();
    $scope.hour = $scope.date.getHours();
    $scope.minutes = $scope.date.getMinutes();


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

        let promises = [];

        for (let line of lines){
            promises.push(dataProvider.getData("data/timetable/newline" + line + ".json"));
        }

        $q.all(promises).then(function(data) {

            let responses = [];

            for(let response of data){
                responses.push(response.data)
            }


            $scope.connections = [];
            const currentDayIndex = $scope.date.getDay();
            let weekendDay = currentDayIndex === 0 ? "Niedziela" : "Sobota";
            let currentDayName = currentDayIndex % 6 !== 0 ? "Dni powszednie" : weekendDay;

            for(let line of responses){
                for(let route of line.routes){
                    let startIndex = route.stops.indexOf(route.stops.filter(stop => stop.name === $scope.start)[0]);
                    let destinationIndex = route.stops.indexOf(route.stops.filter(stop => stop.name === $scope.destination)[0]);
                    if(startIndex < destinationIndex && startIndex >= 0 && destinationIndex >= 0)
                            if(route.timetable.length > 0) {
                                for (let entry of route.timetable.filter(entry => entry.period === currentDayName)[0].courses) {
                                    if (entry[startIndex].hour === $scope.hour && entry[startIndex].minutes > $scope.minutes || entry[startIndex].hour > $scope.hour) {

                                        let timeArray = entry.slice(startIndex, destinationIndex + 1);

                                        let timeLength = (timeArray[timeArray.length - 1].hour * 60 + timeArray[timeArray.length - 1].minutes) - (timeArray[0].hour * 60 + timeArray[0].minutes);

                                        $scope.connections.push({
                                            line: line.line,
                                            destination: route.destination,
                                            stops: route.stops.slice(startIndex, destinationIndex + 1),
                                            time: timeArray,
                                            length: timeLength
                                        });
                                    }
                                }
                            }


                        //add next day searching
                    }
                }

            $scope.connections = $filter("sortByDepartureTime")($scope.connections);//sort by departure time
            console.log($scope.connections);


        }).catch(function(error){
            console.log(error);
        });


    }

});