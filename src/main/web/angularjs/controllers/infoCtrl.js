app.controller("infoCtrl", function($scope, $http){


    $scope.currentPage = 0;
    $scope.extendedArticleIndex = -1;


    $http.get("data/jsondata/news.json").then(function(response){
        $scope.news = response.data;
    }).catch((error) => console.log(error));


    $scope.switchPage = function(step){

        $scope.currentPage += step;
        $scope.extendedArticleIndex = -1;

    };

    $scope.extendArticle = function(index) {

        $scope.extendedArticleIndex = $scope.extendedArticleIndex === index ? -1 : index;

    };

});