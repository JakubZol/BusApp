package com.busapp.models;

import java.util.ArrayList;
import java.util.List;

public class StopWithLines {

    private String name;
    private List<Integer> ids;
    private List<String> lines;

    public StopWithLines(){
        this.lines = new ArrayList<>();
    }

     public StopWithLines(String stop, List<Integer> ids){
        this.name = stop;
        this.ids = ids;
        this.lines = new ArrayList<>();
     }

     public StopWithLines(String stop, List<Integer> ids, List<String> lines){
        this.name = stop;
        this.ids = ids;
        this.lines = lines;
     }

     public void addLine(String line){
        this.lines.add(line);
     }

    public void setName(String name) {
        this.name = name;
    }

    public List<Integer> getIds() {
        return ids;
    }

    public void setIds(List<Integer> ids) {
        this.ids = ids;
    }

    public void setLines(List<String> lines) {
        this.lines = lines;
    }

    public String getName() {
        return name;
    }

    public List<String> getLines() {
        return lines;
    }


}
