var express = require('express');
var router = express.Router();

require('../models/connection');
const Tweet = require('../models/tweets');
const User = require('../models/users')
const { checkBody } = require('../modules/checkBody');
const { hashtagFinder } = require('../modules/hashtagFinder');

//creation d'un tweet
router.post("/", (req, res) => {
    if (!checkBody(req.body, ["token", "content"])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    User.findOne({token: req.body.token}).then(data => {
        const hashtag = hashtagFinder(String(req.body.content));
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

//recupere tous les tweets pour le feed
router.get("/", (req, res) => {
    Tweet.find()
    .populate("user")
    .then(data => {
        if(data) {
            res.json({result: true, tweets: data});
        } else {
            res.json({result: false});
        }
    });
});

//recupere tous les tweets d'un user pour son wall
router.get('/mytweets/:token', (req, res) => {
    User.findOne({token : req.params.token})
    .then(userData => {
        Tweet.find({user: userData._id})
        .populate("user")
        .then(data => {
            if(data) {
                res.json({result: true, tweets: data});
            } else {
                res.json({result: false});
            }
        });
    });
});

//recupere tous les tweets selon un hashtag
router.get('/trends/:hashtag', (req, res) => {
    Tweet.find({ hashtag: req.params.hashtag })
    .populate("user")
    .then(data => {
        if(data) {
            res.json({result: true, tweets: data});
        } else {
            res.json({result: false});
        }
    });
});

router.post('/like', (req, res) => {
    let oldLike = ""
    Tweet.findOne({_id :req.body.idTweet}).then(data => {
        oldLike = data.like
    })

    User.findOne({token: req.body.token})
    .then(userData => {
        Tweet.updateOne({_id :req.body.idTweet}, {like: [...oldLike, userData._id]})
        .then(() => {
            Tweet.find().then(data => {
                res.json({ tweets: data });
            });
        });
    });
});

router.delete('/:idTweet', (req, res) => {
    Tweet.deleteOne({_id :req.params.idTweet})
    .then(() => {
        Tweet.find().then(data => {
            res.json({ tweets: data });
        });
    });
});

module.exports = router;