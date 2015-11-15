var express = require('express');
var router = express.Router();

var Twitter = require('twitter-node-client').Twitter;
var error = function (err, response, body) {
       console.log('ERROR [%s]', err);
};
var success = function (data) {
    console.log('Success!!!!');
       console.log('Data [%s]', data);
};

var config = {
  "consumerKey":"6qRQuvOQkaajYOLjPzb1EI1Hw",
  "consumerSecret":"1pKCTs5O5kzCReHccFFHlHhuvxpQ3f5UMYn4hItITGlFkAXG6D",
  "accessToken":"17448099-6Bnabi7HkvHLmqKwRkLP9VXRK1zHdUJHcwUTmvlrW",
  "accessTokenSecret":"DFqHC6RAzt4R7bYvYhWFESH9RqMecjj1jVJyqCZfJrk2Q",
  "callBackUrl":""
};

var twitter = new Twitter(config);

// twitter.getSearch({'q':'#anirudh', 'count':10}, error, success);
/* GET home page. */
router.get('/sample', function(req, res, next) {
  twitter.getSearch({'q':'#anirudh', 'count':10}, error, function(data){
  	res.json(data);
  });
});

router.get('/trends/:woeid', function(req, res, next){
	var woeid = req.params.woeid;
	console.log('Parameter passed is ' + woeid);
	twitter.getCustomApiCall('/trends/place.json', {id: woeid}, error, function(data){
		res.send(data);
	});
});

router.get('/places', function(req, res, next){
	console.log('Calling available places ...');
	twitter.getCustomApiCall('/trends/available.json',{}, error, function(data){
		res.send(data);
	});
});

router.get('/tweets/:woeid/:topic', function(req, res, next){
	var topic = req.params.topic;
	var woeid = req.params.woeid;
	twitter.getCustomApiCall('/search/tweets.json',{'q':topic, 'woeid':woeid}, error, function(data){
		res.send(data);
	});
});
module.exports = router;
