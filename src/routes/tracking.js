
// Server dependencies
const express = require('express');
const router = express.Router();
// Controllers for active and passive flow
const locationControl = require('../controllers/tracking');

/**
 route to check where the user is located relative to their house
used for passive and active flow
route takes user id, and lat/long to check against the users home location
Used a put route because user updates should be idempotent
 */
router.put('/checklocation/:id/:latitude/:longitude', locationControl.checkIfHome);

module.exports = router;
