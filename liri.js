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

// Import the moment npm package
var moment = require("moment");
//---------------Commands that LIRI understands---------------------

if (liriCommand === "concert-this") { concertThis(); }
else if (liriCommand === "spotify-this-song") { spotifyThisSong(); }
else if (liriCommand === "movie-this") { movieThis(); }
else if (liriCommand === "do-what-it-says") { doWhatItSays(); }
else {
    console.log("Please try one of these commands");
    console.log("1. node liri.js concert-this 'artist/band name here'");
    console.log("2. node liri.js spotify-this-song 'song name here'");
    console.log("3. node liri.js movie-this 'movie name here'");
    console.log("4. node liri.js do-what-it-says");
    console.log("Song names longer than one word must be in quotation marks");
};

//---------------------------Functions----------------------------

//------------------ concertThis Function ------------------------
// uses axios npm package to call the Bands in Town Artist Events API
// uses moment npm package to format date as MM/DD/YYYY
function concertThis(artist) {
    var artist = process.argv[3];
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    if (!artist) {
        console.log("Please give me a band or artist to search for.");
        return;
    }
    axios.get(queryURL).then(
        function(response) {
            // console.log(response);
            // console.log(response.data);
            if (!response.data.length) {
                console.log("No results found for " + artist);
                return;
            }
            console.log("Upcoming concerts for " + artist + ":");
            for (var i = 0; i < response.data.length; i++) {
                var event = response.data[i];
                console.log(i + " - " +
                    event.venue.city + ", " + (event.venue.region || event.venue.country) + " at " + event.venue.name + ", " +
                    moment(event.datetime).format("MM/DD/YYYY")
                );
            }
        }
    );
};

//---------------- spotifyThisSong Function ----------------------
// Uses Spotify module to call the node-spotify-api
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
                    // Store these console logs into one variable and write that variable in the log file
                    console.log("Artist: " + songInfo[i].artists[0].name);
                    console.log("Song: " + songInfo[i].name);
                    console.log("Preview Url: " + songInfo[i].preview_url);
                    console.log("Album the song is from: " + songInfo[i].album.name);
                    console.log("------------------" + i + "------------------");
                }
            }
        } else {
            console.log("Error: " + err);
            return;
        }
    });
};

//------------------- movieThis Function --------------------------
// Uses axios npm package to retrieve movie info from the OMDB API
function movieThis(movie) {
    var movie = process.argv[3];
    if (!movie) {
        movie = "mr nobody";
    }
    var urlMovie = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    axios.get(urlMovie).then(
        function (response) {
            // console.log(response);
            // console.log(response.data);
            // Next step: Assign the movie info below to a single variable and write that variable in the log.txt file
            console.log("----------" + movie + "----------");
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("Rated: " + response.data.Rated);
            console.log("Imbd Rating: " + response.data.ImbdRating);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("Rotten Tomatoes Rating: " + response.data.tomatoRating);
        }).catch(function(error) {
            console.log("Error: " + error);
            return;
        });
};

//------------------ doWhatItSays Function ------------------------
// Uses the fs module to access and read the comments of the random.txt file and do what's written in it
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if(!error) {
            // console.log(data);
           var doThisLiri = data.split(", ");
        //    console.log(doThisLiri[0]);
        //    console.log(doThisLiri[1]);
           spotifyThisSong(doThisLiri[0], doThisLiri[1]);
        } else {
            console.log("Error occurred" + error);
        }
    });
};










