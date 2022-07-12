jQuery(function ($) {
    new BravoMapEngine('map_content', {
        disableScripts: true,
        fitBounds: true,
        center: [51.505, -0.09],
        zoom: 8,
        ready: function (engineMap) {
            engineMap.on('click', function (dataLatLng) {
                engineMap.clearMarkers();
                engineMap.addMarker(dataLatLng, {
                    icon_options: {}
                });
                $("input[name=map_lat]").attr("value", dataLatLng[0]);
                $("input[name=map_lng]").attr("value", dataLatLng[1]);
            });
            engineMap.on('zoom_changed', function (zoom) {
                $("input[name=map_zoom]").attr("value", zoom);
            })
        }
    });
})