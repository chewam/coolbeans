Ext.define('CB.view.dive.Map', {
    extend: 'Ext.Panel',

    requires: ['Ext.ux.GMapPanel'],

    alias: 'widget.divemap',

    title : 'Map',

    layout: 'fit',

    border: false,

    initComponent : function() {

        this.items = [{
            border: false,
            xtype: 'gmappanel',
            zoomLevel: 14,
            gmapType: 'map',
            mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
            mapControls: ['GSmallMapControl','GMapTypeControl','NonExistantControl'],
            setCenter: {
                geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
                marker: {title: 'Fenway Park'}
            },
            markers: [{
                lat: 42.339641,
                lng: -71.094224,
                marker: {title: 'Boston Museum of Fine Arts'},
                listeners: {
                    click: function(e){
                        Ext.Msg.alert({title: 'Its fine', text: 'and its art.'});
                    }
                }
            },{
                lat: 42.339419,
                lng: -71.09077,
                marker: {title: 'Northeastern University'}
            }]
        }];

        this.callParent(arguments);
    },

    setCenter: function(address) {
        var map = this.down('gmappanel').geoCodeLookup(address);
    }

    // afterRender : function(){
    //     
    //     var wh = this.ownerCt.getSize(),
    //         point;
    //         
    //     Ext.applyIf(this, wh);
    //     
    //     this.callParent();     
    //     
    //     if (this.gmapType === 'map'){
    //         this.gmap = new GMap2(this.body.dom);
    //     }
    //     
    //     if (this.gmapType === 'panorama'){
    //         this.gmap = new GStreetviewPanorama(this.body.dom);
    //     }
    //     
    //     if (typeof this.addControl == 'object' && this.gmapType === 'map') {
    //         this.gmap.addControl(this.addControl);
    //     }
    //     
    //     if (typeof this.setCenter === 'object') {
    //         if (typeof this.setCenter.geoCodeAddr === 'string'){
    //             this.geoCodeLookup(this.setCenter.geoCodeAddr);
    //         }else{
    //             if (this.gmapType === 'map'){
    //                 point = new GLatLng(this.setCenter.lat,this.setCenter.lng);
    //                 this.gmap.setCenter(point, this.zoomLevel);    
    //             }
    //             if (typeof this.setCenter.marker === 'object' && typeof point === 'object'){
    //                 this.addMarker(point,this.setCenter.marker,this.setCenter.marker.clear);
    //             }
    //         }
    //         if (this.gmapType === 'panorama'){
    //             this.gmap.setLocationAndPOV(new GLatLng(this.setCenter.lat,this.setCenter.lng), {yaw: this.yaw, pitch: this.pitch, zoom: this.zoom});
    //         }
    //     }
    // 
    //     GEvent.bind(this.gmap, 'load', this, function(){
    //         this.onMapReady();
    //     });
    // 
    // },
    // onMapReady : function(){
    //     this.addMarkers(this.markers);
    //     this.addMapControls();
    //     this.addOptions();  
    // },
    // afterComponentLayout : function(w, h){
    // 
    //     if (typeof this.getMap() == 'object') {
    //         this.gmap.checkResize();
    //     }
    //     
    //     this.callParent(arguments);
    // 
    // },
    // setSize : function(width, height, animate){
    //     
    //     if (typeof this.getMap() == 'object') {
    //         this.gmap.checkResize();
    //     }
    //     
    //     this.callParent(arguments);
    //     
    // },
    // getMap : function(){
    //     
    //     return this.gmap;
    //     
    // },
    // getCenter : function(){
    //     
    //     return this.getMap().getCenter();
    //     
    // },
    // getCenterLatLng : function(){
    //     
    //     var ll = this.getCenter();
    //     return {lat: ll.lat(), lng: ll.lng()};
    //     
    // },
    // addMarkers : function(markers) {
    //     
    //     if (Ext.isArray(markers)){
    //         for (var i = 0; i < markers.length; i++) {
    //             var mkr_point = new GLatLng(markers[i].lat,markers[i].lng);
    //             this.addMarker(mkr_point,markers[i].marker,false,markers[i].setCenter, markers[i].listeners);
    //         }
    //     }
    //     
    // },
    // addMarker : function(point, marker, clear, center, listeners){
    //     var evt;
    //     Ext.applyIf(marker,G_DEFAULT_ICON);
    // 
    //     if (clear === true){
    //         this.getMap().clearOverlays();
    //     }
    //     if (center === true) {
    //         this.getMap().setCenter(point, this.zoomLevel);
    //     }
    // 
    //     var mark = new GMarker(point,marker);
    //     if (typeof listeners === 'object'){
    //         for (evt in listeners) {
    //             if (!listeners.hasOwnProperty(evt)) {
    //                 continue;
    //             }
    //             GEvent.bind(mark, evt, this, listeners[evt]);
    //         }
    //     }
    //     this.getMap().addOverlay(mark);
    // 
    // },
    // addMapControls : function(){
    //     
    //     if (this.gmapType === 'map') {
    //         if (Ext.isArray(this.mapControls)) {
    //             for(var i=0;i<this.mapControls.length;i++){
    //                 this.addMapControl(this.mapControls[i]);
    //             }
    //         }else if(typeof this.mapControls === 'string'){
    //             this.addMapControl(this.mapControls);
    //         }else if(typeof this.mapControls === 'object'){
    //             this.getMap().addControl(this.mapControls);
    //         }
    //     }
    //     
    // },
    // addMapControl : function(mc){
    //     
    //     var mcf = window[mc];
    //     if (typeof mcf === 'function') {
    //         this.getMap().addControl(new mcf());
    //     }    
    //     
    // },
    // addOptions : function(){
    //     
    //     if (Ext.isArray(this.mapConfOpts)) {
    //         for(var i=0;i<this.mapConfOpts.length;i++){
    //             this.addOption(this.mapConfOpts[i]);
    //         }
    //     }else if(typeof this.mapConfOpts === 'string'){
    //         this.addOption(this.mapConfOpts);
    //     }        
    //     
    // },
    // addOption : function(mc){
    //     
    //     var mcf = this.getMap()[mc];
    //     if (typeof mcf === 'function') {
    //         this.getMap()[mc]();
    //     }    
    //     
    // },
    // geoCodeLookup : function(addr) {
    //     
    //     this.geocoder = new GClientGeocoder();
    //     this.geocoder.getLocations(addr, Ext.Function.bind(this.addAddressToMap, this));
    //     
    // },
    // addAddressToMap : function(response) {
    //     var place, addressinfo, accuracy, point;
    //     if (!response || response.Status.code != 200) {
    //         Ext.MessageBox.alert('Error', 'Code '+response.Status.code+' Error Returned');
    //     }else{
    //         place = response.Placemark[0];
    //         addressinfo = place.AddressDetails;
    //         accuracy = addressinfo.Accuracy;
    //         if (accuracy === 0) {
    //             Ext.MessageBox.alert('Unable to Locate Address', 'Unable to Locate the Address you provided');
    //         }else{
    //             if (accuracy < 7) {
    //                 Ext.MessageBox.alert('Address Accuracy', 'The address provided has a low accuracy.<br><br>Level '+accuracy+' Accuracy (8 = Exact Match, 1 = Vague Match)');
    //             }else{
    //                 point = new GLatLng(place.Point.coordinates[1], place.Point.coordinates[0]);
    //                 if (typeof this.setCenter.marker === 'object' && typeof point === 'object'){
    //                     this.addMarker(point,this.setCenter.marker,this.setCenter.marker.clear,true, this.setCenter.listeners);
    //                 }
    //             }
    //         }
    //     }
    //     
    // }
 
});