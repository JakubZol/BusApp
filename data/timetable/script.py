import json

def fill(file, idx, hours, minutes, offset):
    file = open(file, "r+")
    data = file.read()
    course = json.loads(data)[idx]
    file.close()
    print(course["line"])
    print(course["start"] + " => " + course["destination"])
    for stop in course["route"]:
        print(stop["stop"])
        for hour in hours:
            stop["timetable"] = {'hour': hour, 'minutes': [{'period': "Dni powszednie", 'values': [v + offset for v in minutes]}]}
            print("Hour: " + str(stop["timetable"]["hour"]))
            minutes_list = stop["timetable"]["minutes"][0]["values"]
            print(" ".join(str(v) for v in minutes_list))


fill("line2.json", 1, [6, 7, 8, 9], [10, 30, 50], 2)