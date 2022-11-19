const express = require('express');
const cors = require("cors");

const db = require('./DBConnect');
const artistRouter = require('./routes/artists');
const trackRouter = require('./routes/tracks');
const listRouter = require('./routes/lists');

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

// Gets List of all genre names, IDs and parent IDs
app.get('/api/genres', (req, res) => {
    db().connect();

    db().query('SELECT genreTitle,genreID,genreParent FROM genres;', (err, data) => {
        db().end();

        if (err) {
            res.status(500).json(err);
            return;
        }
        else if (data.length === 0) {
            res.status(404).json("Genre Not Found");
            return;
        }
        else {
            res.json(data);
            return;
        }
    });
});

// Routes requests for /api/artists
app.use('/api/artists', artistRouter);

// Routes requests for /api/tracks
app.use('/api/tracks', trackRouter);

// Routes requests for /api/lists
app.use('/api/lists', listRouter);

// Listening for requests on given port
const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});