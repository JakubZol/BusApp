app.service("dataProvider", function($http){
   this.getData = function(url){
       return $http.get(url);
    }
});

app.service("timetablesService", function(dataProvider, $q, $filter){

    this.buildTimetable = function(line){
        //??
    };

    this.searchConnections = function(params){

        const currentDayIndex = params.date.getDay();
        const currentHour = params.hour;
        const currentMinutes = params.minutes;
        const start = params.start;
        const destination = params.destination;
        let deferred = $q.defer();
        let promises = [];

        for(line of params.lines){
            promises.push(dataProvider.getData("data/timetable/newline" + line + ".json"));
        }

        $q.all(promises).then(function(data) {

            let responses = [];

            for (let response of data) {
                responses.push(response.data)
            }

            let connections = [];
            let weekendDay = currentDayIndex === 0 ? "Niedziela" : "Sobota";
            let currentDayName = currentDayIndex % 6 !== 0 ? "Dni powszednie" : weekendDay;

            for(let line of responses){
                for(let route of line.routes){
                    let startIndex = route.stops.indexOf(route.stops.filter(stop => stop.name === start)[0]);
                    let destinationIndex = route.stops.indexOf(route.stops.filter(stop => stop.name === destination)[0]); //rozw problem wielokrotnego występowania
                    if(startIndex < destinationIndex && startIndex >= 0 && destinationIndex >= 0)
                        if(route.timetable.length > 0) {
                            for (let entry of route.timetable.filter(entry => entry.period === currentDayName)[0].courses) {
                                if (entry[startIndex].hour === currentHour && entry[startIndex].minutes > currentMinutes || entry[startIndex].hour > currentHour) {

                                    let timeArray = entry.slice(startIndex, destinationIndex + 1);

                                    let timeLength = (timeArray[timeArray.length - 1].hour * 60 + timeArray[timeArray.length - 1].minutes) - (timeArray[0].hour * 60 + timeArray[0].minutes);

                                    connections.push({
                                        line: line.line,
                                        destination: route.destination,
                                        stops: route.stops.slice(startIndex, destinationIndex + 1),
                                        time: timeArray,
                                        courseLength: timeLength
                                    });
                                }
                            }
                        }


                    //add next day searching
                }
            }

            deferred.resolve($filter("sortByDepartureTime")(connections));

        }).catch(function(error){
           deferred.reject(error);
        });

        return deferred.promise;
    }

});