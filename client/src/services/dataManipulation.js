export function mapStationsToIata(stations) {
  return stations.map(elem => elem.iata);
}

export function getConnectedStations(depart, stations) {
  const connectionIatas = mapStationsToIata(depart.connections);
  return stations.filter(station => connectionIatas.indexOf(station.iata) > 0);
}

export function itemTextFormatter(item) {
  const departTime = item.departure.split('T')[1].split('+')[0];
  const arriveTime = item.arrival.split('T')[1].split('+')[0];
  const departJoined = departTime.split(':').splice(0, 2);
  const arriveJoined = arriveTime.split(':').splice(0, 2);
  return `${departJoined.join(':')} - ${arriveJoined.join(':')}`;
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
  const filteredItems = items.filter(item => item.connections.map(elem => elem.hasOwnProperty('iata')).some(elem => elem));
  filteredItems.sort(compare);
  return filteredItems;
}
