const express = require('express');
const db = require('../DBConnect.js');
const fs = require("fs");

const adminRouter = express.Router();

adminRouter.get('/usernames', (req, res) => {
    db.query("SELECT * FROM users;", (err, data) => {
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

adminRouter.post('/update/admin', (req, res) => {

    db.query("UPDATE users SET admin=? WHERE id=?;", [req.body.admin, req.body.id], (err) => {
        if(err != null){
            res.status(500).json(err);
        }
        res.status(200).json("Success");
    });
});

adminRouter.post('/update/activation', (req,res) => {
    db.query("UPDATE users SET activated=? WHERE id=?;", [req.body.activation, req.body.id], (err) => {
        if(err != null){
            res.status(500).json(err);
        }
        res.status(200).json("Success");
    });
});

adminRouter.post('/update/review', (req,res) => {
    db.query("UPDATE reviews SET hidden=? WHERE reviewId=?", [req.body.hidden, req.body.reviewId], (err) => {
        if(err != null){
            res.status(500).json(err);
        }
        else{
            res.json("Success");
        }
    })
})

adminRouter.get("/review/:id", (req,res) => {

    db.query("SELECT reviews.reviewId, reviews.playlistId, reviews.name, reviews.user, users.username, reviews.rating, reviews.review, reviews.hidden, reviews.date FROM reviews LEFT JOIN users ON reviews.user=users.id WHERE playlistId=?;", [req.params.id], (err, data) => {
        if(err != null){
            res.json(err);
        }
        else{
            res.json(data);
        }
    })
});

adminRouter.post("/update/privacyPolicy", (req, res) => {
    fs.writeFile("privacyPolicy.txt", req.body.html, (err) => {
        if(err != null){
            res.json("Error");
        }
        else{
            res.json("Success");
        }
        
    })
});

adminRouter.post("/update/takedownPolicy", (req, res) => {
    
    fs.writeFile("takedownPolicy.txt", req.body.html, (err) => {

        if(err != null){
            res.json("Error");
        }
        else{
            res.json("Success");
        }
    })
    
});

adminRouter.post("/update/acceptableUsePolicy", (req, res) => {
    
    fs.writeFile("acceptableUsePolicy.txt", req.body.html, (err) => {
        if(err != null){
            res.json("Error");
        }
        else{
            res.json("Success");
        }
    })
});

adminRouter.post("/update/takedown/:id", (req, res) => {
    db.query("UPDATE reviews SET takedown=? WHERE reviewId=?", [req.body.takedown, req.params.id], (err) => {
        if(err != null){
            res.status(500).json(err);
        }
        else{
            res.json("Success");
        }
    })
});

adminRouter.post("/update/infringement/:id", (req, res) => {
    db.query("UPDATE reviews SET infringement=? WHERE reviewId=?", [req.body.infringement, req.params.id], (err) => {
        if(err != null){
            res.status(500).json(err);
        }
        else{
            res.json("Success");
        }
    })
});

adminRouter.post("/update/dispute/:id", (req, res) => {
    db.query("UPDATE reviews SET dispute=? WHERE reviewId=?", [req.body.dispute, req.params.id], (err) => {
        if(err != null){
            res.status(500).json(err);
        }
        else{
            res.json("Success");
        }
    })
});

adminRouter.get("/dcma/:id", (req, res) => {
    db.query("SELECT takedown, infringement, dispute FROM reviews WHERE reviewId=?", [req.params.id], (err, data) => {
        if(err != null){
            res.status(500).json(err);
        }
        else{
            res.json(data);
        }
    })
})

module.exports = adminRouter;