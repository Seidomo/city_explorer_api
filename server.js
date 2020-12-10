'use strict';

const express = require('express');
const superagent = require('superagent');
const cors = require('cors');
const pg = require('pg');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;
const client = new pg.Client(DATABASE_URL);
client.on('error', error => console.error(error));

app.use(cors());


//////////ROUTES/////

app.get('/location', function(req, res){
    console.log(req.query.city)
    client.query('SELECT * FROM cities WHERE search_query=$1;', [req.query.city]).then(data =>{
        
        if(data.rows > 0){
            res.send(rows[0]);  
    }else{
     const LOCATION_API_KEY = process.env.LOCATION_API_KEY;
     const url =`https://us1.locationiq.com/v1/search.php?key=${LOCATION_API_KEY}&q=${req.query.city}&format=json`;
     
     superagent.get(url).then(incominLocation =>{
         const locationData = incominLocation.body;
         const instanceLocation = new Location(locationData, req.query.city);
         client.query(`INSERT INTO cities (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4);`,
         [req.query.city, instanceLocation.display_name, instanceLocation.latitude, instanceLocation.longitude]).then(() =>{
            res.send(instanceLocation);
         } );
         
          
        }).catch(error => console.log(error));
    };
})
});

 
   
app.get('/weather', function(req, res){
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
    const url =`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&days=8&lon=${lon}&lat=${lat}`;
    superagent.get(url).then (incomingWeather => {
            const  weatherData = incomingWeather.body;
            const  getWeatherArray = weatherData.data.map(instanceWeather => new Weather(instanceWeather));
                res.send(getWeatherArray);
                       
    }).catch(error => console.log(error));
            
            
     });

app.get('/trails', function(req,res){
    
    const TRAIL_API_KEY = process.env.TRAIL_API_KEY;
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    const url =`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=10&key=${TRAIL_API_KEY}`;
    superagent.get(url).then(incomingTrail =>{
        const trailData = incomingTrail.body;
       
      const  getTrailData = trailData.trails.map(instanceTrail => new Trail(instanceTrail));
      console.log(getTrailData);
        res.send(getTrailData);
        
    }).catch(error => console.log(error));
})


      
      


function Location (location, city){
    this.search_query = city;
    this.formatted_query = location[0].display_name;
    this.latitude = location[0].lat;
    this.longitude = location[0].lon;
    
}

function Weather (weather){
    this.forecast = weather.weather.description;
    this.time = weather.valid_date;
}

function Trail (trail){
    this.name = trail.name;
    this.location = trail.location;
    this.lenght = trail.length;
    this.stars = trail.stars;
    this.star_votes = trail.starVotes;
    this.summary = trail.summary;
    this.trail_url = trail.url;
    this.conditions = trail.conditionStatus;
    this.condition_date = trail.conditionDate;
    this.condition_time = trail.conditionDate;
}









///// ERROR HANDLING

app.use( '*', (request, response) => {
    response.status(404).send('SORRY CAN YOU PLEASE RELOAD THE PAGE?')
});

client.connect().then(() => {
    app.listen(PORT, ()=> console.log(`Seid's app is listening ${PORT}`));
}).catch(error => console.error(error));









