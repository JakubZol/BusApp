package com.busapp;

import com.busapp.repositories.DataRepository;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/api/")
public class BusApp extends Application {

    @Override
    public Set<Class<?>> getClasses(){
        Set<Class<?>> s = new HashSet<>();
        s.add(DataRepository.class);
        return s;
    }


}
