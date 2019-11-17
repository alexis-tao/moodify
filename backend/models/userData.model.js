const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userDataSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    songTracks: {
        type: Array,
        unique: true 
    },
}, {

timestamps: true,

});

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;