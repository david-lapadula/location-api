const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// custom helper to make sure coordinates passed in are valid
const { validateCoordinates } = require('../helpers');

/**
 name required for API functionality (i.e returning user specific message)
home lat/long required because essential to core features of program. Need both to calculate distance properly
last visted used for business logic of updating a user when they have travelled 200m from their house
 */
const UserSchema = new Schema({
    name: {
        type: String, required: true,
    },
    homeLatitude: {
        type: Number,
        required: true,
        validate(value) {
            if (!(validateCoordinates(value, null))) {
                throw new Error('Home latitude must be a number between -90 and 90');
            };
        }
    },
    homeLongitude: {
        type: Number,
        required: true,
        validate(value) {
            if (!(validateCoordinates(null, value))) {
                throw new Error('Home longitude must be a number between -180 and 180');
            };
        }
    },
    lastLatitude: {
        type: Number,
        default: null, 
        validate(value) {
            if (value && !(validateCoordinates(value, null))) {
                throw new Error('Last visited latitude must be a number between -90 and 90');
            };
        }
    },
    lastLongitude: {
        type: Number,
        default: null, 
        validate(value) {
            if (value && !(validateCoordinates(null, value))) {
                throw new Error('Last visited longitude must be a number between -180 and 180');
            };
        }
    }

});

module.exports = mongoose.model('User', UserSchema);
