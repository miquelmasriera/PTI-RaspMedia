
/*Importem moduls*/
var fs = require('fs');

/*Variables globals*/
var appPath = '/home/pi/RaspMedia/';
var photoDir = appPath + 'photos/';
var musicDir = appPath + 'music/';
var videoDir = appPath + 'videos/';
var otherDir = appPath + 'other/';
 
exports.creaDirectorios = function(){
        
        fs.readdir( appPath,  function ( err, files ){ 

            if (err) {
                return console.log(err); 
            }
            if( files.indexOf('photos') < 0   ){ 
                fs.mkdir(photoDir, function(err){ 
                        if(err) // si ya existen da error
                            console.log(" ERROR al crear el directorio photos ( ya existe )");
                        
                        fs.mkdir( "/home/pi/PTI-RaspMedia/photos/min/", function (err){
                            if(err) 
                                console.log(" ERROR al crear el directorio de miniaturas ( ya existe )");
                        });
                });
            }
            if( files.indexOf('music') < 0   ){ 
                fs.mkdir(musicDir, function(err){ 
                        if(err) // si ya existen da error
                            console.log(" ERROR al crear el directorio music ( ya existe )");
                });
            }
            if( files.indexOf('videos') < 0   ){ 
                fs.mkdir(videoDir, function(err){ 
                        if(err) // si ya existen da error
                            console.log(" ERROR al crear el directorio videos ( ya existe )");
                });
            }            
            if( files.indexOf('other') < 0   ){ 
                fs.mkdir(otherDir, function(err){ 
                        if(err) // si ya existen da error
                            console.log(" ERROR al crear el directorio other( ya existe )");
                });
            }    
	    });
}
