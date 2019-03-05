package com.busapp.models;


import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Stop {

    private Integer id;
    private String name;
    private Double lng;
    private Double lat;

    public Stop(int id, String name, double lat, double lng){
        this.id = id;
        this.name = name;
        this.lng = lng;
        this.lat = lat;
    }

    public Stop() { }

    public Integer getId(){
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(this.id);
        sb.append(" | ");
        sb.append(this.name);
        sb.append(" | ");
        sb.append(this.lng);
        sb.append(", ");
        sb.append(this.lat);

        return sb.toString();
    }
}
