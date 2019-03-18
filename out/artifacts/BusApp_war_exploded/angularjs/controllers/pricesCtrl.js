app.controller("pricesCtrl", function($scope, $http){

    $http.get("data/jsondata/prices.json").then(function(response){
        $scope.pricetable = response.data;
        console.log($scope.pricetable);
    }).catch((error) => console.log(error));


});