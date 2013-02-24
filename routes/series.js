var util = require("util"),
	xml2js = require("xml2js"),
	request = require("request"),
	querystring = require("querystring"),
	parser = new xml2js.Parser(),
	// All the URLs we will be making use of.
	baseUrl = "http://services.tvrage.com/feeds/",
	searchUrl = "search.php?",
	fullSearchUrl = "full_search.php?",
	showInfoUrl = "showinfo.php?",
	episodeListUrl = "episode_list.php?",
	episodeInfoUrl = "episodeinfo.php?",
	fullShowInfoUrl = "full_show_info.php?",
	fullShowListUrl = "show_list.php",
	fullScheduleUrl = "fullschedule.php?",
	timeOut = 4000; // A request timeout.

// Responsible for sending a request down to the url that has
// been passed as an argument.
_request = function(url, callback) {
	request({uri: url, timeout: timeOut}, function(err, response, body) {
		if (!err && response.statusCode == 200) {
			parser.parseString(body, function(err, result) {
				callback(result);
			});
		} else {
			_httpError(err, response, callback);
		}
	});
};

// Responsible for raising an error with the appropriate
// status code.
_httpError = function(error, response, callback) {
	callback(response.statusCode);
};

// Search for shows by name.
exports.search = function(req, res) {
	var query = querystring.stringify({show: req.params.name}),
		url = util.format("%s%s%s", baseUrl, searchUrl, query);

	this._request(url, function(result) { res.send(result); });
};

// Full search for shows by name.
exports.fullSearch = function(req, res) {
	var query = querystring.stringify({show: req.params.name}),
		url = util.format("%s%s%s", baseUrl, fullSearchUrl, query);

	this._request(url, function(result) { res.send(result); });
};

// Show info based on a show id that can be acquired via the search
// or full_search endpoints.
exports.showInfo = function(req, res) {
	var query = querystring.stringify({sid: req.params.id}),
		url = util.format("%s%s%s", baseUrl, showInfoUrl, query);

	this._request(url, function(result) { res.send(result); });
};

// Full show info based on a show id that can be acquired via the search
// or full_search endpoints.
exports.fullShowInfo = function(req, res) {
	var query = querystring.stringify({sid: req.params.id}),
		url = util.format("%s%s%s", baseUrl, fullShowInfoUrl, query);

	this._request(url, function(result) { res.send(result); });
};

// Episode list based on a show id that can be acquired via the search
// or full_search endpoints.
exports.episodeList = function(req, res) {
	var query = querystring.stringify({sid: req.params.id}),
	url = util.format("%s%s%s", baseUrl, episodeListUrl, query);

	this._request(url, function(result) { res.send(result); });
};

// Episode info based on a show id (attainable via the search or full_search
// endpoints) and an episode (attainable via the episode_list endpoint).
exports.episodeInfo = function(req, res) {
	var query = querystring.stringify({sid: req.params.id, ep: req.params.episode}),
		url = util.format("%s%s%s", baseUrl, episodeInfoUrl, query);

	this._request(url, function(result) { res.send(result); });
};

// Full TV show list.
exports.fullShowList = function(req, res) {
	var url = util.format("%s%s", baseUrl, fullShowListUrl);

	this._request(url, function(result) { res.send(result); });
};

// Full TV show schedule based on the country (e.g. US or UK).
exports.fullSchedule = function(req, res) {
	var query = querystring.stringify({country: req.params.country}),
		url = util.format("%s%s%s", baseUrl, fullScheduleUrl, query);

	this._request(url, function(result) { res.send(result); });
};