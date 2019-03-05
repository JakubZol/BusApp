package com.busapp.repositories;

import com.busapp.data.*;
import com.busapp.models.Stop;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;


@Path("data")
public class DataRepository {

    private final Stops stops = new Stops();
    private final Lines lines = new Lines();
    private final Courses courses = new Courses();
    private final Connections connections = new Connections();
    private final Timetable timetable = new Timetable();



    @GET
    @Produces(MediaType.APPLICATION_XML) //problem with json for everything and xml for lists!!!
    public Response getAllLines(){
        ArrayList<String> lines = this.lines.getAllLines();
        return Response.status(Response.Status.OK).entity(lines).build();
    }

}
