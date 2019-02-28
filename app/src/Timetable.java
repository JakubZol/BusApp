import java.sql.ResultSet;
import java.util.*;

public class Timetable {

    private DatabaseJDBCDriver databaseDriver = new PostgreSQLJDBCDriver("jdbc:postgresql://localhost:5432/buses", "postgres", "postgres1");


    public ArrayList<Departure> getDeparturesByStop(String stopName) {

        Calendar calendar = Calendar.getInstance(TimeZone.getDefault());
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);

        if(dayOfWeek == 1){
            dayOfWeek = 0;
        }
        else if(dayOfWeek == 7){
            dayOfWeek = 6;
        }
        else{
            dayOfWeek = 1;
        }

        StringBuilder sqlQuerry = new StringBuilder("select c.line as line, c.destination as destination, s.stop_id as stop_id, s.lat as lat, s.lng as lng, t.departure as " +
                "departure, (t.departure - CURRENT_TIME::time) as time_diff from stops s natural join layovers l natural join courses c natural join timetable t " +
                "where s.name = '");
        sqlQuerry.append(stopName);
        sqlQuerry.append("' and CURRENT_TIME < t.departure and t.day = ");
        sqlQuerry.append(dayOfWeek);
        sqlQuerry.append(" order by (t.departure - CURRENT_TIME::time);");

        ArrayList<Departure> departures = new ArrayList<Departure>();

        this.databaseDriver.connect();
        this.databaseDriver.executeQuery(sqlQuerry.toString());
        ResultSet results = this.databaseDriver.getResult();

        try{
            while(results.next()){
                String line = results.getString("line");
                String destination = results.getString("destination");
                Integer stopId = results.getInt("stop_id");
                Double lat = results.getDouble("lat");
                Double lng = results.getDouble("lng");
                String departureTime = results.getString("departure");
                String timeDifference = results.getString("time_diff");

                Departure d = new Departure(new Stop(stopId, stopName, lat,lng), line, destination, departureTime, timeDifference);
                departures.add(d);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            this.databaseDriver.disconnect();
        }

        return departures;
    }


    public LinkedHashMap<String, LinkedHashMap<Integer, ArrayList<Integer>>> getStopTimetable(int courseId, String stopName){

        StringBuilder sqlQuerry = new StringBuilder("select t.departure as departure, t.day as day from stops s natural join layovers l natural join timetable t where l.course_id = ");
        sqlQuerry.append(courseId);
        sqlQuerry.append(" and s.name = '");
        sqlQuerry.append(stopName);
        sqlQuerry.append("' order by t.day, t.departure;");

        LinkedHashMap<String, LinkedHashMap<Integer, ArrayList<Integer>>> timetable = new LinkedHashMap<String, LinkedHashMap<Integer, ArrayList<Integer>>>();
        timetable.put("Dni powszednie", new LinkedHashMap<Integer, ArrayList<Integer>>());
        timetable.put("Sobota", new LinkedHashMap<Integer, ArrayList<Integer>>());
        timetable.put("Niedziela", new LinkedHashMap<Integer, ArrayList<Integer>>());

        this.databaseDriver.connect();
        this.databaseDriver.executeQuery(sqlQuerry.toString());
        ResultSet results = this.databaseDriver.getResult();

        try{
            while(results.next()){
                String time = results.getString("departure");
                Integer day = results.getInt("day");

                String[] timeArray = time.split(":");
                Integer hour = Integer.parseInt(timeArray[0]);
                Integer minutes = Integer.parseInt(timeArray[1]);

                System.out.println("Day: " + day + ", Time: " + hour + ":" + minutes);
                //TO DO
            }

        }
        catch (Exception e){
            e.printStackTrace();
        }
        finally {
            this.databaseDriver.disconnect();
        }

        return timetable;

    }


}
