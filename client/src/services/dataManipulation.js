export function getConnectedStations (depart, stations) {
  let connectionIatas = mapStationsToIata(depart.connections)
  return stations.filter(station => { return connectionIatas.indexOf(station.iata) > 0 })
}

export function mapStationsToIata (stations) {
  return stations.map(elem => elem.iata)
}

export function itemTextFormatter (item) {
  let departTime = item.departure.split('T')[1].split('+')[0]
  let arriveTime = item.arrival.split('T')[1].split('+')[0]
  let departJoined = departTime.split(':').splice(0, 2)
  let arriveJoined = arriveTime.split(':').splice(0, 2)
  return departJoined.join(':') + ' - ' + arriveJoined.join(':')
}

export function validateStations (items) {
  function compare (a, b) {
    if (a.shortName < b.shortName) {
      return -1
    }
    if (a.shortName > b.shortName) {
      return 1
    }
    return 0
  }
  let filteredItems = items.filter(item => { return (item.connections.map(elem => elem.hasOwnProperty('iata')).some(elem => elem)) })
  filteredItems.sort(compare)
  return filteredItems
}
