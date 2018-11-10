const request = require('request');
const Tweet = require('../models/tweet');
const User = require('../models/user');
const chalk = require('chalk');
const Follow = require('../models/follow');

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

    app.get('/usertweets/:uid', function(req, res) {
        let userID = req.params.uid;
        if (userID) {
            // userID belongs to the follower 
            followee_set = [];
            tweet_set = [];
            Follow.find({follower : userID}, (err, resp) => {
                if (err) throw err;
                for (let i = 0; i < resp.length; i++) {
                    if (resp[i].end == undefined){
                        followee_set.push(resp[i].followee);
                    }
                }
                if (followee_set) {
                  Tweet.find({ "userID" : { "$in" : followee_set} }).sort("-tweeted_at")
                  .exec((err, data) => {
                    if(err){
                        return console.log(err);
                    } else {
                        res.status(200).send(data);
                    }
                  })
                }
            })
        }
    });
}