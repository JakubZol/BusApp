package com.busapp.data;

import com.busapp.database.DatabaseJDBCDriver;
import com.busapp.database.PostgreSQLJDBCDriver;

public class Connections {

    DatabaseJDBCDriver databaseDriver = new PostgreSQLJDBCDriver("jdbc:postgresql://localhost:5432/buses", "postgres", "postgres1");

}
