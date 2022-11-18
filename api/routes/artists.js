const express = require('express');
const Joi = require('joi');

const db = require('../DBConnect.js');

const artistRouter = express.Router();

// Query db for given artist name
artistRouter.get('', (req, res) => {
    // Input validation
    const schema = Joi.object({
        artistName: Joi.string().required()
    });
    const result = schema.validate(req.query);
    if (result.error) {
        res.status(400).json(result.error.details[0].message);
        return;
    }

    db().connect();

    // Query using prepared statement to prevent injection attacks
    const artistName = "%" + req.query.artistName + "%";
    db().query("SELECT * FROM artists WHERE artistName LIKE ?;", [artistName], (err, data) => {
        db().end();

        if (err) {
            res.status(500).json(err);
        }
        else if (data.length === 0) {
            res.status(404).json("Artist Not Found");
        }
        else {
            res.json(data);
        }
    });
});

// Querys db for a given artist id and returns 1 result
artistRouter.get('/:id', (req, res) => {
    // Input validation
    const schema = Joi.object({
        id: Joi.number().required()
    });
    const result = schema.validate({ id: parseInt(req.params.id) });
    if (result.error) {
        res.status(400).json(result.error.details[0].message);
        return;
    }

    db().connect();

    // Query using prepared statement to prevent injection attacks
    const id = req.params.id;
    db().query('SELECT * FROM artists WHERE artistID= ? LIMIT 1;', [id], (err, data) => {
        db().end();

        if (err) {
            res.status(500).json(err);
        }
        else if (data.length === 0) {
            res.status(404).json("Artist Not Found");
        }
        else {
            res.json(data);
        }
    });
});

module.exports = artistRouter;