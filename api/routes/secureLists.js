const express = require('express');
const Joi = require('joi');

const db = require('../DBConnect.js');

const secureListRouter = express.Router();

// Create a new list with a given list name.
secureListRouter.post('', (req, res) => {
    // // Input Validation
    // const schema = Joi.object({
    //     listName: Joi.string().required()
    // });
    // const result = schema.validate(req.body);
    // if (result.error) {
    //     res.status(400).json(result.error.details[0].message);
    //     return;
    // }

    db.query("INSERT INTO playlists (name, user, tracks, lastModified, numTracks, playtime) VALUES (?, ?, ?, ?, ?, ?);",
        [
            req.body.name,
            req.body.user,
            req.body.tracks,
            req.body.lastModified,
            req.body.numTracks,
            req.body.playtime
        ],
        (err, data) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(422).json(err.sqlMessage);
                    return;
                }
                else {
                    res.status(500).json(err);
                    return;
                }
            }
            else {
                res.json(data);
                return;
            }
        });
});

// Get all users playlists
secureListRouter.get('', (req, res) => {
    db.query("SELECT * FROM playlists WHERE user=?;", [req.query.user], (err, data) => {
        if (err) {
            res.status(500).json(err);
        }
        else if (data.length === 0) {
            res.status(404).json("No Lists Found");
        }
        else {
            res.json(data);
        }
    });
});


// Create a new list with a given list name.
secureListRouter.post('/:id', (req, res) => {
    // // Input Validation
    // const schema = Joi.object({
    //     listName: Joi.string().required()
    // });
    // const result = schema.validate(req.body);
    // if (result.error) {
    //     res.status(400).json(result.error.details[0].message);
    //     return;
    // }

    db.query(`UPDATE playlists SET 
                description=?,
                public=?,
                numTracks=?,
                playtime=?,
                lastModified=?,
                tracks=? 
                WHERE id=?;`,
        [
            req.body.description,
            req.body.public,
            req.body.numTracks,
            req.body.playtime,
            req.body.lastModified,
            req.body.tracks,
            req.params.id
        ],
        (err, data) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(422).json(err.sqlMessage);
                    return;
                }
                else {
                    res.status(500).json(err);
                    return;
                }
            }
            else {
                res.json(data);
                return;
            }
        });
});

secureListRouter.delete('/:id', (req, res) => {
    db.query("DELETE FROM playlists WHERE id=?", [req.params.id], (err) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        else {
            res.json("Success");
            return;
        }
    });
});

module.exports = secureListRouter;