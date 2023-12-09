## Location API
This is a small API that can be used as a micro-server to track and alert clients when they have left their home.

* **Features** 
  - The client sends requests with with a User ID, Latitude and Longitude
  - The program will push a notification to the user once they have gone greater than 200m from their home

## Tech/framework used

<b>Built with</b>
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose ORM](https://mongoosejs.com/)
- [Express Web Server](https://expressjs.com/)
- Haversine used for distance calculations

## Installation

### If you want to test the API on your machine: 

<b>First Install some necessary tools</b>
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Postman](https://www.getpostman.com/)

```
1. Fork the repository and clone it into a folder on your computer. 
2. Navgiate to the root directory and run 'npm install' in the terminal'.
3. Navigate into the 'src' directory (cd src) and run the command 'node index.js' in the termal; this point the server should be running.
4. Create a user using your MongoDB client, set the Latitude and Longitude of their home location.
5. Hit the route users/checklocation/:id/:latitude/:longitude. Test with different coordinates to see the funcationality.

```

