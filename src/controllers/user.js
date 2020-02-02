// Import user schema
const User = require('../models/user');

module.exports.userAdd = async (req, res) => {
    // all necessary properties coming in the request body
    // model optionally takes last_visited, but it is not required and only used for passive flow to track the users location
    const { latitude, longitude, name } = req.body;

    try {
       /**
        validation defined on the mongoose schema for each property of user
        if the validation passes, save a new user with the information passed in
        this would be used when the app is first initalized by the user, as I am assuming they are home when this request comes in
        */
        let user = await new User({
            name,
            homeLatitude: latitude, 
            homeLongitude: longitude
        }).save();

        // return the user to the client, 201 status for created. 
        res.status(201).json({ user });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });

    };
}; 