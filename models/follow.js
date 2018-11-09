const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followSchema = new Schema({
    follower    : String,
    followee    : String,
    start       : { type: Date, default: Date.now },
    end         : { type : Date}
});

const Follow = mongoose.model('Follow', followSchema);
module.exports = Follow;