const express = require('express');
const Joi = require('joi');

const db = require('../DBConnect.js');

const openListRouter = express.Router();

// Get all lists
openListRouter.get('/:name', (req, res) => {

    db.query("SELECT playlists.id, playlists.name, playlists.user, users.username, playlists.description, playlists.public, playlists.numTracks, playlists.playtime, playlists.rating, playlists.lastModified, playlists.tracks FROM playlists LEFT JOIN users ON playlists.user=users.id WHERE public=1 AND name LIKE ? ORDER BY lastModified DESC;", ["%" + req.params.name + "%"], (err, data) => {

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

openListRouter.get("/review/:id", (req,res) => {

    db.query("SELECT reviews.reviewId, reviews.playlistId, reviews.name, reviews.user, users.username, reviews.rating, reviews.review, reviews.hidden, reviews.date FROM reviews LEFT JOIN users ON reviews.user=users.id WHERE playlistId=? AND hidden='false';", [req.params.id], (err, data) => {
        if(err != null){
            res.json(err);
        }
        else{
            res.json(data);
        }
    })
});

openListRouter.get("/rating/:id", (req, res) => {
    db.query("SELECT rating FROM reviews WHERE playlistId=? AND hidden='false'", [req.params.id], (err, data) => {
        if(err != null){
            res.status(500).json(err);
        }
        else{
            let sum = 0;
            for(let c = 0; c < data.length; c++){
                sum += data[c].rating;
            }

            let averageRating = Math.round(sum/data.length)
            res.json(averageRating);
        }
    })
})

module.exports = openListRouter;