var app = angular.module('twitterTrendsApp', []);

app.factory('trendsFactory', ['$http', function($http){

	var trendsFactory = {};

	trendsFactory.getPlaces = function(){ 
		return $http.get('/twitter/places');
	};
	trendsFactory.getTrends = function (woeid){
			return $http.get('/twitter/trends/' + woeid);
	};
	trendsFactory.getTweets = function(q, woeid){
		return $http.get('/twitter/tweets/' +woeid + '/'+q);
	}
	return trendsFactory;
}]);

app.controller('trendsCtrl', ['$scope', 'trendsFactory', function($scope, trendsFactory){
	$scope.count = 5;
	$scope.placeModel="Worldwide";
	$scope.countArray = [0,1,2,3,4,5,6,7,8,9,10];
	$scope.tweets = {};

	trendsFactory.getPlaces().success(function(data){
			$scope.places = [];
			$scope.places = data;
			$scope.placeModel = data[0];
	});

	$scope.startSearch = function(){
		console.log($scope.placeModel['woeid']);
		trendsFactory.getTrends($scope.placeModel['woeid']).success(function(data){
		console.log(data);
		$scope.trends = data[0].trends;
	});}

	$scope.searchTweets = function(name, woeid){
		console.log('Name: ' + name + 'Woeid: '+ woeid);
		trendsFactory.getTweets(name, woeid).success(function(data){
			// console.log(data);
			$scope.tweets.push({name:data});
			console.log($scope.tweets);
		});
	}

	$scope.searchTweets = function(trend){
		console.log('Getting trend: ' + trend['name']);
		var trendClean = trend['name'].replace('#', '%23');
		trendsFactory.getTweets(trendClean, trend['woeid']).success(function(data){
			trend['tweets'] = data.statuses;
			console.log(trend['tweets']);
		});
	}
}]);