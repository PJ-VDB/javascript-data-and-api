const {
    json,
    response
} = require('express');
require('dotenv').config();

const express = require('express');
const DataStore = require('nedb');
const app = express();
const fetch = require('node-fetch');
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({
    limit: '1mb'
}));

//set up and load a database
const database = new DataStore('database.db');
database.loadDatabase();

app.post('/api', (request, response) => {
    console.log('I got a request!');
    const timestamp = Date.now();
    // console.log(request.body);
    const data = request.body;
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);

    // console.log(database);
});

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        console.log('data was requested');
        if (err) {
            console.log('there was an error with the db');
            response.end();
            return;
        }
        response.json(data);
    });
});

app.get('/weather/:latlon', async (request, response) => {
    // const lat = 48.229201599999996;
    // const lon = -1.5300695;
    console.log(request.params);
    const latlon = request.params.latlon.split(',');
    console.log(latlon);
    const lat = latlon[0];
    const lon = latlon[1];
    console.log(lat, lon);
    const API_KEY = process.env.API_KEY;
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();

    // const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}&radius=20000`;
    const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
    const aq_response = await fetch(aq_url);
    const aq_data = await aq_response.json();

    const data = {
        weather: weather_data,
        air_quality: aq_data
    }

    response.json(data);
    });

//  `https://api.openaq.org/v1/latest?coordinates=48.229201599999996,`
 
