const express = require('express');
const Joi = require('joi');

const db = require('../DBConnect.js');

const listRouter = express.Router();

// Create a new list with a given list name. Return an error if name exists.
listRouter.post('', (req, res) => {
    // Input Validation
    const schema = Joi.object({
        listName: Joi.string().required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).json(result.error.details[0].message);
        return;
    }

    const listName = req.body.listName;

    db().connect();

    db().query("INSERT INTO lists VALUES (?,?,?)", [listName, 0, "00:00"], (err, data) => {
        db().end();

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

// Get a list of list names, number of tracks that are saved in each list and the total play time of each list.
listRouter.get('', (req, res) => {
    db().connect();

    db().query("SELECT * FROM lists", (err, data) => {
        db().end();

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

// Get list of track ids for a given list
listRouter.get('/:listName', (req, res) => {
    // Input Validation
    const schema = Joi.object({
        listName: Joi.string().required()
    });
    const result = schema.validate(req.params);
    if (result.error) {
        res.status(400).json(result.error.details[0].message);
        return;
    }

    const listName = req.params.listName;

    db().connect();

    db().query("SELECT listName FROM lists WHERE listName=? LIMIT 1", [listName], (err, data) => {
        if (err) {
            db().end();
            res.status(500).json(err);
            return;
        }
        // if list doesn't exist
        else if (data.length === 0) {
            db().end();
            res.status(404).json("List Not Found");
            return;
        }

        db().query("SELECT trackID FROM listTrackDetails WHERE listName=?", [listName], (err, data) => {
            db().end();

            if (err) {
                res.status(500).json(err);
                return;
            }
            else {
                res.json(data);
                return;
            }
        });

    });
});

// Adding list of tracks to a given list
listRouter.put('/:listName', (req, res) => {
    // Input Validation
    const schema = Joi.object({
        listName: Joi.string().required(),
    });
    const result = schema.validate(req.params);
    if (result.error) {
        res.status(400).json(result.error.details[0].message);
        return;
    }

    const listName = req.params.listName;
    let tracks = req.query.tracks.split(",").map(id => parseInt(id)).filter(Boolean);

    db().connect();

    // Checks if a list exists
    db().query("SELECT listName FROM lists WHERE listName=? LIMIT 1;", [listName], (err, data) => {
        if (err) {
            db().end();
            res.status(500).json(err);
            return;
        }
        else if (data.length === 0) {
            db().end();
            res.status(404).json("List doesn't Exist");
            return;
        }

        // Deletes existing data
        db().query("DELETE FROM listTrackDetails WHERE listName=?;", [listName], (err) => {
            if (err) {
                db().end();
                res.status(500).json(err);
                return;
            }

            // Checks to see if the user acctually input any tracks
            if (tracks.length !== 0) {
                // Checks if the ids given exist in track db and gets ones that do along with there duration
                db().query("SELECT trackID,trackDuration FROM tracks WHERE trackID IN (?);", [tracks], (err, data) => {
                    if (err) {
                        db().end();
                        res.status(500).json(err);
                        return;
                    }

                    // Filters tracks requested with tracks that acctually exist in db
                    let foundIDs = data.map(track => track.trackID);
                    tracks = tracks.filter(track => foundIDs.includes(track));

                    // Adds duration property to list of filtered tracks
                    tracks = tracks.map(trackID => {
                        return {
                            trackID: trackID,
                            trackDuration: data[foundIDs.indexOf(trackID)].trackDuration
                        }
                    });

                    // For total duration calc
                    let totalDuration = 0;
                    // Inserts each track
                    for (let track of tracks) {
                        db().query("INSERT INTO listTrackDetails VALUES (?,?);", [listName, track.trackID], (err) => {
                            db().end();

                            if (err) {
                                res.status(500).json(err);
                                return;
                            }
                        });

                        // Calculation for total duration of list
                        let trackDur = track.trackDuration.split(":");
                        totalDuration += parseInt(trackDur[0]) * 60 + parseInt(trackDur[1]);
                    }

                    // Formoting total duration to string for display
                    totalDuration = `${parseInt(totalDuration / 60)}:${totalDuration % 60}`;

                    // Updating lists db with new info about that list
                    db().query("UPDATE lists SET numTracks=?,totalDuration=? WHERE listName=?;", [tracks.length, totalDuration, listName], (err) => {
                        db().end();

                        if (err) {
                            res.status(500).json(err);
                            return;
                        }
                        res.json("Success");
                    });
                });
            }
            else {
                // Updating lists db with new info about that list
                db().query("UPDATE lists SET numTracks=?,totalDuration=? WHERE listName=?;", [0, "00:00", listName], (err) => {
                    db().end();

                    if (err) {
                        res.status(500).json(err);
                        return;
                    }
                    res.json("Success");
                });
            }
        });
    });
});

// Delete a list
listRouter.delete('/:listName', (req, res) => {
    // Input Validation
    const schema = Joi.object({
        listName: Joi.string().required()
    });
    const result = schema.validate(req.params);
    if (result.error) {
        res.status(400).json(result.error.details[0].message);
        return;
    }

    const listName = req.params.listName;

    db().connect()

    // Checks if list exists
    db().query("SELECT listName FROM lists WHERE listName=? LIMIT 1", [listName], (err, data) => {
        if (err) {
            db().end();
            res.status(500).json(err);
            return;
        }
        // if list doesn't exist
        else if (data.length === 0) {
            db().end();
            res.status(404).json("List Not Found");
            return;
        }

        // Deletes from list db
        db().query("DELETE FROM lists WHERE listName=?", [listName], (err) => {
            if (err) {
                db().end();
                res.status(500).json(err);
                return;
            }

            // Deletes from list track details db
            db().query("DELETE FROM listTrackDetails WHERE listName=?", [listName], (err) => {
                db().end();

                if (err) {
                    res.status(500).json(err);
                    return;
                }
                res.json("Success");
            });
        });
    });
});

module.exports = listRouter;