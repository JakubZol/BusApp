app.controller("searchCtrl", function($scope, dataProvider){

    $scope.destinationIsSet = false;
    $scope.startIsSet = false;
    $scope.date = new Date();
    $scope.time = new Date();

    $scope.currentTimeString = function(){
        const hour = new Date().getHours();
        let minutes = new Date().getMinutes();
        minutes = (minutes.toString().length === 1) ? '0' + minutes.toString() : minutes.toString();
        return hour + ":" + minutes;
    };

    console.log(new Date());

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
        console.log($scope.start);
        console.log($scope.destination);
        console.log($scope.time);
        console.log($scope.date);
    }

});