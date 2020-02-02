/**
 function returns true only if the first parameter passed in is a number 
and is between the other two numbers passed in
used to validate coordinates passed in are correct
 */
function typeAndRangeCheck(num, min, max) {
    return typeof num === 'number' && ((num - min) * (num - max) <= 0);
};

/**
 validate the coordinates. will make sure they are numbers
latitude must be between -90, 90. Longitude must be between -180, 180
mongoose validator runs once for each property. wanted to make one reusable function
so need conditional logic to ensure null values do not get processed
 */
module.exports.validateCoordinates = (latitude, longitude) => {
    if (latitude) {
        return typeAndRangeCheck(latitude, -90, 90)
    };
    if (longitude) {
        return typeAndRangeCheck(longitude, -180, 180)
    };
};


/**
required to measure distance on spherical object and angular calculations
angles must be radians for trigonometric functions
code found from https://www.w3resource.com/javascript-exercises/javascript-math-exercise-33.php
 */
Number.prototype.toRadians = function () {
    return this * (Math.PI / 180);
};


/**
 returns distance between two different geo location points
uses haversine formula for shortest distance between two points on earth
is more performant and more accurate than alternative (spherical cosines option) 
references here: https://gis.stackexchange.com/questions/4906/why-is-law-of-cosines-more-preferable-than-haversine-when-calculating-distance-b
and here: https://www.movable-type.co.uk/scripts/latlong.html
 */
module.exports.haversineDistance = (last, current) => {
    // R is mean radius of the earth in metres
    const R = 6378.137;

    // φ is lat in radians, λ is long in radians
    // convert necsssary lat/long coords to radians
    const φ1 = last.latitude.toRadians();
    const φ2 = current.latitude.toRadians();
    const Δφ = (current.latitude - last.latitude).toRadians();
    const Δλ = (current.longitude - last.longitude).toRadians();
    
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    
    // angular distance in radians
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // get the distance in metres
    const d = R * c;
    return d;
};