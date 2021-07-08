const mongoose = require('mongoose');
const setting = require('../config')
const connectDB = () => {
    mongoose.connect(setting.MONGODB_CONF.CONNECTION_STRING, setting.MONGODB_CONF.OPTIONS, ()=>{
        console.log('connected');
    });
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on('connected', function () {
        console.log('Mongoose default connection open to ' + setting.MONGODB_CONF.CONNECTION_STRING);
    });

    // If the connection throws an error
    db.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    db.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection 
    process.on('SIGINT', function () {
        db.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

};

module.exports = connectDB;