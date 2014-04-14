
var fs = require( 'fs' );
var express = require( 'express' ); // solo funciona con la version 3.X 
var app = module.exports = express();
app.use(express.bodyParser());
 
/* esta funcion es para poder probarlo via browser
lo hara la app Android */
app.get('/', function ( req, res ){ 
    res.sendfile( __dirname + "/form.html" );
});

app.post('/upload', function ( req, res ){
    
    //console.log("Received file:\n" + JSON.stringify(req.files));
 
    /* inicializo como other, y si es elgun otro tipo lo cambio */     
    var Dir = "../media/other/";
    var typeFile = req.files.source.type;

    if( typeFile.indexOf( "image" ) >= 0 ) {
        Dir = "../media/photo/";
    }
    else if( typeFile.indexOf( "video" ) >= 0) {
        Dir = "../media/video/";
    }
    else if( typeFile.indexOf( "audio" ) >= 0) {
        Dir = "../media/music/";
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




