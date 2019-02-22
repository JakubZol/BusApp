import java.sql.ResultSet;

public class Test {
    public static void main(String[] args){

        DatabaseJDBTDriver driver = new PostgreSQLJDBCDriver("jdbc:postgresql://localhost:5432/buses", "postgres", "postgres1");
        driver.connect();
        driver.executeQuery("select l.ord_number as no, s.name as name, c.destination as destination from courses c natural join layovers l natural join stops s where c.line='30' and c.destination like 'Osiedle%' order by l.ord_number;");
        ResultSet result = driver.getResult();

        try {

            StringBuilder sb = new StringBuilder("Line 24:");
            sb.append("\n");
            while (result.next()) {
                sb.append(result.getInt("no"));
                sb.append(") ");
                sb.append(result.getString("name"));
                sb.append("\n");
            }

            System.out.println(sb);
        }
        catch (Exception e){
            e.printStackTrace();
        }
        finally {
            driver.disconnect();
        }


    }
}
