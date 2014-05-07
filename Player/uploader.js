
var express = require('express'); // EXPRESS 3.5.1       
var app = module.exports = express();
app.use(express.bodyParser());
var fs = require('fs');

app.post('/upload', function ( req, res ){
        
    //console.log("Received file:\n" + JSON.stringify(req.files));
 
    /* inicializo como other, y si es elgun otro tipo lo cambio */     
    var Dir = "../other/";
    var typeFile = req.files.source.type;

    if( typeFile.indexOf( "image" ) >= 0 ) {
        Dir = "../photos/";
    }
    else if( typeFile.indexOf( "video" ) >= 0) {
        Dir = "../videos/";
    }
    else if( typeFile.indexOf( "audio" ) >= 0) {
        Dir = "../music/";
    }
    
    /* para guardarlo
    le paso el path origen, el destino y una funcion de erroes*/
    fs.rename(
        req.files.source.path,
        Dir+req.files.source.name,
        function( err ){
            if( err ){
                console.log( err )
                res.send( {error:"problem writting"} );
             } 
            else {
                res.send("ok");
            }
         }
    );
});


