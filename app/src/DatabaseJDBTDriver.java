
public interface DatabaseJDBTDriver {

    public void connect();

    public void disconnect();

    public void executeQuery(String query);

}

