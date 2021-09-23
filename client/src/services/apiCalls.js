// these are all App-specific default params and functions
import config from '../../api_config';

const defaultDate = new Date();
const apiKey = config.API_KEY;
const airports = `https://api.aviationstack.com/v1/airports?access_key=${apiKey}`;
// const defaultStationUrl = 'https://mock-air.herokuapp.com/asset/stations';
// const defaultFlightUrl = 'https://mock-air.herokuapp.com/search?departureStation=';
const defaultStationField = 'iata';
const defaultFormatter = value => value.toISOString().split('T')[0];

export async function getStations(stationUrl = airports) {
  // pulls station data from API
  const response = await fetch(stationUrl);
  const json = await response.json();
  return json;
}

console.log(airports);

export async function getFlights(
  departStation,
  arriveStation,
  date = defaultDate,
  baseUrl = airports,
  stationField = defaultStationField,
  dateFormatter = defaultFormatter,
) {
  // this gets flights given a departing and arrival station and depart date
  // hides all data formatting from the App
  // use args in the second row for reusability
  const departIata = departStation[stationField];
  const arriveIata = arriveStation[stationField];
  const dateString = dateFormatter(date);
  const response = await fetch(
    `${baseUrl + departIata}&arrivalStation=${arriveIata}&date=${dateString}`,
  );
  const data = response.json();
  return data;
}
