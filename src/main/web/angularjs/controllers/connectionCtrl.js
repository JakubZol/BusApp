app.controller("searchCtrl", function($scope, $http, $window){

    $scope.startIsSet = false;
    $scope.destinationIsSet = false;
    $scope.connectionsLoaded = false;
    $scope.currentCourse = -1;

    $http.get("data/mockdata/stopswithlines.json").then(function(response){
        $scope.stops = response.data;
    }).catch((error) => console.log(error));

    $scope.setStart = function(stop){
        $scope.startIsSet = true;
        $scope.start = stop;
    };

    $scope.unsetStart = function(){
        $scope.startIsSet = false;
    };

    $scope.setDestination = function(stop){
        $scope.destinationIsSet = true;
        $scope.destination = stop;
    };

    $scope.unsetDestination = function () {
        $scope.destinationIsSet = false;
    };


    $scope.submit = function () {

        if($scope.startIsSet && $scope.destinationIsSet) {

            const startData = $scope.stops.find(function (stop) {
                return stop.name === $scope.start;
            });

            const destinationData = $scope.stops.find(function (stop) {
                return stop.name = $scope.destination;
            });

            let lines = [];
            startData.lines.forEach(function (line) {
                if (destinationData.lines.includes(line)) {
                    lines.push(line);
                }
            });

            $http.get("data/mockdata/connections.json").then(function(response){
                $scope.connections = response.data;
                $scope.connectionsLoaded = true;
            }).catch((e) => console.log(e));
        }
    };

    $scope.expand = function(index){
        const connection = $scope.connections[index];
        let stops = [];
        connection.route.forEach(function(layover){
            stops.push(layover.stop);
        });

        $scope.$parent.map.resetStopsMarkers();
        $scope.$parent.map.drawRoute(stops);
        $scope.$parent.map.zoomInitial();

        $scope.currentCourse = index;
    }

    $scope.close = function(){
        $scope.currentCourse = -1;
        $scope.$parent.map.resetStopsMarkers();
        $scope.$parent.map.zoomInitial();

        console.log($scope.currentCourse);
    }


});

