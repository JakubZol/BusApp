app.controller("searchCtrl", function($scope, dataProvider, $filter, $location){

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

    $scope.submitForm = function() {
        if($scope.startIsSet && $scope.destinationIsSet) {

            let startStops = $scope.stops.filter(entry => entry.stop === $scope.start);
            let destinationStops = $scope.stops.filter(entry => entry.stop === $scope.destination);

            let startLines = $filter('mergeLine')(startStops, $scope.start)[0].lines;
            let destinationLines = $filter('mergeLine')(destinationStops, $scope.destination)[0].lines;

            let lines = [];

            for (let line of destinationLines) {
                if (startLines.indexOf(line) >= 0) {
                    lines.push(line);
                }
            }

            if(lines.length > 0) {

                $location.url("/search/connection/from/" + $scope.start.split(" ").join("+") + "/to/" + $scope.destination.split(" ").join("+") + "/" + $scope.hour + "/" + $scope.minutes + "/" + $scope.date.toISOString()
                    + "/" + lines.join("+"));
            }
            else{
                console.log("NO CONNECTIONS!");
            }

        }
        else{
            console.log("wrong stops!");
        }
    };

});