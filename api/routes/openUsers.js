require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../DBConnect.js');

const openUsersRouter = express.Router();

openUsersRouter.get('', (req, res) => {
    db.query("SELECT username FROM users;", (err, data) => {
        if (err) {
            res.status(500).json(err);
        }
        else if (data.length === 0) {
            res.status(404).json("No Users Found!");
        }
        else {
            res.json(data);
        }
    });
});

openUsersRouter.get("/:id", (req, res) => {
    db.query("SELECT * FROM users WHERE id=?;", [req.params.id], (err, data) => {
        if (err != null) {
            res.send(err);
        }
        else {
            res.json(data);
        }
    })
});

openUsersRouter.post('/insert', (req, res) => {

    db.query("INSERT INTO users VALUES (?, ?, ?, ?);", [req.body.id, req.body.username, req.body.administrator, req.body.activated], (err) => {

        res.send(err);

    })
});

// Generates JWT
openUsersRouter.post('/login', (req, res) => {
    const user = { name: req.body.username };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
    res.json({ accessToken: accessToken })
});


module.exports = openUsersRouter;