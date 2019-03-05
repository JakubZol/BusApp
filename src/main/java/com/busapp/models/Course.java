package com.busapp.models;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Course {

    private Integer courseId;
    private String line;
    private String start;
    private String destination;

    public Course(){ }

    public Course(int id, String line, String start, String destination){
        this.courseId = id;
        this.line = line;
        this.start = start;
        this.destination = destination;
    }


    public void setLine(String line) {
        this.line = line;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public String getLine() {
        return line;
    }

    public String getDestination() {
        return destination;
    }

    public String getStart() {
        return start;
    }
}
