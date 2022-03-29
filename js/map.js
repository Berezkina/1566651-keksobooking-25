import {markupCard} from './card-markup.js';
import {deactivateForms} from './toggle-state.js';
import {MapSettings} from './consts.js';
import {getData} from './api.js';

const mapFilters = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const addressField = adForm.querySelector('#address');

deactivateForms(true);

const setAddressFieldValue = (address) => {
  addressField.value = `${address.lat.toFixed(5)}, ${address.lng.toFixed(5)}`;
};

const map = L.map('map-canvas')
  .on('load', () => {
    deactivateForms(false);
    setAddressFieldValue(MapSettings.CENTER);
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

const mainPinIcon = L.icon ({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  setAddressFieldValue(evt.target.getLatLng());
});

//Показать объявления на карте

const offerPinIcon = L.icon ({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

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

getData((offers) => {
  offers.forEach(({author, offer, location}) => {
    createOfferMarker({author, offer, location});
  });
});

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

export {resetMap};
