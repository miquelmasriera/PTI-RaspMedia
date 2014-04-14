
var express = require( "express" );
var app = express();
var fsManager = require( "./fsManager.js" );
var uploader = require( "./uploader.js" );

app.use( uploader );

fsManager.creaDirectorios();

app.listen( 4000 );
console.log( "Listening to port 4000 . . . . . " );
