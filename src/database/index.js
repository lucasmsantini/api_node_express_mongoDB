const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/noderest', { useNewUrlParser: true });
mongoose.promise = global.Promisse;

module.exports = mongoose;