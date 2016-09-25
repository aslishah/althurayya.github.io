/**
 * Created by rostam on 25.09.16.
 * Search Toponym
 */
function active_search() {
    $('#searchInput').on('keyup', function () {
        Object.keys(markers).forEach(function (key) {
            var searchTitle = markers[key].options.searchTitle.toUpperCase();
            var cornuURI = markers[key].options.cornu_URI;
            var arabicTitle = markers[key].options.arabicTitle;
            var markerSearchTitle = [];
            markerSearchTitle.push(searchTitle, cornuURI, arabicTitle);
            var searchTerm = $('#searchInput').val().toUpperCase();
            if (searchTerm !== "") {
                if (markerSearchTitle.indexOf(searchTerm) != -1) {
                    customMarkerStyle(markers[key], "red", 1);
                }
                else {
                    customMarkerStyle(markers[key], colorLookup[markers[key].options.region], 0.2)
                }
            }
            else if (searchTerm === "") {
                myzoom();
                customMarkerStyle(markers[key], colorLookup[markers[key].options.region], 1)
            }
        })
    });
}

function active_autocomp(auto_list) {
    /*
     * Autocomplete the search input
     */
    $("#searchInput").autocomplete({
        appendTo: "#searchPane",
        source: auto_list,
        minLength: 4,
        select: function (e, ui) {
            var selected = ui.item.value.toUpperCase();
            var selectedMarker;
            Object.keys(markers).forEach(function (key) {
                markerLabels[key].setLabelNoHide(false);
                var markerSearchTitle = markers[key].options.searchTitle.toUpperCase();
                var markerTopURI = markers[key].options.cornu_URI;
                var markerArabicTitle = markers[key].options.arabicTitle;
                // Change the circle marker color to red if it matches the selected search value
                if (markerSearchTitle == selected || markerArabicTitle == selected
                    || markerTopURI == selected) {
                    selectedMarker = markers[key];
                    customMarkerStyle(markers[key], "red", 1)
                    if (selected.indexOf("ROUTPOINT") !== -1)
                        console.log("if: " + markers[key].options.searchTitle)
                }
                // else, make them pale
                else {
                    customMarkerStyle(markers[key], colorLookup[markers[key].options.region], 0.2)
                    if (selected.indexOf("ROUTPOINT") !== -1)
                        console.log("else: " + markers[key].options.searchTitle)
                }
            })
            // re-center the map if the selected item exist!
            if (selectedMarker !== undefined) {
                console.log(selectedMarker.options)
                var lat = selectedMarker.options.lat;
                var lng = selectedMarker.options.lng;
                map.panTo(new L.LatLng(lat, lng));
            }
        }
    });
}