'use strict';



const express = require('express');

const cors = require('cors');
require('dotenv').config();

// app.listen(PORT);

const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT);
app.use(cors());

// app.get('/location', function(req, res){
    
//     const getLocation = require('./data/location.json');
//     const instanceLocation = new Location(getLocation);
    
    
// });












///// ERROR HANDLING

app.use( '*', (request, response) => {
    response.status(404).send('SORRY CAN YOU PLEASE RELOAD THE PAGE?')
});