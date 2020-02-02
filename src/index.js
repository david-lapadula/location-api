// Bring in .end and express server dependancies
require('dotenv').config();
const express = require('express'),

// register the app
app = express();

// store reference to  port
const { PORT } = process.env;
// mongodb/mongoose config
const mongodb = require('./config/mongodb');

// initialize db
mongodb(); 

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// api routes
app.use('/api', require('./routes'));

// server listener
app.listen(PORT, () => console.log(`server up at port:${PORT}`));
