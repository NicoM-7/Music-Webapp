const express = require('express');
const Joi = require('joi');

const db = require('../DBConnect.js');

const trackRouter = express.Router();

// Querys db for given trackTitle and/or albumName and returns specified number of results
trackRouter.get('', (req, res) => {
    // Input validation
    const schema = Joi.object({
        trackTitle: Joi.string().allow(""),
        albumName: Joi.when("trackTitle", { is: "", then: Joi.string(), otherwise: Joi.string().allow("") }),
        results: Joi.number().required()
    })
        .or("trackTitle", "albumName");
    const result = schema.validate(req.query);
    if (result.error) {
        res.status(400).json(result.error.details[0].message);
        return;
    }

    const trackTitle = req.query.trackTitle;
    const albumName = req.query.albumName;
    const results = parseInt(req.query.results);

    db().connect();

    // Functions for sending response after db query
    const queryRes = (err, data) => {
        db().end();

        if (err) {
            res.status(500).json(err);
        }
        else if (data.length === 0) {
            res.status(404).json("Track Not Found");
        }
        else {
            res.json(data);
        }
    }

    // Track title and album name was recived
    if (trackTitle !== "" && albumName !== "") {
        db().query('SELECT tracks.trackID,tracks.albumID,' +
            'albums.albumName,tracks.artistID,' +
            'artists.artistName,tracks.trackTags,' +
            'tracks.trackDateCreated,tracks.trackDateRecorded,' +
            'tracks.trackDuration,tracks.trackGenres,' +
            'tracks.trackNumber,tracks.trackTitle ' +
            'FROM tracks ' +
            'LEFT JOIN albums ON tracks.albumID=albums.albumID ' +
            'LEFT JOIN artists ON tracks.artistID=artists.artistID ' +
            'WHERE tracks.trackTitle LIKE ? ' +
            'AND albums.albumName LIKE ? ' +
            "LIMIT ?;", ["%" + trackTitle + "%", "%" + albumName + "%", results], queryRes);
    }
    // Album name was recived
    else if (trackTitle === "" && albumName !== "") {
        db().query('SELECT tracks.trackID,tracks.albumID,' +
            'albums.albumName,tracks.artistID,' +
            'artists.artistName,tracks.trackTags,' +
            'tracks.trackDateCreated,tracks.trackDateRecorded,' +
            'tracks.trackDuration,tracks.trackGenres,' +
            'tracks.trackNumber,tracks.trackTitle ' +
            'FROM tracks ' +
            'LEFT JOIN albums ON tracks.albumID=albums.albumID ' +
            'LEFT JOIN artists ON tracks.artistID=artists.artistID ' +
            'WHERE albums.albumName LIKE ? ' +
            "LIMIT ?;", ["%" + albumName + "%", results], queryRes);
    }
    // Track title was recived
    else if (trackTitle !== "" && albumName === "") {
        db().query('SELECT tracks.trackID,tracks.albumID,' +
            'albums.albumName,tracks.artistID,' +
            'artists.artistName,tracks.trackTags,' +
            'tracks.trackDateCreated,tracks.trackDateRecorded,' +
            'tracks.trackDuration,tracks.trackGenres,' +
            'tracks.trackNumber,tracks.trackTitle ' +
            'FROM tracks ' +
            'LEFT JOIN albums ON tracks.albumID=albums.albumID ' +
            'LEFT JOIN artists ON tracks.artistID=artists.artistID ' +
            'WHERE tracks.trackTitle LIKE ? ' +
            "LIMIT ?;", ["%" + trackTitle + "%", results], queryRes);
    }
});

// Querys db for given track id and returns 1 result
trackRouter.get('/:id', (req, res) => {
    // Input validation
    const schema = Joi.object({
        id: Joi.number().required()
    });
    const result = schema.validate({ id: parseInt(req.params.id) });
    if (result.error) {
        res.status(400).json(result.error.details[0].message);
        return;
    }

    const id = req.params.id;

    db().connect();

    db().query('SELECT tracks.trackID,tracks.albumID,' +
        'albums.albumName,tracks.artistID,' +
        'artists.artistName,tracks.trackTags,' +
        'tracks.trackDateCreated,tracks.trackDateRecorded,' +
        'tracks.trackDuration,tracks.trackGenres,' +
        'tracks.trackNumber,tracks.trackTitle ' +
        'FROM tracks ' +
        'LEFT JOIN albums ON tracks.albumID=albums.albumID ' +
        'LEFT JOIN artists ON tracks.artistID=artists.artistID ' +
        'WHERE tracks.trackID=?' +
        " LIMIT 1;", [id], (err, data) => {
            db().end();

            if (err) {
                res.status(500).json(err);
                return;
            }
            else if (data.length === 0) {
                res.status(404).json("Track Not Found");
                return;
            }
            else {
                res.json(data);
                return;
            }
        });
});

module.exports = trackRouter;