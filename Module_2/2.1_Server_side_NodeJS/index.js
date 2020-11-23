
const { json, response } = require('express');
const express = require('express');
const DataStore = require('nedb');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

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
        if(err){
            console.log('there was an error with the db');
            response.end();
            return;
        }
        response.json(data);
    });
});
