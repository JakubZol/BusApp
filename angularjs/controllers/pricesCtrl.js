app.controller("pricesCtrl", function($scope, $http, dataProvider){

    $scope.getPrices = function(url){
        dataProvider.getData(url).then(function(data){
            $scope.pricetable = data.data;
        }).catch(function(error){
            $scope.error = "ERROR " + error.status;
        });
    };

    $scope.getPrices("data/prices.json");

});