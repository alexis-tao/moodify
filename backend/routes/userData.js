const router = require('express').Router();
let UserData = require('../models/userData.model');

//handles incoming post requests 
//to add user to the database 
router.route('/').post((req, res) => {
    const username = req.body.username;
    const songTracks = req.body.songTracks;

    const newUserData = new UserData({username,songTracks});

    newUserData.save() 
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));


});

module.exports = router; 