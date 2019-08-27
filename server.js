require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const socket = require('socket.io');
const ConversationSocket = require('./socket/ConversationSocket');
const StatusSocket = require('./socket/StatusSocket');
const { httpRequestAuth, socketAuth } = require('./middleware/authentication');

/** Connect to the database **/
const dbConnectURL = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_BASE_URL}:${process.env.DB_PORT}/${process.env.MAIN_DB_NAME}`;
console.log(dbConnectURL);
mongoose.connect(dbConnectURL, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex:true}).then(function(){
    console.info('Successfully connected to the database: ' + process.env.MAIN_DB_NAME + ' using username: '+process.env.DB_USERNAME + ' on port: '+process.env.DB_PORT);
}).catch(function (error) {
    console.error(error);
});

/** Express app **/
const app = express();
// app.use('*', cors({ origin: 'http://localhost:3000' }));
app.use(cors());
/** graphQL setup **/
//Graphql Schema
const schema = require('./graphql/schema');
//Add it to the express app as a middleware
app.use(
    '/graphql',
    httpRequestAuth,
    graphqlHTTP( req => ({
        schema,
        context: {
            user: req.user,
            error: req.error
        },
        graphiql: true
    }))
);

/** Server status endpoint **/
app.use('/status', function (req, res) {
    res.status(200).send("200 OK: Server is up and running!");
});

/** Start server **/
const port = process.env.MAIN_SERVER_PORT ? process.env.MAIN_SERVER_PORT : 3000;
const server = app.listen(port, function(){
    console.info('Server is successfully launched and can be reached on port:' + port);
});

/** Setup socket **/
const io = socket(server);
new ConversationSocket(io).listen();
new StatusSocket(io).listen();
