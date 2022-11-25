const express = require('express');
const cors = require("cors");

const db = require('./DBConnect');
const trackRouter = require('./routes/tracks');
const openListRouter = require('./routes/openLists');
const secureListRouter = require('./routes/secureLists');
const openUsersRouter = require('./routes/openUsers');
const adminRouter = require('./routes/adminUsers');

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

// Routes requests for /api/open/tracks
app.use('/api/open/tracks', trackRouter);

// Routes requests for /api/open/lists
app.use('/api/open/playlists', openListRouter);

// Routes requests for /api/secure/lists
app.use('/api/secure/playlists', secureListRouter);

// Routes requests for /api/secure/lists
app.use('/api/open/usernames', openUsersRouter);

app.use("/api/admin", adminRouter)
// Listening for requests on given port
const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});