Ext.define('Ext.ux.GeoCodeProxy', {

    extend: 'Ext.data.proxy.Client',

    alias: 'proxy.geocode',

    constructor: function(config) {
        this.callParent([config]);
        this.setReader(this.reader);
    },

    getGeoCoder: function() {
        if (!this.geocoder) {
            this.geocoder = new google.maps.Geocoder();
        }
        return this.geocoder;
    },

    read: function(operation, callback, scope) {

        var me = this,
            reader = me.getReader(),
            geocoder = this.getGeoCoder(),
            addr = operation.params.query;

        geocoder.geocode( {'address': addr }, function(results, status) {
            var data = [];
            if (status === google.maps.GeocoderStatus.OK) {
                for (var i = 0, l = results.length; i < l; i++) {
                    var country = null;
                    var details = results[i].address_components;
                    for (var j = 0, k = details.length; j < k; j++) {
                        var ci = details[j].types.indexOf('country');
                        if (ci > -1) country = {
                            id: details[j].short_name,
                            name: details[j].long_name
                        };
                    }
                    data.push({
                        address: results[i].formatted_address,
                        lat: results[i].geometry.location.lat(),
                        lng: results[i].geometry.location.lng(),
                        country: country
                    });
                }
            }

            var result = reader.read(data);
            Ext.apply(operation, {
                resultSet: result
            });
            operation.setCompleted();
            operation.setSuccessful();
            Ext.callback(callback, scope || me, [operation]); 
        });
        
    },

    clear: Ext.emptyFn
});