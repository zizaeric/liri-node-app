// Read and set environment variables with the dotenv package

require("dotenv").config();

// Import the 'keys.js' file and store it in a variable

var keys = require("./keys.js");

// Access Spotify keys
var spotify = new spotify(keys.spotify);