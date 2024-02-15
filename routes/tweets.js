var express = require('express');
var router = express.Router();

require('../models/connection');
const Tweet = require('../models/tweets');
const User = require('../models/users')
const { checkBody } = require('../modules/checkBody');
const { hashtagFinder } = require('../modules/hashtagFinder');

router.post("/", (req, res) => {
    if (!checkBody(req.body, ["token", "content"])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    User.findOne({token: req.body.token}).then(data => {
        const hashtag = hashtagFinder(req.body.content)
        const newTweet = new Tweet({
            user: data._id,
            date: new Date(),
            content: req.body.content,
            like: [],
            hashtag: hashtag,
        });
        newTweet.save().then(newDoc => {
        res.json({ result: true, tweet: newDoc });
        });
    });
});

router.get("/", (req, res) => {
    Tweet.find()
    .populate("user")
    .then(data => {
        if(data) {
            res.json({result: true, tweets: data})
        } else {
            res.json({result: false})
        }
    });
});

router.get('/:token', (req, res) => {
    Tweet.find({token: req.body.params})
    .populate("user")
    .then(data => {
        if(data) {
            res.json({result: true, tweets: data})
        } else {
            res.json({result: false})
        }
    });
});

router.get('/hashtag', (req, res) => {
    
})



module.exports = router;