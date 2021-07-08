const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');
const cors = require('cors');
const config = require('./config');
//const api_router = require('./api/routes');
const connectDB = require('./core/db');
const api_router = require('./api/routes/router');
const create_server = () => {
    const app = express();
    app.use(cors())
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(compression())
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/api', api_router)
    app.get('', function (req, res) {
        res.json({
            status: 'API Its Working',
            message: 'Welcome to User Management APP crafted with love!'
        });
    });

    app._router.stack.forEach(function(r){
        if (r.route && r.route.path){
            console.log(r.route.path)
        }
    })

    connectDB();


// // catch 404 and forward to error handler
//     app.use(function (req, res, next) {
//         next(createError(404));
//     });

// error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.json(err)
    });
    return app
}


module.exports = create_server;
