app.controller("pricesCtrl", function($scope, $http){

    $scope.currentTicketsType = 0;

    $http.get("data/jsondata/prices.json").then(function(response){
        $scope.pricetable = response.data;
    }).catch((error) => console.log(error));

    $scope.changeTicketsType = function (index) {
        $scope.currentTicketsType = index
    }

});