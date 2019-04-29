package com.busapp.models;

import java.util.ArrayList;
import java.util.List;

public class Connection {

    private String line;
    private String destination;
    private Integer time;
    private String departureTime;
    private Integer timeDifference;
    private List<Layover> route;

    public Connection(String line, String destination, Integer time, String departureTime, Integer timeDifference, List<Layover> route){
        this.line = line;
        this.destination = destination;
        this.time = time;
        this.departureTime = departureTime;
        this.timeDifference = timeDifference;
        this.route = route;
    }

    public Connection(){

    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public void setTimeDifference(Integer timeDifference) {
        this.timeDifference = timeDifference;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public String getLine() {
        return line;
    }

    public void setRoute(List<Layover> route) {
        this.route = route;
    }

    public Integer getTime() {
        return time;
    }

    public Integer getTimeDifference() {
        return timeDifference;
    }

    public List<Layover> getRoute() {
        return route;
    }

    public void setTime(Integer time) {
        this.time = time;
    }
}
