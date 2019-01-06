export function getConnectedStations (depart, stations) {
  let connectionIatas = mapStationsToIata(depart.connections)
  return stations.filter(station => { return connectionIatas.indexOf(station.iata) >= 0 })
}

export function mapStationsToIata (stations) {
  return stations.map(elem => elem.iata)
}

export function summaryTextFormatter (data) {
  console.log(data)
  var string = ''
  if (data.departTicket) {
    string = string + 'depart ticket: ' + data.departTicket.price + ' '
    console.log(data)
  }
  if (data.returnTicket) {
    string = string + 'return ticket: ' + data.returnTicket.price
  }
  return string
}

export function itemTextFormatter (item) {
  // return JSON.stringify(item.departure)
  var departTime = item.departure.split('T')[1].split('+')[0]
  var arriveTime = item.arrival.split('T')[1].split('+')[0]
  var departJoined = departTime.split(':').splice(0, 2)
  var arriveJoined = arriveTime.split(':').splice(0, 2)
  return departJoined.join(':') + ' - ' + arriveJoined.join(':')
}
