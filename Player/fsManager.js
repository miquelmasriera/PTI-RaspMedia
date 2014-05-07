var fs = require('fs');
 
exports.creaDirectorios = function(){
        
        fs.readdir( "../",  function ( err, files ){ 

            if (err) {
                return console.log(err); 
            }
            if( files.indexOf('photos') < 0   ){ 
                fs.mkdir( "../photos/", function(err){ 
                        if(err) // si ya existen da error
                            console.log(" ERROR al crear el directorio photos ( ya existe )");
                });
            }
            if( files.indexOf('videos') < 0   ){ 
                fs.mkdir( "../videos/", function(err){ 
                        if(err) // si ya existen da error
                            console.log(" ERROR al crear el directorio videos ( ya existe )");
                });
            }
            if( files.indexOf('music') < 0   ){ 
                fs.mkdir( "../music/", function(err){ 
                        if(err) // si ya existen da error
                            console.log(" ERROR al crear el directorio music ( ya existe )");
                });
            }
            if( files.indexOf('other') < 0   ){ 
                fs.mkdir( "../other/", function(err){ 
                        if(err) // si ya existen da error
                            console.log(" ERROR al crear el directorio other( ya existe )");
                });
            }    
	    });
}
