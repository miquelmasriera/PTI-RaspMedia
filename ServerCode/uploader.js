
/*Importem moduls*/
var fs = require('fs');
var express = require('express');
var app = module.exports = express();

/*Variables globals*/
var appPath = '/home/pi/RaspMedia/';
var photoDir = appPath + 'photos/';
var musicDir = appPath + 'music/';
var videoDir = appPath + 'videos/';
var otherDir = appPath + 'other/';

app.use(express.bodyParser());

app.post('/upload', function ( req, res ){
        
    /*Control: console.log("Received file:\n" + JSON.stringify(req.files));*/

    var Dir = otherDir; /*Inicialitzem com a other i si el format és reconeixible canviem el directori*/    
    var typeFile = req.files.source.type;
    var filename = req.files.source.name;
    var filePath = req.files.source.path;
    
    if( typeFile.indexOf( "image" ) >= 0 ) {
        Dir = photoDir;
    }
    else if( typeFile.indexOf( "audio" ) >= 0) {
        Dir = musicDir;
    }
    else if( typeFile.indexOf( "video" ) >= 0) {
        Dir = videoDir;
    }
    
    fs.rename(filePath, Dir+filename, function( err ) {

        if( err ){
            console.log( err )
            res.send( {error:"problem writting"} );
        } else {
            res.send("ok");
        }

    });

});


