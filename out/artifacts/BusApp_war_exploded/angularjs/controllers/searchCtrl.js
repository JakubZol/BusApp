app.controller("searchCtrl", function($scope, $http){

    $http.get("data/mockdata/stopswithlines.json").then(function(response){
        $scope.stops = response.data;
    }).catch((error) => console.log(error));

    //TO DO

});