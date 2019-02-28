import java.sql.ResultSet;
import java.util.ArrayList;

public class Lines {

    DatabaseJDBCDriver databaseDriver = new PostgreSQLJDBCDriver("jdbc:postgresql://localhost:5432/buses", "postgres", "postgres1");


    public ArrayList<String> getAllLines(){

        this.databaseDriver.connect();

        ArrayList<String> lines = new ArrayList<String>();

        this.databaseDriver.executeQuery("Select distinct line from courses;");
        ResultSet results = this.databaseDriver.getResult();

        try {

            while (results.next()) {
                String line = results.getString("line");
                lines.add(line);
            }

        }
        catch (Exception e){
            e.printStackTrace();
        }
        finally {
            this.databaseDriver.disconnect();
        }

        return lines;
    }


}
