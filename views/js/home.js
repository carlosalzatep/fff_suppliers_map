
fLatitude = '46.5311318';
fLongitude = '0.879984';
mapZoom = 6;
var markersRef = [];

function initMap() {

    if (typeof C_GoogleAPIKey !== "undefined" && C_GoogleAPIKey != '') {

        let map;
        //console.log("Map script has loaded");
        map = new google.maps.Map(document.getElementById("map"), {
            center: {
                lat: parseFloat(fLatitude),
                lng: parseFloat(fLongitude)
            },
            zoom: mapZoom,
            styles: [{
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f5f5"
                }]
            },
            {
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#616161"
                }]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#f5f5f5"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#bdbdbd"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#eeeeee"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#757575"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e5e5e5"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#9e9e9e"
                }]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#757575"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dadada"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#616161"
                }]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#9e9e9e"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e5e5e5"
                }]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#eeeeee"
                }]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#c9c9c9"
                }]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#9e9e9e"
                }]
            }
            ],
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });


        markersRef = [];

        //Loading Locations
        if (typeof mapSuppliers !== "undefined" && Object.keys(mapSuppliers).length > 0) {
            var bounds = new google.maps.LatLngBounds();
            let supplierItemList = "";
            var itera = 0;

            Object.keys(mapSuppliers).forEach(
                function (key) {
                    
                    if (mapSuppliers[key].latitude != '' && isFinite(mapSuppliers[key].latitude) && Math.abs(mapSuppliers[key].latitude) <= 90 && mapSuppliers[key].longitude != '' && isFinite(mapSuppliers[key].longitude) && Math.abs(mapSuppliers[key].longitude) <= 180) {
                        //console.log('id:' + mapSuppliers[key].id_supplier + ' la:' + mapSuppliers[key].latitude + ' lo:' + mapSuppliers[key].longitude);
                        //Set suppliers Map
                        let ilocation = { lat: parseFloat(mapSuppliers[key].latitude), lng: parseFloat(mapSuppliers[key].longitude) };
                        addMarker(ilocation, map, mapSuppliers[key].name);
                        bounds.extend(ilocation);
                    }
                }
            );

            //center the map to the geometric center of all markers
            map.setCenter(bounds.getCenter());
            map.fitBounds(bounds);
        }
    }
}

function addMarker(location, map, title) {
    ////console.log('addMarker');
    var marker = new google.maps.Marker({
        position: location,
        icon: "./modules/fff_map_suppliers/views/img/icon-map-pointer.png",
        map: map,
        title: title
    });
}
