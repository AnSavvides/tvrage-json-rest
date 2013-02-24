// A lightweight node.js REST API wrapper around the TVRage web services
// All endpoints respond in JSON.
var express = require("express"),
	series = require("./routes/series"),
	app = express();
 
// Defining all our application routes
app.get("/search/:name", series.search);
app.get("/full_search/:name", series.fullSearch);
app.get("/show_info/:id", series.showInfo);
app.get("/episode_list/:id", series.episodeList);
app.get("/episode_info/:id/:episode", series.episodeInfo);
app.get("/full_show_info/:id", series.fullShowInfo);
app.get("/full_show_list", series.fullShowList);
app.get("/fullschedule/:country", series.fullSchedule);
// If none of the above application routes match, then
// we raise a 404.
app.get("*", function(req, res) {
	res.status(404).sendfile("404.txt");
});
 
app.listen(80);