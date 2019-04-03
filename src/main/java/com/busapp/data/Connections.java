package com.busapp.data;

import com.busapp.database.DatabaseJDBCDriver;
import com.busapp.database.PostgreSQLJDBCDriver;
import com.busapp.models.Connection;
import com.busapp.models.Layover;

import java.lang.reflect.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.TimeZone;

public class Connections {

    private final DatabaseJDBCDriver databaseDriver = new PostgreSQLJDBCDriver("jdbc:postgresql://localhost:5432/buses", "postgres", "postgres1");

    public final List<Connection> findConnections(String start, String destination, String time, List<String> lines) throws SQLException {

        List<Connection> connections = new ArrayList<>();

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

        String linesQuerry = String.join("','", lines);

        StringBuilder sqlQuerry = new StringBuilder("select l.ord_number as no, s.name as name, c.line as line, c.course_id as course_id, t.departure as departure, t.course_number as course_number from courses c natural join layovers l natural join stops s " +
                "natural join timetable t where c.line in ('" + linesQuerry + "') and t.departure > '" + time + "' and day = "); //pobierać poprawne informacje
        sqlQuerry.append(dayOfWeek);
        sqlQuerry.append(" order by t.course_number, c.course_id, l.ord_number, t.departure;");

        this.databaseDriver.connect();
        this.databaseDriver.executeQuery(sqlQuerry.toString());
        ResultSet results = this.databaseDriver.getResult();

        try {
            List<Layover> route = new ArrayList<>();
            boolean fullRoute = true; //zamiast tego długość route
            while (results.next()) {
                //create connection Lists HERE
                String stopName = results.getString("name");
                if(stopName == start && fullRoute) {
                    //build name
                    fullRoute = false;
                }
            }
        }finally {
            this.databaseDriver.disconnect();
        }



        return connections;

    }

}
