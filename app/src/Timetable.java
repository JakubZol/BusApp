import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.TimeZone;

public class Timetable {

    DatabaseJDBCDriver databaseDriver = new PostgreSQLJDBCDriver("jdbc:postgresql://localhost:5432/buses", "postgres", "postgres1");


    public ArrayList<Departure> getDeparturesByStop(String stopName) {

        Calendar calendar = Calendar.getInstance(TimeZone.getDefault());
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK) % 7 <= 1 ? calendar.get(Calendar.DAY_OF_WEEK) : 1;

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

}
