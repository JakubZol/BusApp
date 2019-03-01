import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class PostgreSQLJDBCDriver implements DatabaseJDBCDriver {

    private final String url;
    private final String user;
    private final String password;

    private Connection connection = null;
    private Statement statement = null;
    private ResultSet result = null;


    public PostgreSQLJDBCDriver(String url, String user, String password){
        this.url = url;
        this.user = user;
        this.password = password;
    }

    public void connect(){
        if(this.connection == null) {
            try {
                this.connection = DriverManager.getConnection(this.url, this.user, this.password);
                this.statement = this.connection.createStatement();
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        }
        else{
            System.out.println("Already Connected!");
        }
    }

    public void disconnect(){
        try{
            //add connection verify
            this.result.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    public void executeQuery(String query){
        if(this.connection != null && this.statement != null){
            try{
                this.result = this.statement.executeQuery(query);
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }
    }

    public ResultSet getResult(){
        return this.result;
    }

}

