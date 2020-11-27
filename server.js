'use strict';


const { response } = require('express');
const express = require('express');
const app = express().require('dotenv').config();
const PORT = process.env.PORT || 3001;
app.listen(PORT);
 











///// ERROR HANDLING

app.use( ('*'), (request, response)) => {
    response.status(404).send('SOORY CAN YOU PLEASE RELOAD THE PAGE?')
}