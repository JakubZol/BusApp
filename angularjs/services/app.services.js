app.service("dataProvider", function($http){
   this.getData = function(url){
       return $http.get(url);
    }
});