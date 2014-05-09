
/*Importem moduls*/
var fs = require('fs');
var im = require('imagemagick');
var mm = require('musicmetadata');
var exec = require('child_process').exec;
var express = require('express');
var app = module.exports = express();

/*Variables globals*/
var appPath = '/home/pi/RaspMedia/';
var photoDir = appPath + 'photos/';
var musicDir = appPath + 'music/';
var videoDir = appPath + 'videos/';
var otherDir = appPath + 'other/';

/*Funció que codifica un fitxer a base 64*/
function base64_encode( file ) {

    var bitmap = fs.readFileSync( file );
    return new Buffer( bitmap ).toString('base64');
}

/*Funció que llista les cançons del servidor*/
app.post( '/listMusic', function ( req, res ){
 
    var jsonOBJ = {
            songs: []
    }

    fs.readdir(musicDir, function(err,files) {
        if(err) throw err;
        var total_files = 0;
        files.forEach(function(file) {                  
            if( file.indexOf(".mp3") != -1 ) ++total_files;
        });
        console.log("Number of songs: "+total_files);
        if (total_files == 0) {
            res.writeHead(500,'empty_folder');
            res.end();
        }
        else { // hay archivos de musica
            var cont = 0;
            files.forEach( function ( file ){

                if( file.indexOf(".mp3") > 0 ){ 
                    var teFoto = 0;
            
                    var jsonSong = { name:"-", title:"-", artist:"-",
                                    year:"-", pic:"-" }

                    var parser = mm(fs.createReadStream(musicDir+file));

                    jsonSong.name = file;

                    parser.on('artist',function (result) {
                            if (result != null) jsonSong.artist = result;
                    });

                    parser.on('title',function (result) {
                            if (result != null) jsonSong.title = result;
                    });

                    parser.on('year',function (result) {
                            if (result != null) jsonSong.year = result;
                    });

                    if( jsonSong.title == jsonSong.artist ){    // si los dos son "-"
                        jsonSong.title = file.substring(0,(file.length - 4));
                    }

                    parser.on('picture',function (result) {
                        teFoto = 1;
                        var pic_name = file.substring(0,(file.length - 4));
                        var format = result[0].format;
                         
                        fs.writeFileSync('/tmp/'+pic_name+format, result[0].data);
                        var options = {
                            width: 35, //70,
                            height: 35, //70,
                            srcPath: '/tmp/'+pic_name+format,
                            dstPath: '/tmp/'+pic_name+format                
                        };

                        im.resize(options,function(err) {
                            if(err) throw err;

                            var photo = base64_encode('/tmp/'+pic_name+format);
                            jsonSong.pic = photo;
                            fs.unlinkSync('/tmp/'+pic_name+format)

                            ++cont;

                            jsonOBJ.songs.push(jsonSong);

                            if (cont == total_files) { 
                                jsonOBJ = JSON.stringify(jsonOBJ);
                               
                                if (jsonOBJ == null) res.writeHead(500,'ERROR');
                                else {
                                        res.writeHead(200,{ 'Content-Type': 'application/json' });
                                        res.end(jsonOBJ+"");
                                }
                                res.end();
                            }
                        });
                    }); //parser on pictire

                    parser.on('done',function(err) {
                            if (!teFoto) {     
                                ++cont;
                                jsonOBJ.songs.push(jsonSong);
                                if (cont == total_files) { 
                                    jsonOBJ = JSON.stringify(jsonOBJ);                                                       
                                    if (jsonOBJ == null) res.writeHead(500,'ERROR');
                                    else {
                                            res.writeHead(200,{ 'Content-Type': 'application/json' });
                                            res.end(jsonOBJ+"");
                                    }
                                    res.end();
                                }    
                            }                                   
                    }); // parser on done
                } // finIf son mp3                     
            }); // forEach                    
        } // finElse hay archivos musica
    }); // fs readdir       
}); // listmusic

 
app.post('/listVideos', function(req, res){
    var jsonOBJ = {
            videos: []
    }

    fs.readdir(videoDir, function(err,files) {
        if(err) throw err;
        var total_files = 0;
        files.forEach(function(file) {
            if(file.indexOf(".mp4") != -1 || file.indexOf(".mpeg") != -1 || 
                    file.indexOf(".avi") != -1 || file.indexOf(".mkv") != -1 || file.indexOf(".mpg") != -1 ) {
                    ++total_files;
            }
        });
        console.log("Number of files: "+total_files);
        if (total_files == 0) {
                res.writeHead(500,'empty_folder');
                res.end();
        }
        else {
            var cont = 0;
            files.forEach( function (file){
                if(file.indexOf(".mp4") != -1 || file.indexOf(".mpeg") != -1 || 
                    file.indexOf(".avi") != -1 || file.indexOf(".mkv") != -1 || file.indexOf(".mpg") != -1 ) {

                    var jsonVideo = { name:"",
                                    base64:"" }
                    
                    var img_name = file.substring(0,(file.length - 4));
                   
                    exec("ffmpeg -i "+videoDir+file+" -ss 00:02 -r 1 -an -s 100x75 -vframes 1 -f mjpeg /tmp/"+img_name+".jpg", function () {
                        var thumb = base64_encode('/tmp/'+img_name+".jpg");
                        jsonVideo.name = file;
                        jsonVideo.base64 = thumb;
                        jsonOBJ.videos.push(jsonVideo);
                        ++cont;

                        fs.unlinkSync('/tmp/'+img_name+".jpg")

                        if (cont == total_files) {
                            jsonOBJ = JSON.stringify(jsonOBJ);
                   
                            if (jsonOBJ == null) {
                                res.writeHead(500,'ERROR');
                                res.end();
                            }
                            else {
                                res.writeHead(200,{ 'Content-Type': 'application/json' });
                                res.end(jsonOBJ+"");
                            }  
                        }       
                    });                        
                }       
            }); 
        }       
    });
});

app.post( '/listPhotos', function ( req, res ){
    var jsonOBJ = {
            photos: []
    }

    fs.readdir(photoDir, function ( err, files ){
        if(err) throw err;
        var total_files = 0;
        files.forEach(function(file) {
            if(file.indexOf(".jpeg") != -1 || file.indexOf(".jpg") != -1 || file.indexOf(".png") != -1 ) {
                    ++total_files;
            }
        });
        console.log( "Number of files: " + total_files );
        if (total_files == 0) {
                res.writeHead( 500, 'empty_folder' );
                res.end();
        }
        else {
            var cont = 0;
            files.forEach( function ( file ){
                if(file.indexOf(".jpeg") != -1 || file.indexOf(".jpg") != -1 || file.indexOf(".png") != -1 ) {

                    var jsonPhoto = { name:"",
                                    base64:"" }
                    
                    var options = {
                        width: 200,//300,
                        height: 200, //300,
                        srcPath: photoDir+file,
                        dstPath: '/tmp/'+file                        
                    };

                    im.crop( options, function ( err ) {
                        if( err ) throw err;

                        var photo = base64_encode('/tmp/'+file);
                        jsonPhoto.name = file;
                        jsonPhoto.base64 = photo;
                        jsonOBJ.photos.push(jsonPhoto);
                        ++cont;

                        fs.unlinkSync( '/tmp/'+file );

                        if ( cont == total_files ) {
                            
                            jsonOBJ = JSON.stringify( jsonOBJ );
                   
                            if ( jsonOBJ == null ) {
                                res.writeHead( 500,'ERROR' );
                                res.end();
                            }
                            else {
                                res.writeHead( 200,{ 'Content-Type': 'application/json' });
                                res.end( jsonOBJ+"" );
                            }  
                        }
                    });                 
                }       
            }); 
        }       
    });
});