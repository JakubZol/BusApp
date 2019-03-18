app.service("dataProvider", function($http){
   this.getData = function(url){
       return $http.get(url);
    }
});

app.service("mapService", function(){

    this.map = {
        initialParams: {},
        target: "",
        map: null,
        tileLayer: L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
        markersLayer: L.layerGroup(),
        stops: [],
        drawStopsMarkers: function (stops) {

            const self = this;
            this.markersLayer.clearLayers();

            for (let stop of stops) {
                let marker = L.marker([stop.lat, stop.lng], {
                    icon: L.icon({
                        iconUrl: 'images/blue_pin2.svg',
                        iconSize: [45, 45]
                    })
                });

                marker.bindPopup("<b>" + stop.name + "</b>");
                marker.on('mouseover', function () {
                    this.openPopup();
                });
                marker.on('mouseout', function () {
                    this.closePopup();
                });

                marker.addTo(self.markersLayer);
            }
        },
        resetStopsMarkers: function () {

            this.markersLayer.clearLayers();
            this.drawStopsMarkers(this.stops);

        },
        zoomStop: function (name, zoom) {

            const self = this;

            const stops = this.stops.filter((stop) => stop.name.toLowerCase() === name.toLowerCase());
            if (stops.length > 0) {
                self.map.setView([stops[0].lat, stops[0].lng], zoom);
            }
        },
        zoomInitial: function () {
            this.map.setView(this.initialParams.center, this.initialParams.zoom);
        },
        drawRoute: function (stops) {

            const self = this;

            const latlngs = [];

            for (let stop of stops) {

                latlngs.push({lat: stop.lat, lng: stop.lng});
            }

            const polyline = L.polyline(latlngs, {color: 'dodgerblue'}).addTo(self.markersLayer);

            self.map.fitBounds(polyline.getBounds());
        },
    };

        this.createMap = function(target, initialParams){
        this.map.initialParams = initialParams;
        this.map.target = target;
        this.map.map = L.map(target, initialParams);
        this.map.tileLayer.addTo(this.map.map);
        this.map.markersLayer.addTo(this.map.map);

        return this.map;

    }

});