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

        let promises = [];

        for (let line of lines){
            promises.push(dataProvider.getData("data/timetable/newline" + line + ".json"));
        }

        $q.all(promises).then(function(data) {

            let responses = [];

            for(let response of data){
                responses.push(response.data)
            }

            console.log(responses);


            let connections = [];

            for(let line of responses){
                for(let route of line.routes){
                    let startIndex = route.stops.indexOf(route.stops.filter(stop => stop.name === $scope.start)[0]);
                    let destinationIndex = route.stops.indexOf(route.stops.filter(stop => stop.name === $scope.destination)[0]);
                    if(startIndex < destinationIndex && startIndex >= 0 && destinationIndex >= 0){
                            for(let entry of route.timetable[0].courses) { //add day index choice
                                if (entry[startIndex].hour === $scope.time.getHours() && entry[startIndex].minutes > $scope.time.getMinutes() || entry[startIndex].hour > $scope.time.getHours()) {
                                    connections.push({line: line.line, destination: route.destination, stops: route.stops.slice(startIndex, destinationIndex + 1),
                                        time: entry.slice(startIndex, destinationIndex + 1)});
                                }
                            }


                        //add next day searching and course time length
                    }
                }
            }

            console.log(connections);


        }).catch(function(error){
            console.log(error);
        });


    }

});