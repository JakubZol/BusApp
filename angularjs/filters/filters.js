
app.filter("mergeLine", function(){
    return function(stopsList, searchedStop) {
        if (angular.isUndefined(searchedStop) || searchedStop.length === 0 ) {
            return []
        }
        else {
            const filteredList = stopsList.filter(stop => stop.stop.toLowerCase().indexOf(searchedStop.toLowerCase()) >= 0);
            let output = [];
            angular.forEach(filteredList, function (obj) {
                if (output.filter(el => el.stop === obj.stop).length > 0) {
                    const idx = output.findIndex(el => el.stop === obj.stop);
                    angular.forEach(obj.lines, function (line) {
                        if (output[idx].lines.indexOf(line) < 0) {
                            output[idx].lines.push(line);
                        }
                    });
                }
                else {
                    output.push(obj);
                }

            });
            return output.slice(0, 5);
        }
    }
});

app.filter("reduceTimetable", function(){
    return function(timetable, currentIdx){
        const firstHour = timetable.filter(line => (line.minutes[currentIdx].values.length > 0))[0].hour;
        const len = timetable.filter(line => (line.minutes[currentIdx].values.length > 0)).length;
        const lastHour = timetable.filter(line => (line.minutes[currentIdx].values.length > 0))[len - 1].hour;

        return timetable.filter(line => (line.hour >= firstHour && line.hour <= lastHour && line.minutes[currentIdx].values.length > 0));
    }
});

app.filter("sortByDate", function(){
    return function(array){
        return array.sort(function(a, b){
            if(a.date.year < b.date.year){
                return -1;
            }
            else if(a.date.year > b.date.year){
                return 1;
            }
            else{
                if(a.date.month < b.date.month){
                    return -1;
                }
                else if(a.date.month > b.date.month){
                    return 1;
                }
                else{
                    if(a.date.day < b.date.day){
                        return -1;
                    }
                    else{
                        return 1;
                    }
                }
            }
        });
    }
});

app.filter("sortByTime", function(){
   return function(array){
       return array.sort(function(a, b){
           if(a.time.hour < b.time.hour){
               return -1;
           }
           else if(a.time.hour > b.time.hour){
               return 1;
           } else{
               if(a.time.minutes < b.time.minutes){
                   return -1;
               }
               else{
                   return 1;
               }
           }
       });
   }
});

app.filter("floor", function(){
    return function(number){
        return Math.floor(number);
    }
});

app.filter("sortByDepartureTime", function() {
    return function (array){
        return array.sort(function (a, b) {
            if (a.time[0].hour < b.time[0].hour) {
                return -1;
            }
            else if (a.time[0].hour > b.time[0].hour) {
                return 1;
            } else {
                if (a.time[0].minutes < b.time[0].minutes) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
        });
    }
});