app.controller("searchCtrl", function($scope, dataProvider){

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
        //console.log($scope.start);
        //console.log($scope.destination);
        //console.log($scope.time.getHours() + ":" + $scope.time.getMinutes());
        //console.log($scope.date);

        let searchedStops = [];

        for (stop of $scope.stops){
            if(stop.stop === $scope.start || stop.stop === $scope.destination){
                searchedStops.push(stop);
            }
        }

        searchedStops.sort(function(a, b){
                return b.lines.length - a.lines.length;
            });

        console.log(searchedStops);
    }

});