const express = require('express');
const cors = require("cors");

const db = require('./DBConnect');
const trackRouter = require('./routes/tracks');
const secureListRouter = require('./routes/secureLists');

// Express
const app = express();

// For serving static front end
app.use(cors());
app.use(express.json());

// For logging requests
app.use((req, res, next) => { // for all routes
    console.log('Request: ', req.method, ' \tPath: ', req.url);
    next(); // keep going
});

// Routes requests for /api/tracks
app.use('/api/open/tracks', trackRouter);

// Routes requests for /api/lists
app.use('/api/secure/playlists', secureListRouter);

// Listening for requests on given port
const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});