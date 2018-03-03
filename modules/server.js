var http = require('http');
var colors = require('colors');
var url = require('url');

var handlers = require('./handlers'); 

process.env.TMP = process.cwd() + '/temp';
process.env.TEMP = process.cwd() + '/temp';
process.env.TMPDIR = process.cwd() + '/temp';


function start() {
  function onRequest(request, response) {
    console.log("Odebrano zapytanie.".green);
    console.log("Zapytanie " + request.url + " odebrane.");

    response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
    _url = url.parse(request.url, true);

    switch (_url.pathname) {
        case '/':
        case '/start':
            handlers.welcome(request, response);
            break;
        case '/upload':
            handlers.upload(request, response);
            break; 
        case '/show':
    		handlers.show(request, response);
    		break;
    	case '/css/style.css':
    		handlers.styles(request, response);
    		break;
        default:
        	handlers.error(request, response);
    }
  }

  http.createServer(onRequest).listen(9000);

  console.log("Uruchomiono serwer!".green);
}

exports.start = start;