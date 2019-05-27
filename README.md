# liri-node-app
Language Interpretation and Recognition Interface (LIRI) command line node app. Think SIRI for written text instead of speech. 

SIRI *speech interpretation and recognition interface*.

# LIRI's functionality

## 1. LIRI understands the following commands:
    node | liri.js | process.argv[2] | process.argv[3]
    -----|---------|-----------------|----------------
    1. node | liri.js | spotify-this-song | 'song name' 
    2. node | liri.js | movie-this | 'movie name'
    3. node | liri.js | concert-this | 'artist/band name'
    4. node | liri.js | do-what-it-says |

## 2. LIRI handles incomplete commands as listed below:
### 1. Missing process.argv[2] and process.argv[3]
    command | LIRI's response
    --------|----------------
    node liri.js | "Please try one of these commands: "
    followed by the list of commands above.

See screenshot below.
![Commands LIRI Understands](./screenshots_liri/liri-node-app_commands.jpg?raw=true);



## 
* Screenshots of LIRI's functionality:
2. ![concert-this](./screenshots_liri/liri-node-app_concertThis.png);
3. [spotify-this-song](./screenshots_liri/liri-node-app_spotifyThisSong.png);
4. [movie-this](./screenshots_liri/liri-node-app_movieThis.png);
5. [do-what-it-says](./screenshots_liri/liri-node-app_doWhatItSays.png);
6. [log.txt_File1](./screenshots_liri/liri-node-app_logFile1.png);
7. [log.txt_File2](./screenshots_liri/liri-node-app_logFile2.png);

