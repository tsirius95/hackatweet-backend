const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    date: Date,
    content: String,
    hashtag: String,
    like: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;