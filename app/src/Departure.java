public class Departure {

    private Stop stop;
    private String line;
    private String destination;
    private String departureTime;
    private String timeDifference;

    public Departure(){}

    public Departure(Stop stop, String line, String destination, String departureTime, String timeDifference){
        this.stop = stop;
        this.line = line;
        this.destination = destination;
        this.departureTime = departureTime;
        this.timeDifference = timeDifference;
    }

    public String getLine() {
        return line;
    }

    public Stop getStop() {
        return stop;
    }

    public String getDestination() {
        return destination;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public String getTimeDifference() {
        return timeDifference;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public void setStop(Stop stop) {
        this.stop = stop;
    }

    public void setTimeDifference(String timeDifference) {
        this.timeDifference = timeDifference;
    }
}
