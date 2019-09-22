require('dotenv').config();
const { connectToDb } = require('./utils/mongoose');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const socket = require('socket.io');
const ConversationSocket = require('./socket/ConversationSocket');
const StatusSocket = require('./socket/StatusSocket');
const { httpRequestAuth, socketAuth } = require('./middleware/authentication');

/** Connect to the database **/
connectToDb();

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
