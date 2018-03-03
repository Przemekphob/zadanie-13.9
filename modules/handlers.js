var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var url = require("url");


exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
		var filename = path.basename(files.upload.name);
        fs.renameSync(files.upload.path, filename);

		fs.readFile('templates/upload.html', 'utf8', function(err, html) {
        	response.writeHead(200, {"Content-Type": "text/html"});
        	response.write(html.replace('%imagesrc%', '/show?obrazek='+filename));
        	response.end();
		});

    });
}

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}

exports.styles = function(request, response) {
    console.log("Wysylam style");
    fs.readFile('css/style.css', function(err, css) {
        response.writeHead(200, {"Content-Type": "text/css"});
        response.write(css);
        response.end();
    });
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}

exports.show = function(request, response) {
	var obrazek = url.parse(request.url, true)['query']['obrazek'];
    fs.readFile(obrazek, "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
}