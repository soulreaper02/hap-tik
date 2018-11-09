'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const expressValidator = require('express-validator');
const cors = require('cors');
const chalk = require('chalk');
const expressSession = require('express-session');

const app = express();
const dbConfig = require('./configuration/database');


// configuration
app.set('port', (process.env.PORT || 9000));
mongoose.connect(dbConfig.connectionString, { useNewUrlParser: true });

// setting up express application
app.use(morgan('dev')); //logs every request to the console.
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.set('trust proxy', 1)
app.use(expressSession({ secret: 'aSecretKey', saveUninitialized: true, resave: true }));
app.use(expressValidator());
app.use(cors());

//start our express application
mongoose.connection.on('connected', function(){
    app.listen(app.get('port'), function() {
        const url = 'http://localhost:' + app.set('port');
        console.log('Application running on port: ', chalk.green(app.get('port')));
        console.log('click to open in a browser: ' + url );  
    });
});


//routes 
require('./routes/user')(app,mongoose,chalk);
require('./routes/follow')(app,mongoose,chalk);
require('./routes/tweets')(app,mongoose,chalk);
