// Read and set environment variables with the dotenv package
require("dotenv").config();

var fs = require("fs");
// Import the 'keys.js' file and assign it to the variable keys
var keys = require("./keys.js");


// Import all node modules needed for the app
var Spotify = require("node-spotify-api");
var axios = require("axios");
var liriCommand = process.argv[2];

// Access Spotify access credentials in the keys.js file
var spotify = new Spotify (keys.spotify);

//---------------Commands that LIRI understands---------------------

if (liriCommand === "concert-this") { concertThis(); }
else if (liriCommand === "spotify-this-song") { spotifyThisSong(); }
else if (liriCommand === "movie-this") { movieThis(); }
else if (liriCommand === "do-what-it-says") { doWhatItSays(); }
else {
    console.log("Please try one of these commands");
    console.log("1. node liri.js spotify-this-song 'song name here'");
    console.log("Song names longer than one word must be in quotation marks");
};

//---------------------------Functions----------------------------

//-----------------spotifyThisSong Function ----------------------
function spotifyThisSong(songName) {
    var songName = process.argv[3];
    if (!songName) {
        songName = "The Sign";
    }
    spotify.search({ type: "track", query: songName }, function (err, data) {
        // console.log(data);
        if (!err) {
            var songInfo = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (songInfo[i] != undefined) {
                    console.log("Artist: " + songInfo[i].artists[0].name);
                    console.log("Song: " + songInfo[i].name);
                    console.log("Preview Url: " + songInfo[i].preview_url);
                    console.log("Album the song is from: " + songInfo[i].album.name);
                    console.log("------------------" + i + "------------------");
                }
            }
        }

    });
};