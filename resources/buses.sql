drop table stops cascade ;
drop table courses cascade;
drop table layovers cascade;
drop table timetable cascade;

begin;

create table stops (
  stop_id SERIAL PRIMARY KEY,
  name varchar(30) not null,
  lng float not null,
  lat float not null
);

create table courses (
  course_id SERIAL PRIMARY KEY,
  line varchar(2) not null,
  start varchar(30) not null,
  destination varchar(30) not null
);

create table layovers (
  layover_id SERIAL PRIMARY key,
  stop_id INTEGER not null references stops,
  course_id integer NOT NULL REFERENCES courses,
  ord_number integer not null
);

create table timetable (
  layover_id INTEGER not null references layovers,
  course_number INTEGER not null,
  hour integer not null,
  minutes integer not null,
  primary key(layover_id, course_number)
);


insert into courses (course_id, line, start, destination) values 
(default,'1','Osiedle Słoneczne','Dworzec Główny PKP'),
(default,'1','Dworzec Główny PKP','Osiedle Słoneczne'),
(default,'1','Osiedle Słoneczne','Cementownia'),
(default,'1','Cementownia','Osiedle Słoneczne'),
(default,'2','Osiedle Słoneczne','Ogródki Działkowe'),
(default,'2','Ogródki Działkowe','Osiedle Słoneczne'),
(default,'3','Osiedle Słoneczne','Szpital Pętla'),
(default,'3','Szpital Pętla','Osiedle Słoneczne'),
(default,'5A','Józefin Pętla','Przemysłowa Pętla'),
(default,'5A','Przemysłowa Pętla','Józefin Pętla'),
(default,'5C','Hrubieszowska Pętla','Szpital Pętla'),
(default,'5C','Szpital Pętla','Hrubieszowska Pętla'),
(default,'6','Dworzec Główny PKP','Cmentarz Komunalny'),
(default,'6','Cmentarz Komunalny','Dworzec Główny PKP'),
(default,'8','Dworzec Główny PKP','Szpital Pętla'),
(default,'8','Szpital Pętla','Dworzec Główny PKP'),
(default,'9','Dworzec Główny PKP','Ogródki Działkowe'),
(default,'9','Ogródki Działkowe','Dworzec Główny PKP'),
(default,'9','Cementownia','Ogródki Działkowe'),
(default,'9','Ogródki Działkowe','Cementownia'),
(default,'11','Dworzec Główny PKP','Okszów'),
(default,'11','Okszów','Dworzec Główny PKP'),
(default,12,'Osiedle Słoneczne','Piwna'),
(default,12,'Piwna','Osiedle Słoneczne'),
(default,12,'Metalowa','Piwna'),
(default,12,'Piwna','Metalowa'),
(default,15,'Dworzec Główny PKP','Dworzec Główny PKP'),
(default,24,'Fabryka Domów','Fabryka Domów'),
(default,30,'Osiedle Słoneczne','Okszów'),
(default,30,'Okszów','Osiedle Słoneczne');


commit;