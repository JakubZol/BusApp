import java.sql.ResultSet;
import java.util.*;


public class Test {
    public static void main(String[] args){

        Lines linesRepository = new Lines();
        Stops stopsRepository = new Stops();
        Timetable timetableRepository = new Timetable();

        long startTime = System.currentTimeMillis();
        /*PUT OPERATION HERE*/
        LinkedHashMap<String, TreeMap<Integer, ArrayList<String>>> timetable = timetableRepository.getStopTimetable(7, "Szpital");

        long stopTime = System.currentTimeMillis();

        System.out.println("Time: " + (stopTime - startTime) + " ms");

        Integer lastHour = timetable.get("Dni powszednie").lastKey();
        System.out.println(timetable.get("Dni powszednie").get(lastHour));
/*
        ArrayList<String> lines = linesRepository.getAllLines();

        ArrayList<Stop> stops = stopsRepository.getStopsByCourseId(8);

        System.out.println("Przystanki kursu 8:");
        for(Stop s: stops){
            System.out.println(s);
        }

        ArrayList<Departure> departures = timetableRepository.getDeparturesByStop("Okszów");
        System.out.println(departures.get(0).getDepartureTime());
*/



    }
}
