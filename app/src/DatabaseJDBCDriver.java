import java.sql.ResultSet;

public interface DatabaseJDBCDriver {

    void connect();

    void disconnect();

    void executeQuery(String query);

    ResultSet getResult();

}

