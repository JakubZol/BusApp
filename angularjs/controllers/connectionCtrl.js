app.controller("connectionCtrl", function($scope, $routeParams, timetablesService){

   $scope.start = $routeParams.start.split("+").join(" ");
   $scope.destination = $routeParams.destination.split("+").join(" ");
   $scope.hour = parseInt($routeParams.hour);
   $scope.minutes = parseInt($routeParams.minutes);
   $scope.date = new Date($routeParams.date);
   $scope.lines = $routeParams.lines.split("+");
   $scope.currentDate = new Date();

   $scope.params = {
        lines: $scope.lines,
        start: $scope.start,
        destination: $scope.destination,
        date: $scope.date,
        hour: $scope.hour,
        minutes: $scope.minutes
    };

   timetablesService.searchConnections($scope.params).then(function(data){
      $scope.connections = data;
      console.log(data);
   }).catch(function(error){
       console.log(error);
   });


});