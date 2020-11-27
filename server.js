'use strict';



const express = require('express');

const cors = require('cors');
require('dotenv').config();

// app.listen(PORT);

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());












///// ERROR HANDLING

app.use( '*', (request, response) => {
    response.status(404).send('SOORY CAN YOU PLEASE RELOAD THE PAGE?')
});