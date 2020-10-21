const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    pass: {
        type: String,
        require: true,
        select: false,
    },
    createdAt: {
        type: Date,
        dafeult: Date.now,
    },
});

userSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.pass, 10);
    this.pass = hash;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;