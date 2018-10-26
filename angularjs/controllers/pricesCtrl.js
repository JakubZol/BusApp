app.controller("pricesCtrl", function($scope, $http, dataProvider){

    $scope.currentTicketsType = 0;

    $scope.getPrices = function(url){
        dataProvider.getData(url).then(function(data){
            $scope.pricetable = data.data.pricetable;
            $scope.messages = data.data.messages;
        }).catch(function(error){
            $scope.error = "ERROR " + error.status;
        });
    };

    $scope.getPrices("data/prices.json");

    $scope.switchTicketsType = function(index){
        $scope.currentTicketsType = index;
    }
});