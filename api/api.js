const express = require('express');
const cors = require("cors");
const jwt = require('jsonwebtoken');

const db = require('./DBConnect');
const trackRouter = require('./routes/tracks');
const openListRouter = require('./routes/openLists');
const secureListRouter = require('./routes/secureLists');
const openUsersRouter = require('./routes/openUsers');
const secureUsersRouter = require('./routes/secureUsers')
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

app.use('/api/secure', (req, res, next) => {
    const authHeader = req.headers.cookie;
    const token = authHeader && authHeader.split('token=')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if (err) {
            return res.sendStatus(403);
        }
        next();
    });
});

app.use('/api/admin', (req, res, next) => {
    const authHeader = req.headers.cookie;
    const token = authHeader && authHeader.split('token=')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        db.query("SELECT admin FROM users WHERE id=?;", [user.name], (err, data) => {
            if (err) {
                res.status(500).json(err);
            }
            else if (data.length === 0) {
                res.status(404).json("No Users Found!");
            }
            else if (data[0].admin === "true") {
                next();
            }
            else {
                res.sendStatus(401);
            }
        });
    });
});

// Routes requests for /api/open/tracks
app.use('/api/open/tracks', trackRouter);

// Routes requests for /api/open/playlists
app.use('/api/open/playlists', openListRouter);

// Routes requests for /api/secure/lists
app.use('/api/open/usernames', openUsersRouter);

// Routes requests for /api/secure/usernames
app.use('/api/secure/usernames', secureUsersRouter);

// Routes requests for /api/secure/playlists
app.use('/api/secure/playlists', secureListRouter);

// Routes requests for /api/admin
app.use("/api/admin", adminRouter);

// Listening for requests on given port
const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});