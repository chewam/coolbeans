Ext.define('Ext.ux.GMapPanel', {

    extend: 'Ext.Panel',
    
    alias: 'widget.gmappanel',
    
    initComponent : function() {
        this.mapConfig = Ext.apply(this.mapConfig || {}, {
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.SATELLITE
        });
        this.callParent();        
    },

    showLatLng: function(data) {        
        var location = new google.maps.LatLng(data.lat, data.lng);
        this.marker.setPosition(location);
        this.map.setCenter(location);
    },

    afterRender : function(){
        this.callParent();
        this.map = new google.maps.Map(this.body.dom, this.mapConfig);
        this.geocoder = new google.maps.Geocoder();
        this.marker = new google.maps.Marker({
            map: this.map,
            draggable: true
        });

        google.maps.event.addListener(this.marker, 'drag', Ext.bind(this.handleMarkerMove, this));
    },

    handleMarkerMove: function() {
        this.geocoder.geocode(
            {'latLng': this.marker.getPosition()},
            Ext.bind(function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    console.log("markermove", this, arguments);
                    this.fireEvent('markermove', this, {
                        address: results[0].formatted_address,
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    });
                }
            }, this)
        );
    }
 
});

