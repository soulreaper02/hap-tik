const request = require('request');
const Follow = require('../models/follow');
const User = require('../models/user');
const chalk = require('chalk');
const moment = require('moment');

module.exports = function(app) {
    app.post('/follow', function (req, res) {
        const follower = req.body.follower_ID;
        const followee = req.body.followee_ID;
        if (follower && followee) {
            User.findById(followee, (err, user) => {
                if (err) throw err;
                if (!user) {
                    res.status(404).send('Incorrect folowee ID');
                } else {
                    const follow = new Follow({
                        follower    : follower,
                        followee    : followee,
                    });
                    follow.save((err) => {
                        if (err) throw err;
                        console.log('Successfully saved');
                        Follow.find({follower : follower}, (err, resp) => {
                            res.status(200).send(resp);
                        })
                    })
                }
            });
        }
    });
    
    app.get('/textlocal', (req, res) => {
       console.log('I am invoked');
        console.log(req.body)
    })
}
