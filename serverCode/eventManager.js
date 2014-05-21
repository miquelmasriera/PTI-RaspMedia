
/*Importem moduls*/
var omx = require('omxctrl');
var express = require('express');
var app = module.exports = express();
var child_process = require('child_process');
var exec = require('child_process').exec;

/*Variables globals*/
var name, child;
var videoPlayer = 'omxplayer';
var imagePlayer = 'gpicview';
var appPath = '/home/pi/RaspMedia/';
var photoDir = appPath + 'photos/';
var musicDir = appPath + 'music/';
var videoDir = appPath + 'videos/';
var otherDir = appPath + 'other/';

function sendResponse(res) {

    res.writeHead(200,"0K",{'Content-Type': 'text/plain'});
    res.end();

}

/*Funció que mostra la foto que rep com a paràmetre d'una petició post*/
app.post('/exePhoto', function(req, res) {
    name = req.body.name;
    child = child_process.spawn(imagePlayer, [photoDir + name]);
    sendResponse(res);
});

app.post('/leftPhoto', function(req,res) {        
    child_process.spawn('xdotool', ['key', 'Left']);
    sendResponse(res);     
});

app.post('/rightPhoto', function(req,res) {        
    child_process.spawn('xdotool', ['key', 'Right']);
    sendResponse(res);     
});

app.post('/photoFullscreen', function(req,res) {
    child_process.spawn('xdotool', ['key', 'F11']);
    sendResponse(res);     
});

/*Funció que tanca la foto que s'està visualitzant*/
app.post('/StopPhoto', function(req,res) {
    child.kill('SIGKILL');
    sendResponse(res);
});

/*Funció que reprodueix la cançó que rep com a paràmetre d'una petició post*/
app.post('/exeMusic', function(req,res) {
    name = req.body.name;
    omx.play(musicDir + name);
    sendResponse(res);
});

/*Funció que pausa la cançó que s'està reproduint*/
app.post('/pauseMusic', function(req,res) {
    omx.pause();
    sendResponse(res);
});

/*Funció que continua reproduint una cançó pausada*/
app.post('/playMusic', function(req,res) {
    omx.pause();
    sendResponse(res);
});

/*Funció que para la cançó que s'està visualitzant i tanca el reproductor*/
app.post('/StopMusic', function(req,res) {        
    omx.stop();
    sendResponse(res);  
});

/*Funció que reprodueix el video que rep com a paràmetre d'una petició post*/
app.post('/exeVideo', function(req,res) {
    name = req.body.name;
    omx.play(videoDir + name);
    sendResponse(res);
});

/*Funció que pausa el video que s'està reproduint*/
app.post('/pauseVideo', function(req,res) {
    omx.pause();
    sendResponse(res);
});

/*Funció que continua reproduint un video pausat*/
app.post('/playVideo', function(req,res) {    
    omx.pause();
    sendResponse(res);
});

/*Funció que para el video que s'està visualitzant i tanca el reproductor*/
app.post('/StopVideo', function(req,res) {
    omx.stop();
    sendResponse(res);
});
