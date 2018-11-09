const mongoose = require('mongoose');
const chalk = require('chalk');

const uri = 'mongodb://root:1q2w3e4r5t@ds143231.mlab.com:43231/haptik'
module.exports = {
    connectionString: uri
}

// logging mongoDb connection
mongoose.connection.on('connected', function() {
    console.log(chalk.green('MongoDB connected @ mongodb://<dbuser>:<dbpassword>@ds143231.mlab.com:43231/haptik'));
});

mongoose.connection.on('error', function(err) {
    console.log(chalk.red('MongoDB error: ' + err));
});