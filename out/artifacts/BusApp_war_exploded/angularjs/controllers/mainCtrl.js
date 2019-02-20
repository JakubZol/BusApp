app.controller("mainCtrl", function($scope, $location){
    $scope.getClass = function(path) {

        const currentPath = $location.path();

        if (currentPath.substr(1, currentPath.length).indexOf("/") === -1) {
            if (currentPath.substr(0, currentPath.length) === path) {
                return "active"
            } else {
                return ""
            }
        }
        else {
            if (currentPath.substr(0, currentPath.substr(1, currentPath.length).indexOf("/") + 1) === path) {
                return "active"
            }
            else {
                return ""
            }
        }
    };

});