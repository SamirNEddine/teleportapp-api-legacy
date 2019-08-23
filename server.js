require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

//Connect to the database
const dbConnectURL = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_BASE_URL}:${process.env.DB_PORT}/${process.env.MAIN_DB_NAME}`;
console.log(dbConnectURL);
mongoose.connect(dbConnectURL, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex:true}).then(function(){
    console.info('Successfully connected to the database: ' + process.env.MAIN_DB_NAME + ' using username: '+process.env.DB_USERNAME + ' on port: '+process.env.DB_PORT);
}).catch(function (error) {
    console.error(error);
});

//Express app
const app = express();

//Server status endpoint
app.use('/status', function (req, res) {
    res.status(200).send("200 OK: Server is up and running!");
});

//Start server
const port = process.env.MAIN_SERVER_PORT ? process.env.MAIN_SERVER_PORT : 3000;
app.listen(port, function(){
    console.info('Server is successfully launched and can be reached on port:' + port);
});