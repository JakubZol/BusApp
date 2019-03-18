
app.filter("mergeLine", function(){
    return function(stops, searchedStop) {
        if (angular.isUndefined(searchedStop) || searchedStop.length === 0 ) {
            return []
        }
        else {
            const filteredList = stops.filter(stop => stop.name.toLowerCase().indexOf(searchedStop.toLowerCase()) >= 0);
            return filteredList.slice(0, 5);
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
           if(a.date.getDate() === b.date.getDate()) {
               if (a.time.hour < b.time.hour) {
                   return -1;
               }
               else if (a.time.hour > b.time.hour) {
                   return 1;
               } else {
                   if (a.time.minutes < b.time.minutes) {
                       return -1;
                   }
                   else {
                       return 1;
                   }
               }
           }
           else{
               if (a.date < b.date) {
                   return -1;
               }
               else {
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
            if(a.date.getDate() === b.date.getDate()) {
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
            }
            else{
                if (a.date < b.date) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
        });
    }
});