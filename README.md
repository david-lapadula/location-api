## Location API

## Table of contents
1. [Description](#description)
2. [Technology](#technology)
3. [Usage](#usage)

## Description
A microserver designed to store user geolocation data and send alerts when a user leaves their home. The client submits requests containing a user ID, latitude, and longitude. The server then monitors the user's location and sends a notification if the user moves more than 200 meters away from their home.


## Technology

- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose ORM](https://mongoosejs.com/)
- [Postman](https://www.getpostman.com/)

## Usage

To run this on your local machine, first ensure that Node, Mongo, and Postman are installed. Links are available in the [Technology](#technology) section.

1. Clone the repository to your local machine. 
```bash
git clone https://github.com/DavidLapadula/LocationAPI.git
cd locationapi
```  

2. Open a terminal in the root directory and run:
```bash
npm install
```  

3. The `.env` file has default values for your MongoDB connection. Ensure they are correct and modify them as needed.

4. Open a terminal in the 'src' directory and run:
```bash
node index.js
``` 

5. Using your MongoDB client, create a user and set the latitude and longitude of their home.

6. Using Postman (or another REST client) you can ping the route `users/checklocation/:id/:latitude/:longitude`. Test with different latitude/longitude values to verify the functionality.

