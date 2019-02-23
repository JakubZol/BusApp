import java.sql.ResultSet;


public class Test {
    public static void main(String[] args){

        DatabaseJDBCDriver driver = new PostgreSQLJDBCDriver("jdbc:postgresql://localhost:5432/buses", "postgres", "postgres1");
        driver.connect();
        driver.executeQuery("select * from stops where name like 'Osiedle%';");
        //select l.ord_number as no, s.name as name, c.destination as destination from courses c natural join layovers l natural join stops s where c.line='30' and c.destination like 'Osiedle%' order by l.ord_number;
        ResultSet result = driver.getResult();

        try {

            StringBuilder sb = new StringBuilder("Stops:\n");
            while (result.next()) {
                int id = result.getInt("stop_id");
                String name = result.getString("name");
                double lat = result.getDouble("lat");
                double lng = result.getDouble("lng");
                sb.append(new Stop(id, name, lng, lat));
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
