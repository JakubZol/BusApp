app.controller("searchCtrl", function($scope, dataProvider, $q){

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

        let startStops = [];
        let destinationStops = [];

        for (stop of $scope.stops){
            if(stop.stop === $scope.start ){
                startStops.push(stop);
            }
            else if( stop.stop === $scope.destination){
                destinationStops.push(stop);
            }
        }

        let lines = [];

        for(sstop of startStops){
            for(line of sstop.lines) {
                for (dstop of destinationStops) {
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

        $q.all(promises).then(function(data){
            let timetables = [];
            angular.forEach(data, function(response){
                timetables.push(response.data)
            });
            console.log(timetables);
        }).catch(function(error){
            console.log(error);
        });



    }

});