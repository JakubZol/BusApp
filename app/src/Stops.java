import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;

public class Stops {

    private final DatabaseJDBCDriver databaseDriver = new PostgreSQLJDBCDriver("jdbc:postgresql://localhost:5432/buses", "postgres", "postgres1");


    public final ArrayList<Stop> getStopsByCourseId(Integer course_id) {

        StringBuilder sqlQuerry = new StringBuilder("select s.name as name, s.stop_id as id, s.lng as lng, s.lat as lat from stops s natural join layovers l where l.course_id = ");
        sqlQuerry.append(course_id);
        sqlQuerry.append(";");

        databaseDriver.connect();

        ArrayList<Stop> stops = new ArrayList<>();
        this.databaseDriver.executeQuery(sqlQuerry.toString());

        ResultSet results = this.databaseDriver.getResult();

        try {

            while (results.next()) {
                String name = results.getString("name");
                Integer id = results.getInt("id");
                Double lat = results.getDouble("lat");
                Double lng = results.getDouble("lng");

                stops.add(new Stop(id, name, lat, lng));
            }


        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            this.databaseDriver.disconnect();
        }

        return stops;

    }


    public final ArrayList<String> getAllStopsNames(){

        this.databaseDriver.connect();

        ArrayList<String> stops = new ArrayList<>();

        this.databaseDriver.executeQuery("select distinct name from stops;");
        ResultSet results = this.databaseDriver.getResult();

        try{
            while (results.next()){
                String stop = results.getString("name");
                stops.add(stop);
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        finally {
            this.databaseDriver.disconnect();
        }

        return stops;

    }

}
