const request = require('request');
const Tweet = require('../models/tweet');
const User = require('../models/user');
const chalk = require('chalk');

module.exports = function(app) {
    app.post('/tweet', function(req, res) {
        let userID = req.body.userID;
        let tweet = req.body.tweet;
        if (userID && tweet) {
            User.findById(userID, (err,resp) => {
                if (err) throw err;
                if (resp) {
                    console.log(resp);
                    let data = {
                        userID  : resp._id,
                        name    : resp.name,
                        tweet   : tweet,
                        status  : 'Success'
                    }
                    const newTweet = new Tweet({
                        userID : resp._id,
                        tweet  : tweet
                    });
                    newTweet.save((err) => {
                        res.status(200).send(data);
                    })
                }
            })
        }
    });

    app.get('/usertweets', function(req, res) {

    });
}
