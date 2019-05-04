app.controller("searchCtrl", function($scope, $http){

    $scope.startIsSet = false;
    $scope.destinationIsSet = false;
    $scope.connectionsLoaded = false;
    $scope.currentCourse = -1;
    $scope.currentPage = 0;
    $scope.today = new Date();
    $scope.hour = $scope.today.getHours();
    $scope.minutes = $scope.today.getMinutes();
    $scope.date = $scope.today;
    $scope.errorIsSet = false;

    $http.get("data/mockdata/stopswithlines.json").then(function(response){
        $scope.stops = response.data;
    }).catch(function(error){
        $scope.error = $scope.$parent.handleError(error);
        $scope.errorIsSet = true;
    });

    $scope.verifyStart = function(){

        let findStart = function(elem){
            return elem.name === $scope.start
        };

        $scope.startIsSet = $scope.stops.filter(findStart).length > 0;
    };

    $scope.verifyDestination = function () {
        let findDestination = function(elem){
            return elem.name === $scope.destination
        };

        $scope.destinationIsSet = $scope.stops.filter(findDestination).length > 0;
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

            $scope.currentCourse = -1;
            $scope.currentPage = 0;
            $scope.$parent.map.resetStopsMarkers();
            $scope.$parent.map.zoomInitial();

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

    };

    $scope.close = function(){
        $scope.currentCourse = -1;
        $scope.$parent.map.resetStopsMarkers();
        $scope.$parent.map.zoomInitial();

    };

    $scope.switchPage = function(step){
        $scope.currentPage += step;
    };


});

