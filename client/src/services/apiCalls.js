// these are all App-specific default params and functions
const defaultDate = new Date();
const defaultStationUrl = 'https://mock-air.herokuapp.com/asset/stations';
const defaultFlightUrl = 'https://mock-air.herokuapp.com/search?departureStation=';
const defaultStationField = 'iata';
const defaultFormatter = value => value.toISOString().split('T')[0];

export async function getStations(stationUrl = defaultStationUrl) {
  // pulls station data from API
  const response = await fetch(stationUrl);
  const json = await response.json();
  return json;
}

export async function getFlights(
  departStation,
  arriveStation,
  date = defaultDate,
  baseUrl = defaultFlightUrl,
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
