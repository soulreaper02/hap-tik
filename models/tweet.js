const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userTweet =  new Schema({
    userID      : String,
    tweet       : String,
    tweeted_at  : { type: Date, default: Date.now }
});

const Tweet = mongoose.model('Tweets', userTweet);
module.exports = Tweet;