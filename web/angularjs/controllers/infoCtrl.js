app.controller("infoCtrl", function($scope, dataProvider, $filter){

    $scope.currentPageIndex = 0;

    $scope.articlesClasses = ["regular", "regular", "regular", "regular"];

    $scope.getNews = function(url){
        dataProvider.getData(url).then(function(data){
            $scope.news = $filter('sortByDate')(data.data).reverse();
            $scope.currentNewsPage = $scope.news.slice(0, 4);
        }).catch(function(error){

        });
    };


    $scope.getNews("data/news.json");

    $scope.switchPage = function(step){
        $scope.currentPageIndex += step;
        $scope.currentNewsPage = $scope.news.slice(4 * $scope.currentPageIndex, 4 * ($scope.currentPageIndex + 1));
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