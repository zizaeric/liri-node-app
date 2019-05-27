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

if (liriCommand === "concert-this") { 
    concertThis(); 
} else if (liriCommand === "spotify-this-song") { 
    spotifyThisSong(); 
} else if (liriCommand === "movie-this") { 
    movieThis(); 
} else if (liriCommand === "do-what-it-says") { 
    doWhatItSays(); 
}
else {
    console.log("Please try one of these commands");
    console.log("1. node liri.js concert-this 'artist/band name here'");
    console.log("2. node liri.js spotify-this-song 'song name here'");
    console.log("3. node liri.js movie-this 'movie name here'");
    console.log("4. node liri.js do-what-it-says");
    console.log("Names, songs, movies longer than one word must be in quotation marks");
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

            // Store the header for concertThis results in variable
            var eventsByArtist = "\r\n" + "Upcoming concerts for " + artist + ": " +"\r\n";

            if (!response.data.length) {
                console.log("No results found for " + artist);
                return;
            }

            // Print the header for concertThis to the console
            console.log(eventsByArtist);
            
            // Write the header for the results of the for loop below in the log.txt 
            log(eventsByArtist);

            for (var i = 0; i < response.data.length; i++) {

                var event = response.data[i];

                // Store the results returned by the API in a variable 
                var concertThisResults =
                    i + " - " +
                    event.venue.city + ", " +
                    (event.venue.region || event.venue.country) + " | " +
                    event.venue.name + " | " +
                    moment(event.datetime).format("MM/DD/YYYY") + "\r\n";

                // Display the results to the console
                console.log(concertThisResults);

                // Write the results to the log.txt file
                log(concertThisResults);
            }
        }
    ).catch(function(error) {
        console.log("Error: " + error);
        return;
    });
};

//---------------- spotifyThisSong Function ----------------------
// Uses Spotify module to call the node-spotify-api
function spotifyThisSong(songName) {

    var songName = process.argv[3];

    if (!songName) {
        songName = "The Sign";
    }

    spotify.search(
        { 
            type: "track", 
            query: songName 
        }, 
        function (err, data) {
        // console.log(data);

        if (!err) {
            
            // Store the header for spotify this song results in a variable
            var yourSongSpotified = "\r\n" + "Your song - " + songName + " - has been spotified!" + "\r\n";
            
            // Print the header for spotify this song results to the console
            console.log(yourSongSpotified); 
            
            // Write the header for the results of the for loop below in the log.txt 
            log(yourSongSpotified);
            
            var songInfo = data.tracks.items;
            // console.log(songInfo);

            for (var i = 0; i < 5; i++) {
                if (songInfo[i] != undefined) {

                    // Store these console logs into one variable and write that variable in the log file
                    var spotifyThisResults =
                        "Artist: " + songInfo[i].artists[0].name + "\r\n" +
                        "Song: " + songInfo[i].name + "\r\n" +
                        "Preview Url: " + songInfo[i].preview_url + "\r\n" +
                        "Album the song is from: " + songInfo[i].album.name + "\r\n" +
                        "------------------" + i + "------------------" + "\r\n";

                    console.log(spotifyThisResults);
                    log(spotifyThisResults);
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

            // Assign the movie info below to a single variable and write that variable in the log.txt file
            var movieThisResults =
                "----------" + movie + "----------" + "\r\n" +
                "Title: " + response.data.Title + "\r\n" +
                "Year: " + response.data.Year + "\r\n" +
                "Rated: " + response.data.Rated + "\r\n" +
                "Imbd Rating: " + response.data.ImbdRating + "\r\n" +
                "Country: " + response.data.Country + "\r\n" +
                "Language: " + response.data.Language + "\r\n" +
                "Plot: " + response.data.Plot + "\r\n" +
                "Actors: " + response.data.Actors + "\r\n" +
                "Rotten Tomatoes Rating: " + response.data.tomatoRating + "\r\n";

            console.log(movieThisResults);
            log(movieThisResults)

        }).catch(function(error) {
            console.log("Error: " + error);
            return;
        });
};

//------------------ doWhatItSays Function ------------------------
// Uses the fs module to access and read the comments of the random.txt file and passes that content to liri as commands to execute
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        // console.log(data);

        if(!error) {

           var doThisLiri = data.split(", ");
        //    console.log(doThisLiri[0]);
        //    console.log(doThisLiri[1]);

           spotifyThisSong(doThisLiri[0], doThisLiri[1]);
        } else {
            console.log("Error occurred" + error);
        }
    });
};

//---------------------------- log Function -----------------------
// Logs results of each command to the log.txt file
// Don't make headers part of the for loops when working with the different functions
function log(results) {
    fs.appendFile("log.txt", results, function(error) {
        if (error) {
            throw error;
        }
    });
}











