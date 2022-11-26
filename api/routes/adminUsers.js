const express = require('express');
const db = require('../DBConnect.js');

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

module.exports = adminRouter;