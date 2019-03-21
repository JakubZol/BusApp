app.filter("sortByLine", function(){
   return function(lines){
       return lines.sort(function(line1, line2){
          const chars1 = line1.split();
          const chars2 = line2.split();

          let numbersString1 = "";
          let charString1 = "";
          for(let char of chars1){
              if(!isNaN(parseInt(char))){
                  numbersString1 += char;
              } else{
                  charString1 = char;
                  break;
              }
          }

          let numbersString2 = "";
          let charString2 = "";
          for(let char of chars2){
              if(!isNaN(parseInt(char))){
                  numbersString2 += char;
              } else{
                  charString2 = char;
                  break;
              }
          }

          if(parseInt(numbersString1) > parseInt(numbersString2)){
              return 1;
          }
          else if(parseInt(numbersString2) > parseInt(numbersString1)){
              return -1
          }
          else{
              return charString1 > charString2 ? 1 : -1;
          }

       });
   }
});


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

