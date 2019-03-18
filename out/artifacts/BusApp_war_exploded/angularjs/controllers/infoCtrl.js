app.controller("infoCtrl", function($scope, $http){

    $scope.currentPage = 0;

    $scope.articlesClasses = ["regular", "regular", "regular", "regular"];

    $http.get("data/jsondata/news.json").then(function(response){
        $scope.news = response.data;
    }).catch((error) => console.log(error));



    $scope.switchPage = function(step){

        $scope.currentPage += step;
        $scope.articlesClasses = ["regular", "regular", "regular", "regular"];

    };

    $scope.extendArticle = function(index) {

        for(let classIndex in $scope.articlesClasses) {
            let class1 = ($scope.articlesClasses[index] === "extended") ? "regular" : "extended";
            let class2 = ($scope.articlesClasses[parseInt(classIndex)] === "narrowed") ? "regular" : "narrowed";
            $scope.articlesClasses[classIndex] = (index === parseInt(classIndex)) ? class1 : class2;
        }
    };

});