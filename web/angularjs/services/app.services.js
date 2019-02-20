app.service("dataProvider", function($http){
   this.getData = function(url){
       return $http.get(url);
    }
});

app.service("timeService", function(){

    this.timeDifference = function(hour1, minutes1, hour2, minutes2){
       let timeDiff = hour1 * 60 + minutes1 - (hour2 * 60 + minutes2);
       return (timeDiff >= 0) ? timeDiff : 24*60 + timeDiff;
   };

   this.timeFromNow = function(hour1, minutes1){
        const d = new Date();
       return this.timeDifference(hour1, minutes1, d.getHours(), d.getMinutes())
   }

});

app.service("timetablesService", function(dataProvider, $q, $filter){

    this.buildTimetable = function(stop, stops){

        let deferred = $q.defer();

            const lines = $filter('mergeLine')(stops, stop)[0].lines;

            let promises = [dataProvider.getData("data/bus-stops.json")];

            for(let line of lines) {
                promises.push(dataProvider.getData("data/timetable/newline" + line + ".json"));
            }

            $q.all(promises).then(function (data) {
                let responses = [];
                for(let response of data){
                    responses.push(response.data);
                }

                const d = new Date();
                const currentHour = d.getHours();
                const currentMinutes = d.getMinutes();
                const currentDayIndex = d.getDay();
                let timetable = [];

                let weekendDay = currentDayIndex === 0 ? "Niedziela" : "Sobota";
                let currentDayName = currentDayIndex % 6 !== 0 ? "Dni powszednie" : weekendDay;

                let nextDayIndex = (currentDayIndex !== 6) ? currentDayIndex + 1 : 0;
                let nextWeekendDay = nextDayIndex === 0 ? "Niedziela" : "Sobota";
                let nextDayName = nextDayIndex % 6 !== 0 ? "Dni powszednie" : nextWeekendDay;


                for(let line of responses) {
                    for (let route of line.routes) {
                        let searchedStops = route.stops.filter(stop => stop.name === stop);
                        for (let stop of searchedStops){
                            let stopIndex = route.stops.indexOf(stop);
                            if (route.timetable.length > 0 && stopIndex > -1){// && route.timetable.filter(entry => entry.period === currentDayName).length > 0) {
                                let currentDayCourses = route.timetable.filter(entry => entry.period === currentDayName);
                                let nextDayCourses = route.timetable.filter(entry => entry.period === nextDayName);
                                if(currentDayCourses.length > 0) {
                                    for (let entry of currentDayCourses[0].courses) {
                                        if (entry[stopIndex].hour === currentHour && entry[stopIndex].minutes > currentMinutes || entry[stopIndex].hour > currentHour) {
                                            let timeDiff = (entry[stopIndex].hour * 60 + entry[stopIndex].minutes) - (currentHour * 60 + currentMinutes);
                                            timetable.push({
                                                line: line.line,
                                                destination: route.destination,
                                                time: entry[stopIndex],
                                                stopId: route.stops[stopIndex].number,
                                                timeFromNow: timeDiff,
                                                date: d
                                            })
                                        }
                                    }
                                }
                                if(nextDayCourses.length > 0) {
                                    for (let entry of nextDayCourses[0].courses) {
                                        if (entry[stopIndex].hour === currentHour && entry[stopIndex].minutes < currentMinutes || entry[stopIndex].hour < currentHour) {
                                            let timeDiff = 24 * 60 + (entry[stopIndex].hour * 60 + entry[stopIndex].minutes) - (currentHour * 60 + currentMinutes);
                                            timetable.push({
                                                line: line.line,
                                                destination: route.destination,
                                                time: entry[stopIndex],
                                                stopId: route.stops[stopIndex].number,
                                                timeFromNow: timeDiff,
                                                date: new Date(new Date().setDate(d.getDate() + 1))
                                            })
                                        }

                                    }
                                }

                            }
                        }
                    }
                }

                deferred.resolve($filter("sortByTime")($scope.timetable).slice(0, 20));

            }).catch(function (error) {
                deferred.reject(error);
            });

        return deferred.promise;

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
            //let nextDayName = ((currentDayIndex === 6) ? 0 : currentDayIndex + 1) % 6 !== 0 ? "Dni powszednie" : weekendDay;

            for(let line of responses){
                for(let route of line.routes){
                    let startStops = route.stops.filter(stop => stop.name === start);
                    let destinationStops = route.stops.filter(stop => stop.name === destination);
                    let startIndex = route.stops.indexOf(startStops[0]);
                    let destinationIndex = route.stops.indexOf(destinationStops[0]); //rozw problem wielokrotnego występowania
                    if(startIndex < destinationIndex && startIndex >= 0 && destinationIndex >= 0)
                        if(route.timetable.length > 0) {
                            for (let entry of route.timetable.filter(entry => entry.period === currentDayName)[0].courses) {

                                let timeArray = entry.slice(startIndex, destinationIndex + 1);

                                let timeLength = (timeArray[timeArray.length - 1].hour * 60 + timeArray[timeArray.length - 1].minutes) - (timeArray[0].hour * 60 + timeArray[0].minutes);

                                connections.push({
                                    line: line.line,
                                    destination: route.destination,
                                    stops: route.stops.slice(startIndex, destinationIndex + 1),
                                    time: timeArray,
                                    courseLength: timeLength,
                                    date: (timeArray[0].hour === params.hour && timeArray[0].minutes > params.minutes || timeArray[0].hour > params.hour) ? params.date : new Date(new Date().setDate(params.date.getDate() + 1))
                                }); //działa tylko na tygodniu ( od piątku do niedzieli nie działa)

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