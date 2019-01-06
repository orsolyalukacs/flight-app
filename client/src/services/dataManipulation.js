export function getConnectedStations (depart, stations) {
  let connectionIatas = mapStationsToIata(depart.connections)
  return stations.filter(station => { return connectionIatas.indexOf(station.iata) >= 0 })
}

export function mapStationsToIata (stations) {
  return stations.map(elem => elem.iata)
}

export function summaryTextFormatter (data) {
  var string = ''
  if (data.departTicket) {
    string = string + 'depart ticket ' + data.departTicket.bundle + ' '
  }
  if (data.returnTicket) {
    string = string + 'return ticket ' + data.returnTicket.bundle
  }
  return string
}
