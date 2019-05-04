app.controller("mainCtrl", function($scope, $location, $rootScope, mapService, $http){


    $rootScope.$on("$locationChangeStart", function(event, next) {

        $scope.map.zoomInitial();
        if(next.indexOf("timetable/line") < 0) {
            $scope.map.resetStopsMarkers();
        }
    });


    $scope.map = mapService.createMap("map", {center: [51.133313, 23.472968], zoom: 15});


    $http.get("data/mockdata/stops.json").then(function(stops){

        $scope.map.drawStopsMarkers(stops.data);
        $scope.map.stops = stops.data;

    }).catch((error) => console.log(error));


    $scope.getClass = function(path) {

        const currentPath = $location.path();

        if (currentPath.substr(1, currentPath.length).indexOf("/") === -1) {
            return currentPath.substr(0, currentPath.length) === path ? "active" : "";
        }
        else {
            return currentPath.substr(0, currentPath.substr(1, currentPath.length).indexOf("/") + 1) === path ? "active" : "";
        }
    };

    $scope.handleError = function(e){
        const status = e.status;
        let error = {status: status};

        if(status === 404){
            error.message = "Nie odnaleziono poszukiwanej treści!";
        }
        else if(status === 501){
            error.message = "Wystąpił nieoczekiwany błąd serwera! Przepraszamy za utrudnienia.";
        }
        else{
            error.message = "Niezidentyfikowany błąd, przepraszamy za utrudnienia. :("
        }

        return error;
    }

});