export function mapStationsToIata(stations) {
  return stations.map(elem => elem.iata);
}

export function getConnectedStations(depart, stations) {
  const connectionIatas = mapStationsToIata(depart.connections);
  return stations.filter(station => connectionIatas.indexOf(station.iata) > 0);
}

export function itemTextFormatter(item) {
  const departureTime = item.operationStartDate.split('T')[1].split(' + ')[0];
  const arriveTime = item.rescueEndDate.split('T')[1].split('+')[0];
  const arriveDate = arriveTime.split(':').splice(0, 2);
  const departureDate = departureTime.split(':').splice(0, 2);
  return `${item.iata} - ${departureDate.join(':')} - ${arriveDate.join(':')}`;
}

export function validateStations(items) {
  function compare(a, b) {
    if (a.shortName < b.shortName) {
      return -1;
    }
    if (a.shortName > b.shortName) {
      return 1;
    }
    return 0;
  }
  // console.log(items.data);
  const filteredItems = items.filter(item => item.connections.map(elem => elem.hasOwnProperty('iata')).some(elem => elem));
  filteredItems.sort(compare);
  return filteredItems;
}
