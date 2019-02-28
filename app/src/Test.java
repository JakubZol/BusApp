import java.sql.ResultSet;
import java.util.ArrayList;


public class Test {
    public static void main(String[] args){

        Lines linesRepository = new Lines();
        Stops stopsRepository = new Stops();

        ArrayList<String> lines = linesRepository.getAllLines();
        ArrayList<Stop> stops = stopsRepository.getStopsByCourseId(8);

        System.out.println("Przystanki kursu 8:");
        for(Stop s: stops){
            System.out.println(s);
        }

    }
}
