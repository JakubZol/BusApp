import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.TimeZone;


public class Test {
    public static void main(String[] args){

        Lines linesRepository = new Lines();
        Stops stopsRepository = new Stops();
        Timetable timetableRepository = new Timetable();

        long startTime = System.currentTimeMillis();
        /*PUT OPERATION HERE*/
        ArrayList<Stop> stops = stopsRepository.getStopsByCourseId(8);

        System.out.println("Przystanki kursu 8:");
        for(Stop s: stops){
            System.out.println(s);
        }

        long stopTime = System.currentTimeMillis();

        System.out.println("Time: " + (stopTime - startTime) + " ms");
/*
        ArrayList<String> lines = linesRepository.getAllLines();


        ArrayList<Departure> departures = timetableRepository.getDeparturesByStop("Okszów");
        System.out.println(departures.get(0).getDepartureTime());
*/
    }
}
