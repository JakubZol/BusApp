package com.busapp.data;

import com.busapp.database.DatabaseJDBCDriver;
import com.busapp.database.PostgreSQLJDBCDriver;
import com.busapp.models.Stop;

import java.sql.ResultSet;
import java.util.ArrayList;

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
                int id = results.getInt("id");
                double lat = results.getDouble("lat");
                double lng = results.getDouble("lng");

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

    public final ArrayList<Stop> getAllStops(){

        ArrayList<Stop> stops = new ArrayList<>();

        this.databaseDriver.connect();
        this.databaseDriver.executeQuery("select * from stops;");
        ResultSet results = this.databaseDriver.getResult();

        try{
            while(results.next()){
                int stopId = results.getInt("stop_id");
                String name = results.getString("name");
                double lat = results.getDouble("lat");
                double lng = results.getDouble("lng");

                stops.add(new Stop(stopId, name, lat, lng));
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        finally{
            this.databaseDriver.disconnect();
        }

        return stops;
    }

}
