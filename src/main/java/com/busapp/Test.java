package com.busapp;

import com.busapp.data.Courses;
import com.busapp.data.Lines;
import com.busapp.data.Stops;
import com.busapp.data.Timetable;
import com.busapp.models.Course;
import com.busapp.models.Departure;

import java.util.*;


public class Test {
    public static void main(String[] args){

        Timetable timetable = new Timetable();

        try {
            ArrayList<Departure> departures = timetable.getDeparturesByStop("Ogrodowa");
            LinkedHashMap<String, TreeMap<Integer, ArrayList<String>>> hours = timetable.getStopTimetable(21, 1);
            for(Departure d : departures){
                System.out.println(d);
            }

            System.out.println(hours);


        }
        catch(Exception e){
            System.out.println(e);
        }
    }
}
