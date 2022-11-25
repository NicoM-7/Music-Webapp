const express = require('express');
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
    db.query("SELECT * FROM users WHERE id=?;", [req.params.id], (err,data) => {
        if(err != null){
            res.send(err);
        }
        else{
            res.json(data);
        }
    })
})
openUsersRouter.post('/insert', (req, res) => {

    db.query("INSERT INTO users VALUES (?, ?, ?, ?);", [req.body.id, req.body.username, req.body.administrator, req.body.activated], (err) => {
        
            res.send(err);
        
    })
});


module.exports = openUsersRouter;