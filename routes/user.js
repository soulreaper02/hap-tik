const request = require('request');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const chalk = require('chalk');

module.exports = function(app){

    app.get('/', function(req, res) {
        console.log(req.query.d)
        res.send("hello");
    })


    app.post('/login', function(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        if (email && password) {
            User.findOne({ email: email }).exec(function(err, user) {
                if (err) throw err;
                if (!user) {
                    res.status(400).send('User Not found');
                } else {
                    bcrypt.compare(password, user.password, function(err, result) {
                        console.log(user);
                        if (result === true){
                            req.session.user = user;
                            const respData = {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                            }
                            res.status(200).send(respData);
                        } else {
                            res.status(404).send('Incorrect password');
                        }
                    })
                }
            })
        }

    });

    app.post('/logout', (req, res) => {
        req.session.destroy();
    })

    app.post('/register', (req, res) => {
        console.log(req.body);
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const second_password = req.body.second_password;

        req.checkBody('name', 'Name is required').notEmpty().isLength({ min: 5 });
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('second_password', 'Password does not match').equals(req.body.second_password);

        let errors = req.validationErrors();
        if (errors) {
            res.status(404).send(errors);
        } else {
            const newUser = new User({
                name: name,
                email: email,
                password: password,
            });
            bcrypt.genSalt(8, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    if (err) {
                        console.log(chalk.red('ERROR : ', err));
                        res.send(err);
                    } else {
                        newUser.password = hash;
                        newUser.save(function(err) {
                            if (err) throw err;
                            console.log('Successfully saved');
                            User.findOne({ email: email }).exec(function(err, user){
                                if (err) throw err;
                                res.status(200).send(user);
                            })
                        });
                    }
                });
            });
        }
    });    
}
