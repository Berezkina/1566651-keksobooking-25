import { MapSettings } from './consts.js';
import { markupCard } from './card-markup.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const addressField = adForm.querySelector('#address');

const setAddressFieldValue = (address) => {
  addressField.value = `${address.lat.toFixed(5)}, ${address.lng.toFixed(5)}`;
};

const mainPinIcon = L.icon ({
  iconUrl: MapSettings.MAIN_PIN.iconUrl,
  iconSize: MapSettings.MAIN_PIN.iconSize,
  iconAnchor: MapSettings.MAIN_PIN.iconAnchor
});

const mainPinMarker = L.marker(
  {
    lat: MapSettings.CENTER.lat,
    lng: MapSettings.CENTER.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.on('moveend', (evt) => {
  setAddressFieldValue(evt.target.getLatLng());
});

let isLoaded = false;

const setMapLoaded = () => {
  isLoaded = true;
};

const getMapLoaded = () => isLoaded;

const map = L.map('map-canvas');

const onMapLoad = () => {
  setMapLoaded();
  setAddressFieldValue(MapSettings.CENTER);
};

const initMap = () => {
  map
    .on('load', () => {
      onMapLoad();
    })
    .setView({
      lat: MapSettings.CENTER.lat,
      lng: MapSettings.CENTER.lng,
    }, MapSettings.ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);
};

const markerGroup = L.layerGroup().addTo(map);

const offerPinIcon = L.icon ({
  iconUrl: MapSettings.OFFER_PIN.iconUrl,
  iconSize: MapSettings.OFFER_PIN.iconSize,
  iconAnchor: MapSettings.OFFER_PIN.iconAnchor,
});

const createOfferMarker = ({author, offer, location}) => {
  const offerPinMarker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: offerPinIcon,
    },
  );

  offerPinMarker
    .addTo(markerGroup)
    .bindPopup(markupCard({author, offer}));
};

const clearMarkerGroup = () => markerGroup.clearLayers();

const setOffersMarker = (offers) => {
  clearMarkerGroup();
  offers.forEach(({author, offer, location}) => {
    createOfferMarker({author, offer, location});
  });
};

const resetMap = () => {
  mapFilters.reset();

  map
    .setView({
      lat: MapSettings.CENTER.lat,
      lng: MapSettings.CENTER.lng,
    }, MapSettings.ZOOM)
    .closePopup();

  mainPinMarker.setLatLng({
    lat: MapSettings.CENTER.lat,
    lng: MapSettings.CENTER.lng,
  });

  setAddressFieldValue(MapSettings.CENTER);
};

export { initMap, getMapLoaded, setOffersMarker, clearMarkerGroup, resetMap };

