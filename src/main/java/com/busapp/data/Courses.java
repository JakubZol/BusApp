package com.busapp.data;

import com.busapp.database.DatabaseJDBCDriver;
import com.busapp.database.PostgreSQLJDBCDriver;
import com.busapp.models.Course;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Courses {

    private final DatabaseJDBCDriver databaseDriver = new PostgreSQLJDBCDriver("jdbc:postgresql://localhost:5432/buses", "postgres", "postgres1");

    public final ArrayList<Course> getCourseByLine(String line) throws SQLException {

        ArrayList<Course> courses = new ArrayList<>();

        StringBuilder sqlQuerry = new StringBuilder("select * from courses where line = '");
        sqlQuerry.append(line);
        sqlQuerry.append("';");

        this.databaseDriver.connect();
        this.databaseDriver.executeQuery(sqlQuerry.toString());
        ResultSet results = this.databaseDriver.getResult();

        try{
            while(results.next()){
                int id = results.getInt("course_id");
                String start = results.getString("start");
                String destination = results.getString("destination");
                courses.add(new Course(id, line, start, destination));
            }
        }
        finally {
            this.databaseDriver.disconnect();
        }

        return courses;
    }
}
