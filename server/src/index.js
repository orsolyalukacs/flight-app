import 'dotenv/config';
import express from 'express';
import cors from 'cors';
let flights = require('./data.json');

const app = express();

app.use(cors());

app.get('/flights', (req, res) => {
    return res.send(Object.values(flights));
});

app.get('/flights/:iata', (req, res) => {
    return res.send(flights.filter(flight => flight["iata"] === req.params.iata));
});

app.get('/flights/:iata/:arrival/', (req, res) => {
    const departure = flights.filter(flight => flight["iata"] === req.params.iata);
    const connections = departure[0].connections;
    const arrival = connections.filter(el => el["iata"] === req.params.arrival)
    return res.send(arrival);
});

app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);
