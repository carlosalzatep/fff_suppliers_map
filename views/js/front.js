
/****************************************************************************/
/*Map Setting*/

fLatitude = '46.5311318';
fLongitude = '0.879984';
mapZoom = 6;
mapZoomFocus = 12;
var markersRef = [];
var ToolTipMarkersRef = [];
var pageSize = 12;/*Num items paginate*/

var bounds;

var mapSuppliers = [];
/*Ordering*/
var orderFilter = '';
/*Filtering*/
var categoryFilter = '';
var labelFilter = '';

/*Searching*/
var searchWord = '';

/*Map main var*/
var map;

function initMap() {

    if (typeof C_GoogleAPIKey !== "undefined" && C_GoogleAPIKey != '') {

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
        ToolTipMarkersRef = [];
        document.getElementById("supplier_items").innerHTML = '<div class="lds-dual-ring"></div>';

        /*Loading Locations*/
        if (typeof mapSuppliers !== "undefined" && Object.keys(mapSuppliers).length > 0) {
            bounds = new google.maps.LatLngBounds();
            let supplierItemList = "";
            var itera = 0;

            Object.keys(mapSuppliers).forEach(
                function (key) {
                    /*console.log('id:' + mapSuppliers[key].id_supplier + ' la:' + mapSuppliers[key].latitude + ' lo:' + mapSuppliers[key].longitude);*/
                    if(mapSuppliers[key].latitude != '' && isFinite(mapSuppliers[key].latitude) && Math.abs(mapSuppliers[key].latitude) <= 90 && mapSuppliers[key].longitude != '' && isFinite(mapSuppliers[key].longitude) && Math.abs(mapSuppliers[key].longitude) <= 180) {

                        /*Set supplier div content*/
                        supplierItemList += '<div id="sp-' + mapSuppliers[key].id_supplier + '" class="col-md-4 mb-3 mt-1"';
                        supplierItemList += ' onmouseover="showme(' + itera + ')" onmouseout="showme(-1)" onclick="zoome(' + itera + ', \'' + mapSuppliers[key].url + '\')" >';
                        supplierItemList += '<div class="supplier-thumbnail"><img title="' + mapSuppliers[key].name + '" src="' + mapSuppliers[key].image + '" ></div>';
                        supplierItemList += '</div>';
                        itera++;

                        /*Set suppliers Map*/
                        let ilocation = { lat: parseFloat(mapSuppliers[key].latitude), lng: parseFloat(mapSuppliers[key].longitude) };
                        addMarker(ilocation, mapSuppliers[key].name, mapSuppliers[key].image, mapSuppliers[key].url, mapSuppliers[key].category_values, mapSuppliers[key].qualification, map);
                        bounds.extend(ilocation);
                    }
                }
            );
            /*Set supplier div content*/
            document.getElementById("supplier_items").innerHTML = supplierItemList;

            /*center the map to the geometric center of all markers*/
            map.setCenter(bounds.getCenter());

            /*If just 1 marker*/
            if (markersRef.length <= 1) {
                map.setZoom(mapZoomFocus - 2)
            }
            else if (Object.keys(mapSuppliers).length !== Object.keys(mapSuppliersTotal).length)/*Not All France Map*/
                map.fitBounds(bounds);
            
        }
        else { 
            document.getElementById("supplier_items").innerHTML = '<p class="filter_title">Sans résultats</p>';
        }
    }
}


/****************************************************************************/
/*Map functions*/

function addMarker(location, title, urlimg, url, category_values, qualification, map) {
    let contentString =
        "<center style='padding:0px 10px 15px 10px'><span class='markertooltip'>" +
        "<img src='" + urlimg + "'>" +
        "<div class='mtttitle'>" + title + "</div>";
    
    if (qualification == '') qualification = 1;
    contentString += "<div class='mttcal'><img src='./themes/fffthemechild/assets/images/stars-" + qualification +".png'></div>";
    
    contentString += "<div class='mttcat'>" + category_values + "</div>" +
        "<div class='splus'><a href='" + url + "' class='btn btn-primary'>Savoir plus</a></div>"
        "</span></center>";
    
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(infowindow, 'closeclick', function () {
        paginate();
        $('#categorySelect').focus();
    });

    ToolTipMarkersRef.push(infowindow);

    var marker = new google.maps.Marker({
        position: location,
        icon: "../modules/fff_map_suppliers/views/img/icon-map-pointer.png",
        map: map
    });

    markersRef.push(marker);
}

/*Ref animate maker onhover*/
showme = function (index) {

    for (var i = 0; i < markersRef.length; i++) {
        if (index == i) {
                markersRef[i].setAnimation(google.maps.Animation.BOUNCE);
        } else {
            markersRef[i].setAnimation(null);
        }
    }
}


var firing = [];
function zoome(item, url) {

    /*Close all Tooltips*/
    for (var i = 0; i < ToolTipMarkersRef.length; i++) {
        ToolTipMarkersRef[i].close();
    }

   //Scroll Down if is Mobile
    if (window.innerWidth < 990) {
        $('html, body').animate({
            scrollTop: $('#map').offset().top
        }, 800, function () {
            window.location.hash = $('#map');
        });
    }
    
    /* Detect the 2nd single click event, so we can set it to doubleClick*/
    if (firing[item]) {
        window.location.href(url);
        return;
    }

    firing[item] = true;
    timer = setTimeout(function () {
        /*console.log('zoome: ' + item);*/
        map.setZoom(mapZoomFocus);
        map.setCenter(markersRef[item].getPosition());
        ToolTipMarkersRef[item].open(map, markersRef[item]);
        firing[item] = false;
    }, 250);
    
}


function setCategoryFilter(newCategory) { 
    
    if (categoryFilter !== newCategory) {
        categoryFilter = newCategory;
        $('#categorySelect').html((categoryFilter != '') ? categoryFilter : "Catégorie");
        
        paginate();
    }
}

function setLabelFilter(newLabel) {

    if (labelFilter !== newLabel) {
        labelFilter = newLabel;
        $('#labelSelect').html((labelFilter != '') ? labelFilter : "Label");
        
        paginate();
    }
}

function setOrderVar(newOrder, newLabel) {

    /*if (orderFilter === '' || orderFilter !== newOrder) {*/
        orderFilter = newOrder;
        $('#trierpar').html((newLabel != '') ? newLabel : "Options");

        /*et Array of order keys*/
        var mapSuppliersArr = [];
        var mapSuppliersArrOrdered = [];
        var itera = 0;
        
        if (orderFilter == 1) {/* Nom, A à Z*/
            for (var key in mapSuppliersTotal) {
                mapSuppliersArr.push([mapSuppliersTotal[key].name, itera++]);
            }
            mapSuppliersArr = mapSuppliersArr.sort();
        }
        else if (orderFilter == 2) { /*Nom, Z à A*/
            for (var key in mapSuppliersTotal) {
                mapSuppliersArr.push([mapSuppliersTotal[key].name, itera++]);
            }
            mapSuppliersArr = mapSuppliersArr.sort().reverse();
        }
        else if (orderFilter == 3) { /* Le plus récent*/
            for (var key in mapSuppliersTotal) {
                mapSuppliersArr.push([mapSuppliersTotal[key].id_supplier, itera++]);
            }
            mapSuppliersArr = mapSuppliersArr.sort().reverse();
        }
        else { /*Default id_supplier ASC (Moins récent)*/
            for (var key in mapSuppliersTotal) {
                mapSuppliersArr.push([mapSuppliersTotal[key].id_supplier, itera++]);
            }
            mapSuppliersArr = mapSuppliersArr.sort();
        }

        if (mapSuppliersArr.length){

            for (var i = 0; i < mapSuppliersArr.length; i++) {
                var key = mapSuppliersArr[i][1];
                mapSuppliersArrOrdered.push(mapSuppliersTotal[key]);
            }
            if (mapSuppliersArrOrdered.length)
                mapSuppliersTotal = mapSuppliersArrOrdered;
        }
        
        paginate();
    //}
}

function setSearchWord(newSearchWord) {
    if (searchWord !== newSearchWord) {
        searchWord = newSearchWord.toUpperCase();

        paginate();
    }
}

function drawMapAfterFilter() { 
    //Init 
    //mapSuppliers = new Object();
    mapSuppliers = [];

    //searchin label in obj
    Object.keys(mapSuppliersTotal).forEach(
        function (key) {

            let categoryValues = mapSuppliersTotal[key].category_values;
            let labelValues = mapSuppliersTotal[key].labels_object;
            let nameValues = mapSuppliersTotal[key].name.toUpperCase();

            if ((categoryValues.search(categoryFilter) > -1) && (labelValues.search(labelFilter) > -1) && (nameValues.search(searchWord) > -1)) {
                //console.log(mapSuppliersTotal[key].labels_object);
                mapSuppliers[key] = mapSuppliersTotal[key];
            }
        }
    );
}


function getNumberOfPages() {
    return Math.ceil(Object.keys(mapSuppliers).length / numberPerPage);
}


/****************************************************************************/
//Map Event listeners

$('#supplier_map_search_form form').submit(function () {
    return false;
});

$("#sw").keypress(function () {
    if (event.which == 13) {
        event.preventDefault();
    }
});

$("#sw").on("change keyup paste click", function () {
    let sw = $("#sw").val();

    setSearchWord(sw);
});

function TestCapp(maxn) { 
    //Show More items for testing
    var Ini = Object.keys(mapSuppliersTotal).length;
    while (Ini <= maxn) {
        mapSuppliersTotal[Ini++] = mapSuppliersTotal[0];
    }
    setOrderVar(3, 'Le plus récent');
}


/****************************************************************************/
//Suppliers Pagination

function paginate() {

    drawMapAfterFilter();
    
    var container = $('#supplier_items_pag');
    container.pagination({
        dataSource: mapSuppliers,
        //locator: 'items',
        //totalNumber: 120,
        pageSize: pageSize,
        pageRange: 3,

        callback: function (response, pagination) {

            //window.console && console.log(22, response, pagination);

            mapSuppliers = response;

            //Print Map
            initMap();

            //Print Items
            /*var dataHtml = '<ul>';
            Object.keys(response).forEach(
                function (key) {
                    console.log(response[key].name);
                    dataHtml += '<li>' + response[key].name + '</li>';
                }
            );
            dataHtml += '</ul>';
            container.prev().html(dataHtml);*/
        }
    })
    
}
