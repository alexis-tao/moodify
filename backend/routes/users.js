const router = require('express').Router();
let User = require('../models/users.model');

//handles incoming post requests 
//to add user to the database 
router.route('/').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 