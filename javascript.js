var map = L.map('map').setView([7.5399, -5.5471], 7);
var userMarker, routingControl;

// Couche OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Configuration des marqueurs
var customIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    className: 'marker-icon'
});

// Données des clubs
var clubs = [
    { name: "Club AquaFit", location: [5.3599, -4.0083], description: "Club de natation à Abidjan" },
    { name: "Swim Academy", location: [6.8506, -5.3103], description: "Académie à Yamoussoukro" },
    { name: "Ocean Plongée", location: [4.9558, -6.0833], description: "Club à San-Pédro" },
    { name: "Nageurs d'Ébène", location: [7.6900, -5.0300], description: "Club à Bouaké" },
    { name: "Nageurs ", location: [5.3329936, -4.3948905], description: "Club à n'da" },
    { name: "Nageurs ", location: [5.3387519, -3.9912366], description: "universite club" },
    { name: "Nageurs ", location: [5.3416428, -4.0223809], description: "gspm" },
    { name: "Club AquaFit", location: [5.3417322, -4.0610058], description: "DAUPHIN D’EQUINOX" },
    { name: "Swim Academy", location: [5.3659814, -3.9940265], description: "CLUB HOUSE" },
    { name: "Ocean Plongée", location: [5.3661522, -4.0738535], description: "ALFRED NOBEL" },
    { name: "Nageurs d'Ébène", location: [5.2932615, -4.0116288], description: "SEAMENS CLUB" },
    { name: "Nageurs ", location: [5.3165107, -4.0266448], description: "HOTEL IVOIRE" },
    { name: "Nageurs ", location: [5.2927893, -3.9925194], description: "SARAFINA ATHLETIC" },
    { name: "Nageurs ", location: [5.3086101, -4.0035474], description: "PISCINE ETAT TREICHVILLE (PET)" },
    { name: "Club AquaFit", location: [5.3585537, -3.8913988], description: "Piscine Dominique Ouattara de Bingerville" },
    { name: "Swim Academy", location: [6.8029946,-5.2544777], description: "HOTEL PRESIDENT YAKRO" },
    { name: "Ocean Plongée", location: [5.3411783, -4.099606], description: "RODIN DE YOPOUGON" },
    { name: "Nageurs d'Ébène", location: [5.35126,-4.0171798], description: "CLUB MUNICIPAL D’ADJAME" },
    { name: "Nageurs ", location: [5.316862,-4.3705513], description: "CLUB ACADEMIE DU ROI DE GLOIRE - DABOU" },
    { name: "Nageurs ", location: [5.3185616,-4.3817002], description: "Hotel AKPARO" },
    { name: "Nageurs ", location: [5.322716,-4.3668915], description: "LEBOUTOU NATATION CLUB - DABOU" },
    { name: "Club AquaFit", location: [6.8043666,-5.2475971], description: "BERAH NATATION CLUB YAKRO" },
    { name: "Swim Academy", location: [5.3659814, -3.9940265], description: "CLUB HOUSE" },
    { name: "Ocean Plongée", location: [5.3661522, -4.0738535], description: "ALFRED NOBEL" },

    
];

// Ajout des marqueurs avec animations
clubs.forEach(club => {
    let marker = L.marker(club.location, { 
        icon: customIcon,
        riseOnHover: true
    })
    .on('mouseover', () => marker.openPopup())
    .on('mouseout', () => marker.closePopup())
    .bindPopup(`<b>${club.name}</b><br>${club.description}`)
    .addTo(map);
});

// Géolocalisation
document.querySelector('.geoloc-btn').addEventListener('click', () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let userPos = [position.coords.latitude, position.coords.longitude];
            
            // Supprimer l'ancien marqueur et itinéraire
            if(userMarker) map.removeLayer(userMarker);
            if(routingControl) map.removeControl(routingControl);

            // Nouveau marqueur utilisateur
            userMarker = L.marker(userPos, {
                icon: L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41]
                }),
                zIndexOffset: 1000
            }).addTo(map);

            // Trouver le club le plus proche
            let closest = clubs.reduce((acc, club) => {
                let dist = map.distance(userPos, club.location);
                return dist < acc.dist ? {loc: club.location, dist} : acc;
            }, {dist: Infinity});

            // Calcul d'itinéraire
            routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(userPos),
                    L.latLng(closest.loc)
                ],
                routeWhileDragging: true,
                lineOptions: { styles: [{color: '#3498db', opacity: 0.7, weight: 5}] },
                show: false
            }).addTo(map);
            
        }, error => {
            alert('Erreur de géolocalisation : ' + error.message);
        });
    } else {
        alert('Géolocalisation non supportée par votre navigateur');
    }
});

// Animation au survol de la carte
map.on('mousemove', e => {
    map.getContainer().style.cursor = 'crosshair';
});
