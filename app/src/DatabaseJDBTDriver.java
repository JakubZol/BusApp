import java.sql.ResultSet;

public interface DatabaseJDBTDriver {

    void connect();

    void disconnect();

    void executeQuery(String query);

    ResultSet getResult();

}

