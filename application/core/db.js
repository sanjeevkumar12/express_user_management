const mongoose = require('mongoose');
const setting = require('../config')

const connectDB = async () => {
    mongoose.connect(setting.MONGODB_URL, {   useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
        });
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on('connected', function () {
        console.log('Mongoose default connection open to ' + setting.MONGODB_URL);
    }); 

    // If the connection throws an error
    db.on('error',function (err) { 
        console.log('Mongoose default connection error: ' + err);
    }); 

    // When the connection is disconnected
    db.on('disconnected', function () { 
        console.log('Mongoose default connection disconnected'); 
    });

    // If the Node process ends, close the Mongoose connection 
    process.on('SIGINT', function() {   
        db.close(function () { 
        console.log('Mongoose default connection disconnected through app termination'); 
        process.exit(0); 
        }); 
    });

  };
  
  module.exports = connectDB;