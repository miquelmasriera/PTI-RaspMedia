
var express = require( "express" );
var app = express();
var fsManager = require( "./fsManager.js" );
var uploader = require( "./uploader.js" );
var listManager = require( "./listManager.js" );
var eventManager = require( "./eventManager" );

app.use( uploader );
app.use( listManager );
app.use( eventManager );

fsManager.creaDirectorios();

/*******************/
app.post( "/Rasp", function ( req, res ) {
    console.log( "OK" );
    res.writeHead( 200, "0K",{'Content-Type': 'text/plain'} );
    res.end();      
});
/*******************/

app.listen( 8000 );
console.log( "Listening to port 8000 . . . . . " );