window.mapjs = window.mapjs || {};
mapjs.defaultzoom = mapjs.defaultzoom || 14;
mapjs.mapstyles = mapjs.mapstyles || "";
mapjs.beforeInit = mapjs.beforeInit || function(){};
mapjs.beforeRender = mapjs.beforeRender || function(){};
mapjs.afterRender = mapjs.afterRender || function(){};
mapjs.beforeGeoloc = mapjs.beforeGeoloc || function(){};
mapjs.afterGeoloc = mapjs.afterGeoloc || function(){};
mapjs.beforeDirections = mapjs.beforeDirections || function(){};
mapjs.afterDirections = mapjs.afterDirections || function(){};
window.mapjs = mapjs;
if(document.getElementsByClassName("map-canvas").length > 0){document.write('<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&amp;callback=initializeMap"><\/script>')}
function initializeMap(){
function inherits(e,t){function i(){}i.prototype=t.prototype,e.superClass_=t.prototype,e.prototype=new i,e.prototype.constructor=e}function MarkerLabel_(e,t){this.marker_=e,this.handCursorURL_=e.handCursorURL,this.labelDiv_=document.createElement("div"),this.labelDiv_.style.cssText="position: absolute; overflow: hidden;",this.eventDiv_=document.createElement("div"),this.eventDiv_.style.cssText=this.labelDiv_.style.cssText,this.eventDiv_.setAttribute("onselectstart","return false;"),this.eventDiv_.setAttribute("ondragstart","return false;"),this.crossDiv_=MarkerLabel_.getSharedCross(t)}function MarkerWithLabel(e){e=e||{},e.labelContent=e.labelContent||"",e.labelAnchor=e.labelAnchor||new google.maps.Point(0,0),e.labelClass=e.labelClass||"markerLabels",e.labelStyle=e.labelStyle||{},e.labelInBackground=e.labelInBackground||!1,"undefined"==typeof e.labelVisible&&(e.labelVisible=!0),"undefined"==typeof e.raiseOnDrag&&(e.raiseOnDrag=!0),"undefined"==typeof e.clickable&&(e.clickable=!0),"undefined"==typeof e.draggable&&(e.draggable=!1),"undefined"==typeof e.optimized&&(e.optimized=!1),e.crossImage=e.crossImage||"http"+("https:"===document.location.protocol?"s":"")+"://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png",e.handCursor=e.handCursor||"http"+("https:"===document.location.protocol?"s":"")+"://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur",e.optimized=!1,this.label=new MarkerLabel_(this,e.crossImage,e.handCursor),google.maps.Marker.apply(this,arguments)}inherits(MarkerLabel_,google.maps.OverlayView),MarkerLabel_.getSharedCross=function(e){var t;return"undefined"==typeof MarkerLabel_.getSharedCross.crossDiv&&(t=document.createElement("img"),t.style.cssText="position: absolute; z-index: 1000002; display: none;",t.style.marginLeft="-8px",t.style.marginTop="-9px",t.src=e,MarkerLabel_.getSharedCross.crossDiv=t),MarkerLabel_.getSharedCross.crossDiv},MarkerLabel_.prototype.onAdd=function(){var e,t,i,s,a,r,o,n=this,l=!1,g=!1,p=20,_="url("+this.handCursorURL_+")",h=function(e){e.preventDefault&&e.preventDefault(),e.cancelBubble=!0,e.stopPropagation&&e.stopPropagation()},v=function(){n.marker_.setAnimation(null)};this.getPanes().overlayImage.appendChild(this.labelDiv_),this.getPanes().overlayMouseTarget.appendChild(this.eventDiv_),"undefined"==typeof MarkerLabel_.getSharedCross.processed&&(this.getPanes().overlayImage.appendChild(this.crossDiv_),MarkerLabel_.getSharedCross.processed=!0),this.listeners_=[google.maps.event.addDomListener(this.eventDiv_,"mouseover",function(e){(n.marker_.getDraggable()||n.marker_.getClickable())&&(this.style.cursor="pointer",google.maps.event.trigger(n.marker_,"mouseover",e))}),google.maps.event.addDomListener(this.eventDiv_,"mouseout",function(e){!n.marker_.getDraggable()&&!n.marker_.getClickable()||g||(this.style.cursor=n.marker_.getCursor(),google.maps.event.trigger(n.marker_,"mouseout",e))}),google.maps.event.addDomListener(this.eventDiv_,"mousedown",function(e){g=!1,n.marker_.getDraggable()&&(l=!0,this.style.cursor=_),(n.marker_.getDraggable()||n.marker_.getClickable())&&(google.maps.event.trigger(n.marker_,"mousedown",e),h(e))}),google.maps.event.addDomListener(document,"mouseup",function(t){var i;if(l&&(l=!1,n.eventDiv_.style.cursor="pointer",google.maps.event.trigger(n.marker_,"mouseup",t)),g){if(a){i=n.getProjection().fromLatLngToDivPixel(n.marker_.getPosition()),i.y+=p,n.marker_.setPosition(n.getProjection().fromDivPixelToLatLng(i));try{n.marker_.setAnimation(google.maps.Animation.BOUNCE),setTimeout(v,1406)}catch(r){}}n.crossDiv_.style.display="none",n.marker_.setZIndex(e),s=!0,g=!1,t.latLng=n.marker_.getPosition(),google.maps.event.trigger(n.marker_,"dragend",t)}}),google.maps.event.addListener(n.marker_.getMap(),"mousemove",function(s){var _;l&&(g?(s.latLng=new google.maps.LatLng(s.latLng.lat()-t,s.latLng.lng()-i),_=n.getProjection().fromLatLngToDivPixel(s.latLng),a&&(n.crossDiv_.style.left=_.x+"px",n.crossDiv_.style.top=_.y+"px",n.crossDiv_.style.display="",_.y-=p),n.marker_.setPosition(n.getProjection().fromDivPixelToLatLng(_)),a&&(n.eventDiv_.style.top=_.y+p+"px"),google.maps.event.trigger(n.marker_,"drag",s)):(t=s.latLng.lat()-n.marker_.getPosition().lat(),i=s.latLng.lng()-n.marker_.getPosition().lng(),e=n.marker_.getZIndex(),r=n.marker_.getPosition(),o=n.marker_.getMap().getCenter(),a=n.marker_.get("raiseOnDrag"),g=!0,n.marker_.setZIndex(1e6),s.latLng=n.marker_.getPosition(),google.maps.event.trigger(n.marker_,"dragstart",s)))}),google.maps.event.addDomListener(document,"keydown",function(e){g&&27===e.keyCode&&(a=!1,n.marker_.setPosition(r),n.marker_.getMap().setCenter(o),google.maps.event.trigger(document,"mouseup",e))}),google.maps.event.addDomListener(this.eventDiv_,"click",function(e){(n.marker_.getDraggable()||n.marker_.getClickable())&&(s?s=!1:(google.maps.event.trigger(n.marker_,"click",e),h(e)))}),google.maps.event.addDomListener(this.eventDiv_,"dblclick",function(e){(n.marker_.getDraggable()||n.marker_.getClickable())&&(google.maps.event.trigger(n.marker_,"dblclick",e),h(e))}),google.maps.event.addListener(this.marker_,"dragstart",function(){g||(a=this.get("raiseOnDrag"))}),google.maps.event.addListener(this.marker_,"drag",function(){g||a&&(n.setPosition(p),n.labelDiv_.style.zIndex=1e6+(this.get("labelInBackground")?-1:1))}),google.maps.event.addListener(this.marker_,"dragend",function(){g||a&&n.setPosition(0)}),google.maps.event.addListener(this.marker_,"position_changed",function(){n.setPosition()}),google.maps.event.addListener(this.marker_,"zindex_changed",function(){n.setZIndex()}),google.maps.event.addListener(this.marker_,"visible_changed",function(){n.setVisible()}),google.maps.event.addListener(this.marker_,"labelvisible_changed",function(){n.setVisible()}),google.maps.event.addListener(this.marker_,"title_changed",function(){n.setTitle()}),google.maps.event.addListener(this.marker_,"labelcontent_changed",function(){n.setContent()}),google.maps.event.addListener(this.marker_,"labelanchor_changed",function(){n.setAnchor()}),google.maps.event.addListener(this.marker_,"labelclass_changed",function(){n.setStyles()}),google.maps.event.addListener(this.marker_,"labelstyle_changed",function(){n.setStyles()})]},MarkerLabel_.prototype.onRemove=function(){var e;for(this.labelDiv_.parentNode.removeChild(this.labelDiv_),this.eventDiv_.parentNode.removeChild(this.eventDiv_),e=0;e<this.listeners_.length;e++)google.maps.event.removeListener(this.listeners_[e])},MarkerLabel_.prototype.draw=function(){this.setContent(),this.setTitle(),this.setStyles()},MarkerLabel_.prototype.setContent=function(){var e=this.marker_.get("labelContent");"undefined"==typeof e.nodeType?(this.labelDiv_.innerHTML=e,this.eventDiv_.innerHTML=this.labelDiv_.innerHTML):(this.labelDiv_.innerHTML="",this.labelDiv_.appendChild(e),e=e.cloneNode(!0),this.eventDiv_.innerHTML="",this.eventDiv_.appendChild(e))},MarkerLabel_.prototype.setTitle=function(){this.eventDiv_.title=this.marker_.getTitle()||""},MarkerLabel_.prototype.setStyles=function(){var e,t;this.labelDiv_.className=this.marker_.get("labelClass"),this.eventDiv_.className=this.labelDiv_.className,this.labelDiv_.style.cssText="",this.eventDiv_.style.cssText="",t=this.marker_.get("labelStyle");for(e in t)t.hasOwnProperty(e)&&(this.labelDiv_.style[e]=t[e],this.eventDiv_.style[e]=t[e]);this.setMandatoryStyles()},MarkerLabel_.prototype.setMandatoryStyles=function(){this.labelDiv_.style.position="absolute",this.labelDiv_.style.overflow="hidden","undefined"!=typeof this.labelDiv_.style.opacity&&""!==this.labelDiv_.style.opacity&&(this.labelDiv_.style.MsFilter='"progid:DXImageTransform.Microsoft.Alpha(opacity='+100*this.labelDiv_.style.opacity+')"',this.labelDiv_.style.filter="alpha(opacity="+100*this.labelDiv_.style.opacity+")"),this.eventDiv_.style.position=this.labelDiv_.style.position,this.eventDiv_.style.overflow=this.labelDiv_.style.overflow,this.eventDiv_.style.opacity=.01,this.eventDiv_.style.MsFilter='"progid:DXImageTransform.Microsoft.Alpha(opacity=1)"',this.eventDiv_.style.filter="alpha(opacity=1)",this.setAnchor(),this.setPosition(),this.setVisible()},MarkerLabel_.prototype.setAnchor=function(){var e=this.marker_.get("labelAnchor");this.labelDiv_.style.marginLeft=-e.x+"px",this.labelDiv_.style.marginTop=-e.y+"px",this.eventDiv_.style.marginLeft=-e.x+"px",this.eventDiv_.style.marginTop=-e.y+"px"},MarkerLabel_.prototype.setPosition=function(e){var t=this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());"undefined"==typeof e&&(e=0),this.labelDiv_.style.left=Math.round(t.x)+"px",this.labelDiv_.style.top=Math.round(t.y-e)+"px",this.eventDiv_.style.left=this.labelDiv_.style.left,this.eventDiv_.style.top=this.labelDiv_.style.top,this.setZIndex()},MarkerLabel_.prototype.setZIndex=function(){var e=this.marker_.get("labelInBackground")?-1:1;"undefined"==typeof this.marker_.getZIndex()?(this.labelDiv_.style.zIndex=parseInt(this.labelDiv_.style.top,10)+e,this.eventDiv_.style.zIndex=this.labelDiv_.style.zIndex):(this.labelDiv_.style.zIndex=this.marker_.getZIndex()+e,this.eventDiv_.style.zIndex=this.labelDiv_.style.zIndex)},MarkerLabel_.prototype.setVisible=function(){this.labelDiv_.style.display=this.marker_.get("labelVisible")&&this.marker_.getVisible()?"block":"none",this.eventDiv_.style.display=this.labelDiv_.style.display},inherits(MarkerWithLabel,google.maps.Marker),MarkerWithLabel.prototype.setMap=function(e){google.maps.Marker.prototype.setMap.apply(this,arguments),this.label.setMap(e)};

function mapInit() {
    mapjs.beforeInit();
    function getDirections(element) {
        mapjs.beforeDirections(element);
        element.directionOptions = {
            origin: new google.maps.LatLng(element.coords.latitude, element.coords.longitude),
            destination: new google.maps.LatLng(element.places[0].latitude, element.places[0].longitude),
            travelMode: google.maps.DirectionsTravelMode[element.dataset.travel_mode.toUpperCase()],
            unitSystem: google.maps.UnitSystem[element.dataset.units.toUpperCase()]
        };
        
        element.directionsService.route(element.directionOptions, function (response) {
            element.directions = response;
            if (response.routes.length){
                [].forEach.call(
                    document.querySelectorAll(element.dataset.duration_holder), 
                    function(elem){
                        elem.innerHTML = response.routes[0].legs[0].duration.text
                    }
                );
               [].forEach.call(
                    document.querySelectorAll(element.dataset.distance_holder), 
                    function(elem){
                        elem.innerHTML = response.routes[0].legs[0].distance.text
                    }
                );
            }
            element.bounds = new google.maps.LatLngBounds;
            element.bounds.extend(element.places[0].marker.position);
            element.bounds.extend(new google.maps.LatLng(element.coords.latitude, element.coords.longitude));
            element.map.fitBounds(element.bounds);
            element.visitorMarker = new MarkerWithLabel({
                labelAnchor: new google.maps.Point(8, 22),
                icon: " ",
                labelContent: '<i class="fa ' + element.dataset.visitor_icon + ' fa-2x" style="color:' + element.dataset.visitor_color + ';"></i>',
                labelStyle: {
                    color: element.dataset.visitor_color
                },
                position: new google.maps.LatLng(element.coords.latitude, element.coords.longitude),
                map: element.map
            });
            element.directionsDisplay.setDirections(response);
            mapjs.afterDirections(element);
        });
    }
    function compare(a, b) {
        if (a.distance < b.distance)
            return -1;
        if (a.distance > b.distance)
            return 1;
        return 0;
    }

    function distance(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var φ1 = lat1 * Math.PI / 180;
        var φ2 = lat2 * Math.PI / 180;
        var Δφ = (lat2 - lat1) * Math.PI / 180;
        var Δλ = (lon2 - lon1) * Math.PI / 180;
        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return d = R * c;
    }
    
    Array.prototype.forEach.call(document.getElementsByClassName("map-canvas"), function (element) {
        mapjs.beforeRender(element);
        element.createMap = function(){
            element.places = JSON.parse(element.dataset.mapobj);
            element.mapSettings = {
                styles: window.mapjs.mapstyles,
                zoom: window.mapjs.defaultzoom,
                disableDefaultUI: true,
                scrollwheel: false,
                navigationControl: false,
                mapTypeControl: false,
                scaleControl: false,
                draggable: false
            };
            element.options = JSON.parse(element.dataset.options);
            for (var attr in element.options) { element.mapSettings[attr] = element.options[attr]; }
            element.map = new google.maps.Map(element, element.mapSettings);
            element.bounds = new google.maps.LatLngBounds;
            element.infoWindow = new google.maps.InfoWindow;
            function addToMap(geoloc) {
                for (i = 0; i < element.places.length; i++) {
                    if (geoloc) {
                        element.places[i].distance = distance(element.coords.latitude, element.coords.longitude, element.places[i].latitude, element.places[i].longitude);
                    }
                    element.places[i].marker = new MarkerWithLabel({
                        labelAnchor: new google.maps.Point(8, 22),
                        icon: " ",
                        labelContent: '<i class="fa ' + element.places[i].icon + ' fa-2x" style="color:' + element.places[i].color + ';"></i>',
                        labelStyle: {
                            color: element.places[i].color
                        },
                        position: new google.maps.LatLng(element.places[i].latitude, element.places[i].longitude),
                        map: element.map
                    });
                    element.bounds.extend(element.places[i].marker.position);

                    google.maps.event.addListener(element.places[i].marker, "click", function (marker, i) {
                        return function () {
                            element.infoWindow.setContent("<div class=\"mapContent\">" + element.places[i].html + "</div>");
                            element.infoWindow.open(element.map, marker)
                        }
                    }(element.places[i].marker, i))
                }
                if (geoloc){
                    element.directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
                    element.directionsService = new google.maps.DirectionsService;
                    element.directionsDisplay.setMap(element.map);
                    element.places.sort(compare);
                    getDirections(element);
                }
                if(element.places.length == 1 && !geoloc){
                    element.idleListener = google.maps.event.addListener(element.map, "idle", function () {
                        element.map.fitBounds(element.bounds);
                        element.map.setZoom(window.mapjs.defaultzoom);
                        google.maps.event.removeListener(element.idleListener);
                    });
                    window.onresize = function () {
                        element.map.fitBounds(element.bounds);
                        element.map.setZoom(window.mapjs.defaultzoom);
                    }
                } else if (element.places.length > 1 && !geoloc) {
                    window.onresize = function () {
                        element.map.setZoom(window.mapjs.defaultzoom);
                        element.map.fitBounds(element.bounds);
                    }
                    element.idleListener = google.maps.event.addListener(element.map, "idle", function () {
                        element.map.setZoom(window.mapjs.defaultzoom);
                        element.map.fitBounds(element.bounds);
                        google.maps.event.removeListener(element.idleListener);
                    });
                }
            };
            addToMap(false);
            if(element.dataset.geolocation == "true" && "geolocation" in navigator){
                mapjs.beforeGeoloc(element);
                navigator.geolocation.getCurrentPosition(function (response) {
                    element.coords = {
                        latitude: response.coords.latitude,
                        longitude: response.coords.longitude
                    };
                    mapjs.afterGeoloc(element);
                    addToMap(true);
                })
            }
        }
        element.createMap();
        element.destroyMap = function(){
            delete(element.map);
        };
        element.recreateMap = function(){
            delete(element.map);
            element.createMap();
        };
        mapjs.afterRender(element);
    })
}
google.maps.event.addDomListener(window, "load", mapInit());
}
