import java.util.ArrayList;

public class Course {

    private Integer id;
    private String line;
    private Double lat;
    private Double lng;
    private ArrayList<Stop> route = new ArrayList<Stop>();

    public Course(){ }

    public Course(int id, String line, double lng, double lat){
        this.id = id;
        this.line = line;
        this.lng = lng;
        this.lat = lat;
    }

    public void addStop(Stop s){
        this.route.add(s);
    }

    public void setRoute(ArrayList<Stop> route) {
        this.route = route;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Integer getId() {
        return id;
    }

    public String getLine() {
        return line;
    }

    public Double getLng() {
        return lng;
    }

    public Double getLat() {
        return lat;
    }
}
