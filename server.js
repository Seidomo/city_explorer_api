'use strict';



const express = require('express');

const cors = require('cors');
require('dotenv').config();

// app.listen(PORT);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('./location', function(req, res){
    const getLocation = require('./data/location.json');
    const instanceLocation = new Location (getLocation);
    res.send(instanceLocation);
});
 
app.get('./weather', function(req, res){
    const getWeatherArray = [];
    const getWeather = require('./data/weather.json');
     getWeather.data.forEach(instanceWeather => {
         getWeatherArray.push(new Weather (instanceWeather))
     }); 
      res.send(getWeatherArray);
})

function Location (location, search_query='seattle'){
    this.searchQuery = search_query.query.city;
    this.lattitude = location.lat;
    this.longitude = location.lon;
}

function Weather (weather){
    this.forecast = weather.weather.description;
    this.time = weather.valid_date;
}












app.listen(PORT);
///// ERROR HANDLING

app.use( '*', (request, response) => {
    response.status(404).send('SORRY CAN YOU PLEASE RELOAD THE PAGE?')
});