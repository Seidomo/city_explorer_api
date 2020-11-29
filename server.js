'use strict';

const express = require('express');
const superagent = require('superagent');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());


//////////ROUTES/////

app.get('/location', function(req, res){
     const LOCATION_API_KEY = process.env.LOCATION_API_KEY;
     const url =`https://us1.locationiq.com/v1/search.php?key=${LOCATION_API_KEY}&q=${req.query.city}&format=json`;
     
     superagent.get(url).then(incominLocation =>{
         const locationData = incominLocation.body;
         const instanceLocation = new Location(locationData, req.query.city);
         res.send(instanceLocation);
         
     })
});

 
   
app.get('/weather', function(req, res){
    const getWeatherArray = [];
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
    const url =`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&days=8&lon=-122.3300624&lat=47.6038321`;
    superagent.get(url).then (incomingWeather => {
            const  weatherData = incomingWeather.body;
                getWeatherArray = weatherData.data.map(instanceWeather => new Weather(instanceWeather));
                
                       res.send(getWeatherArray);
                       
    })
            
            
     });
      
      


function Location (location, city){
    this.search_query = city;
    this.formatted_query = location[0].display_name;
    this.latitude = location[0].lat;
    this.longitude = location[0].lon;
    
}

function Weather (weather){
    this.forecast = weather[0].description;
    this.time = weather[0].valid_date;
}













///// ERROR HANDLING

app.use( '*', (request, response) => {
    response.status(404).send('SORRY CAN YOU PLEASE RELOAD THE PAGE?')
});

app.listen(PORT, ()=> console.log(`app is listening ${PORT}`));









// try{
//             const getLocation = require('./data/location.json');
//             const instanceCity = req.query.city;
//             const instanceLocation = new Location (getLocation, instanceCity);
//             console.log(instanceLocation, 'new location');
//             res.status(200).json(instanceLocation);
//         }
//         catch(error){
//             console.log(error, 'its not working');
//         }
//     });
     


    // const getWeather = require('./data/weather.json');
    // getWeather.data.forEach(instanceWeather => {
    //      getWeatherArray.push(new Weather (instanceWeather))