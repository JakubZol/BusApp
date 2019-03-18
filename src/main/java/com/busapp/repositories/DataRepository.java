package com.busapp.repositories;

import com.busapp.data.*;
import com.busapp.models.Course;
import com.busapp.models.Departure;
import com.busapp.models.Stop;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;


@Path("data")
public class DataRepository {

    private final Stops stops = new Stops();
    private final Lines lines = new Lines();
    private final Courses courses = new Courses();
    private final Connections connections = new Connections();
    private final Timetable timetable = new Timetable();



    @GET
    @Path("/lines")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllLines(){
        List<String> lines = this.lines.getAllLines();
        return Response.ok(lines).build();
    }

    @GET
    @Path("/stops")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllStops(){
        List<Stop> stops = this.stops.getAllStops();
        return Response.ok(stops).build();
    }

    @GET
    @Path("/timetable/stop/{stopName}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTimetableByStop(@PathParam("stopName") String stop){
        try {

            List<Departure> departures = this.timetable.getDeparturesByStop(stop);
            return Response.ok(departures).build();

        }
        catch (Exception e){
            return Response.serverError().build();
        }
    }

    @GET
    @Path("/courses/{line}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCoursesByLine(@PathParam("line") String line){
        try{

            List<Course> courses = this.courses.getCourseByLine(line);
            return Response.ok(courses).build();

        }
        catch (Exception e){
            return Response.serverError().build();
        }

    }
}
