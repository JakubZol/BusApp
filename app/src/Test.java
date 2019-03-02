

import java.util.*;


public class Test {
    public static void main(String[] args){

        Lines linesRepository = new Lines();
        Stops stopsRepository = new Stops();
        Timetable timetableRepository = new Timetable();
        Courses coursesRepository = new Courses();

        long startTime = System.currentTimeMillis();
        /*PUT OPERATION HERE*/

        ArrayList<Course> courses = coursesRepository.getCourseByLine("1");

        long stopTime = System.currentTimeMillis();


        System.out.println("Time: " + (stopTime - startTime) + " ms");
        for(Course c : courses){
            System.out.println(c.getCourseId() + " | " + c.getLine() + " | " + c.getStart() + " | " + c.getDestination());
        }
/*
        ArrayList<String> lines = linesRepository.getAllLines();

        ArrayList<Stop> stops = stopsRepository.getStopsByCourseId(8);

        LinkedHashMap<String, TreeMap<Integer, ArrayList<String>>> timetable = timetableRepository.getStopTimetable(28, 23);


        System.out.println(timetable.entrySet());

        System.out.println("Przystanki kursu 8:");
        for(Stop s: stops){
            System.out.println(s);
        }

        ArrayList<Departure> departures = timetableRepository.getDeparturesByStop("Okszów");
        System.out.println(departures.get(0).getDepartureTime());
*/



    }
}
