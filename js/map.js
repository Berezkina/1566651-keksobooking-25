import { deactivateForms } from './toggle-state.js';
import { MapSettings, NUMBER_OF_OFFERS, API_URL } from './consts.js';
import { showErrorOnMap } from './utils.js';
import { getData } from './api.js';
import { markupCard } from './card-markup.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const addressField = adForm.querySelector('#address');

deactivateForms(true);

//инициализация карты
const map = L.map('map-canvas');

//загрузка и отображение слоев
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const setAddressFieldValue = (address) => {
  addressField.value = `${address.lat.toFixed(5)}, ${address.lng.toFixed(5)}`;
};

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

const setOffersMarker = (offers) => {
  offers.slice(0, NUMBER_OF_OFFERS).forEach(({author, offer, location}) => {
    createOfferMarker({author, offer, location});
  });
};

const onMapLoad = () => {
  deactivateForms(false);
  setAddressFieldValue(MapSettings.CENTER);
  getData(setOffersMarker, showErrorOnMap, API_URL);
};

//событие успешной загрузки карты
map.on('load', () => {
  onMapLoad();
})
  .setView({
    lat: MapSettings.CENTER.lat,
    lng: MapSettings.CENTER.lng,
  }, MapSettings.ZOOM);

//иконка для главного маркера
const mainPinIcon = L.icon ({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

//установка главного маркера
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

//добавление главного маркера на карту
mainPinMarker.addTo(map);

//перемещение главного маркера
mainPinMarker.on('moveend', (evt) => {
  setAddressFieldValue(evt.target.getLatLng());
});

const clearMarkerGroup = () => markerGroup.clearLayers();

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

export { setOffersMarker, clearMarkerGroup, resetMap };

