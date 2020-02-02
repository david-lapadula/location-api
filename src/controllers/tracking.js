// import user schema
const User = require('../models/user');
// helper method to return the distance between two geo locations
const { haversineDistance } = require('../helpers');

// controller takes in user id and current location to retrieve user and find distance
module.exports.checkIfHome = async (req, res) => {
  let { id, latitude, longitude } = req.params;

  try {
    // find the user and get all required coordinates 
    let user = await User.findById(id);
    // id, lat, and longitude all required by this controller
    if (!user) throw new Error('Could not find user. Please try again');
    if (!latitude || !longitude) throw new Error('Latitude and Longitude of current location are required');

    // when number comes in params it is a string so must convert it
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);
    
    // store reference to the variables from instance of user
    const { homeLatitude, homeLongitude, lastLatitude, lastLongitude } = user;

    // calculate how far user was from their house in the last request
    // if last latitude or last latitude is null, they have yet to leave their house, so sub in home location coords
    const lastDistanceFromHome = haversineDistance(
      { latitude: homeLatitude, longitude: homeLongitude },
      { latitude: lastLatitude || homeLatitude, longitude: lastLongitude || homeLongitude }
    );

    // calculate current distance from house
    const currentDistanceFromHome = haversineDistance(
      { latitude: homeLatitude, longitude: homeLongitude },
      { latitude, longitude },
    );

    // change the last visited property of the user to where the location of the latest request
    // Passive flow functionality to track the users current location
    await User.updateOne({
      _id: id,
      lastLatitude: latitude,
      lastLongitude: longitude
    });

    /**
    Active flow functionality
    only send an alert to the client if they are currently > 200m from their house 
    AND their last location was < 200m from their house
    This is required becuase a notification is only necessary when the user was at home and then leaves
    If their last location was > 200m from home, and still is, they are still out and do not need a reminder
    For now the API just returns a truthy for alert value if the user needs to be reminded
    How the notification gets sent is application specific. It would probably be a push notification, or text message
     */
    if (
      lastDistanceFromHome <= 0.200 &&
      currentDistanceFromHome >= 0.200
    ) {
      // using a 201 reponse because a notification would have to be generated here
      res.status(201).json({ alert: true });
    } else {
      // use a 204 respons to identify that the server has fulfilled the request
      // but there is to information in the response, because there would be no reminder needed
      res.status(204).json({});
    };


  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  };

}; 
