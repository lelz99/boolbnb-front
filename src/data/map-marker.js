function mapMarker() {
    const lat = this.apartment.latitude;
    const lng = this.apartment.longitude;

    console.log(lat);
    console.log(lng);

    const yourApartment = {
        lat: lat,
        lng: lng
    };

    // Predispongo le variabili per mappa
    let map = tt.map({
        key: API_KEY,
        container: 'map-div',
        center: yourApartment,
        zoom: 13
    });

    // Inserisco il marker
    let customMarker = new tt.Marker({
        element: createCustomMarkerElement('#172BA1'),
    })
        .setLngLat([lng, lat])
        .addTo(map);

    // Custom Marker
    function createCustomMarkerElement(color) {
        let markerElement = document.createElement('div');
        markerElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="24px" height="24px">
            <path d="M0 0h24v24H0V0z" fill="none"/> 
            <path d="M11.99 2c-4.41 0-8 3.59-8 8 0 5.25 8 14 8 14s8-8.75 8-14c0-4.41-3.59-8-8-8zm0 12.75c-1.48 0-2.68-1.2-2.68-2.68s1.2-2.68 2.68-2.68 2.68 1.2 2.68 2.68-1.2 2.68-2.68 2.68z"/>
        </svg>
        `;
        return markerElement;
    }
}

export default mapMarker;