var express = require('express');       
//var app = express();
var app = module.exports = express();

var fs = require('fs');
var mm = require('base64');
var im = require('imagemagick');
var child_process = require('child_process');
var exec = require('child_process').exec;
var mm = require('musicmetadata');

var http = require( 'http' );
var server = http.createServer(app);

var io = require('socket.io').listen(server);
server.listen(3434);


var sys = require('sys');

var type;


var name;
var child;

app.post('/Rasp', function(req, res){
    console.log("OK");
    res.writeHead(200,"0K",{'Content-Type': 'text/plain'});
    res.end();       
});
         

app.post('/exeVideo', function(req,res) {
    name = req.body.name;
    child = child_process.spawn('chromium-browser', ['RaspMediaVideos.html']);    
    child.on('exit', function() {            
        res.writeHead(200,"0K",{'Content-Type': 'text/plain'});
        res.end(); 
    });
});

app.post('/exeMusic', function(req,res) {
    name = req.body.name;
    child = child_process.spawn('chromium-browser', ['RaspMediaMusic.html']);    
    child.on('exit', function() {            
        res.writeHead(200,"0K",{'Content-Type': 'text/plain'});
        res.end(); 
    });
});

app.post('/exePhoto', function(req,res) {
    name = req.body.name;
    child = child_process.spawn('chromium-browser', ['RaspMediaPhotos.html']);    
    child.on('exit', function() {            
        res.writeHead(200,"0K",{'Content-Type': 'text/plain'});
        res.end(); 
    });
});

io.on("connection", function ( socket ){ 

    socket.on("playerplaying_video", function() {
        io.sockets.emit("changesource_video", "../videos/"+name);
    });
    socket.on("playerplaying_music", function() {
        io.sockets.emit("changesource_music", "../music/"+name);
    });
    socket.on("playerplaying_photo", function() {
        io.sockets.emit("changesource_photos", "../photos/"+name);
    });

    app.post('/playVideo', function(req,res) {
        name = req.body.name;
        io.sockets.emit("playvideo");
        res.writeHead(200,"0K",{'Content-Type': 'text/plain'});
        res.end();          
    });
     
    app.post('/pauseVideo', function(req,res) {
        name = req.body.name;
        io.sockets.emit("pausevideo");
        res.writeHead(200,"0K",{'Content-Type': 'text/plain'});
        res.end();      
    });

    app.post('/changePhoto', function(req,res) {
        name = req.body.name;
        io.sockets.emit("changephoto","../photos/"+name);
        res.writeHead(200,"0K",{'Content-Type': 'text/plain'});
        res.end();      
    });

    app.post('/playMusic', function(req,res) {
        name = req.body.name;
        io.sockets.emit("playmusic");
        res.writeHead(200,"0K",{'Content-Type': 'text/plain'});
        res.end();          
    });
     
    app.post('/pauseMusic', function(req,res) {
        name = req.body.name;
        io.sockets.emit("pausemusic");
        res.writeHead(200,"0K",{'Content-Type': 'text/plain'});
        res.end();      
    });

    app.post('/FullScreen', function(req,res) {
        name = req.body.name;
        io.sockets.emit("full");
        res.writeHead(200,"0K",{'Content-Type': 'text/plain'});
        res.end();      
    });

    app.post('/StopVideo', function(req,res) {
        name = req.body.name;
        exec("xdotool key ctrl+w", function() {            
            res.writeHead(200,"0K",{'Content-Type': 'text/plain'});
            res.end();  
        });    
    });
    

    app.post('/StopMusic', function(req,res) {
        name = req.body.name;
        exec("xdotool key ctrl+w", function() {            
            res.writeHead(200,"0K",{'Content-Type': 'text/plain'});
            res.end();  
        });    
    });

    app.post('/StopPhoto', function(req,res) {
        name = req.body.name;
        exec("xdotool key ctrl+w", function() {            
            res.writeHead(200,"0K",{'Content-Type': 'text/plain'});
            res.end();  
        });    
    });
    
});