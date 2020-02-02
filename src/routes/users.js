// Server dependancies
const express = require('express');
const router = express.Router();
// Controllers for setup flow (saving a user and their location)
const usercontrol = require('../controllers/user');

// setup route to save the location of the user
// route takes name, lat, long from the request
router.post('/newuser', usercontrol.userAdd);

module.exports = router;
