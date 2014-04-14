
var fs = require('fs');
 
exports.creaDirectorios = function(){
   
    fs.readdir( "../",  function ( err, files ){ 

        if (err) {
            return console.log(err); 
        }
        else if( files.indexOf('media') < 0   ){ 
            fs.mkdirSync( "../media/", function(err){ 
                    if(err) // si ya existen da error
                        console.log(" ERROR al crear el directorio media ( ya existe )");
            });
        }

        /* dento de media creo un directorio para cada tipo de archivo */
        fs.readdir( "../media/",  function ( err, files ){ 

            if (err) {
                return console.log(err); 
            }
            if( files.indexOf('photo') < 0   ){ 
                fs.mkdir( "../media/photo/", function(err){ 
                        if(err) // si ya existen da error
                            console.log(" ERROR al crear el directorio photos ( ya existe )");
                });
            }
            if( files.indexOf('video') < 0   ){ 
                fs.mkdir( "../media/video/", function(err){ 
                        if(err) // si ya existen da error
                            console.log(" ERROR al crear el directorio videos ( ya existe )");
                });
            }
            if( files.indexOf('music') < 0   ){ 
                fs.mkdir( "../media/music/", function(err){ 
                        if(err) // si ya existen da error
                            console.log(" ERROR al crear el directorio music ( ya existe )");
                });
            }
            if( files.indexOf('other') < 0   ){ 
                fs.mkdir( "../media/other/", function(err){ 
                        if(err) // si ya existen da error
                            console.log(" ERROR al crear el directorio other( ya existe )");
                });
            }    
	    });

    });
}






