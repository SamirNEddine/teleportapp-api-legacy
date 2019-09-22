const mongoose = require('mongoose');
const dbConnectURL = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_BASE_URL}:${process.env.DB_PORT}/${process.env.MAIN_DB_NAME}`;
module.exports.connectToDb = function () {
    mongoose.connect(dbConnectURL, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex:true}).then(function(){
        console.info('Successfully connected to the database: ' + process.env.MAIN_DB_NAME + ' using username: '+process.env.DB_USERNAME + ' on port: '+process.env.DB_PORT);
    }).catch(function (error) {
        console.error(error);
    });

};