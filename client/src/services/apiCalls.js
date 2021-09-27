// apicalls.js original
// these are all App-specific default params and functions

const defaultDate = new Date();
const flightUrl = 'http://127.0.0.1:3000/flights/';
// const searchUrl = 'http://127.0.0.1:3000/flights/search?departureStation=';
// const defaultStationUrl = 'https://mock-air.herokuapp.com/asset/stations';
// const defaultFlightUrl = 'https://mock-air.herokuapp.com/search?departureStation=';
const defaultStationField = 'iata';
const defaultFormatter = value => value.toISOString().split('T')[0];

export async function getStations(url = flightUrl) {
  // pulls station data from API
  const response = await fetch(url);
  const json = await response.json();
  console.log(json);
  return json;
}

export async function getFlights(
  departStation,
  arriveStation,
  date = defaultDate,
  baseUrl = flightUrl,
  stationField = defaultStationField,
  dateFormatter = defaultFormatter,
) {
  // this gets flights given a departing and arrival station and depart date
  // hides all data formatting from the App
  // use args in the second row for reusability
  const departIata = departStation[stationField];
  const arriveIata = arriveStation[stationField];
  const dateString = dateFormatter(date);
  console.log(dateString);
  console.log(`${baseUrl + departIata}/${arriveIata}`);
  const response = await fetch(
    // `${baseUrl + departIata}&arrivalStation=${arriveIata}&date=${dateString}`,
    `${baseUrl + departIata}/${arriveIata}`,
  );
  const data = response.json();
  console.log(response);
  return data;
}
