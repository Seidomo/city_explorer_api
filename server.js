'use strict';



const express = require('express');

const cors = require('cors');
require('dotenv').config();

// app.listen(PORT);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/location', function(req, res){
    try{
        const getLocation = require('./data/location.json');
        const instanceCity = req.query.city;
        const instanceLocation = new Location (getLocation, instanceCity);
        console.log(instanceLocation, 'new location');
        res.status(200).json(instanceLocation);
    }
    catch(error){
        console.log(error, 'its not working');
    }
});
 
app.get('/weather', function(req, res){
    const getWeatherArray = [];
    const getWeather = require('./data/weather.json');
     getWeather.data.forEach(instanceWeather => {
         getWeatherArray.push(new Weather (instanceWeather))
     }); 
      res.send(getWeatherArray);
})

function Location (location, city){
    this.search_query = city;
    this.formatted_query = location[0].display_name;
    this.latitude = location[0].lat;
    this.longitude = location[0].lon;
    console.log(location, 'latest location')
}

function Weather (weather){
    this.forecast = weather.weather.description;
    this.time = weather.valid_date;
}













///// ERROR HANDLING

app.use( '*', (request, response) => {
    response.status(404).send('SORRY CAN YOU PLEASE RELOAD THE PAGE?')
});

app.listen(PORT, ()=> console.log(`app is listening ${PORT}`));