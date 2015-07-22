var http = require("http"),
    fs = require("fs");

var methods = Object.create(null);

http.createServer(function (request, response) {
    function respond(code, body, type) {
        if (!type) type = "text/plain";
        response.writeHead(code, {"Content-Type": type, 'Access-Control-Allow-Origin': '*'});
        if (body && body.pipe)
            body.pipe(response);
        else
            response.end(body);
    }

    if (request.method in methods)
        methods[request.method](urlToPath(request.url),
            respond, request);
    else
        respond(405, "Method " + request.method +
            " not allowed.");
}).listen(8000);

//определение запрашиваемого пути
function urlToPath(url) {
    var path = require("url").parse(url).pathname;
    var str = decodeURIComponent(path).toString();
    return str.substring(1);//начинаем с адреса после слэша после '...:8000'

}

methods.GET = function (path, respond) {
    fs.stat(path, function (error, stats) {
        console.log("get " + path);
        if (error && error.code == "ENOENT")
            respond(404, "File not found");
        else if (error)
            respond(500, error.toString());
        else if (stats.isDirectory())
            fs.readdir(path, function (error, files) {
                if (error)
                    respond(500, error.toString());
                else {
                    var result = [];
                    files.forEach(function (file) {
                        if (fs.existsSync(path + file)) {
                            var obj = {};
                            obj['name'] = file;
                            var sts = fs.statSync(path + file).isFile();
                            obj['isFile'] = sts;
                            result.push(obj);
                        }

                    });
                    respond(200, JSON.stringify(result));
                }
            });

        else
            respond(200, fs.createReadStream(path),
                require("mime").lookup(path));
    });
};

//methods.DELETE = function(path, respond) {
//    fs.stat(path, function(error, stats) {
//        if (error && error.code == "ENOENT")
//            respond(204);
//        else if (error)
//            respond(500, error.toString());
//        else if (stats.isDirectory())
//            fs.rmdir(path, respondErrorOrNothing(respond));
//        else
//            fs.unlink(path, respondErrorOrNothing(respond));
//    });
//};

//function respondErrorOrNothing(respond) {
//    return function(error) {
//        if (error)
//            respond(500, error.toString());
//        else
//            respond(204);
//    };
//}

//methods.PUT = function(path, respond, request) {
//    var outStream = fs.createWriteStream(path);
//    outStream.on("error", function(error) {
//        respond(500, error.toString());
//    });
//    outStream.on("finish", function() {
//        respond(204);
//    });
//    request.pipe(outStream);
//};

//methods.GET = function(path) {
//    //console.log("get!!!!!!!!!!!!!!!!!");
//    return inspectPath(path).then(function(stats) {
//        if (!stats) // Does not exist
//            return {code: 404, body: "File not found"};
//        else if (stats.isDirectory())
//            return fs.readdir(path).then(function(files) {
//                return {code: 200, body: files.join("\n")};
//            });
//        else
//            return {code: 200,
//                type: require("mime").lookup(path),
//                body: fs.createReadStream(path)};
//    });
//};
//
//function inspectPath(path) {
//    return fs.stat(path).then(null, function(error) {
//        if (error.code == "ENOENT") return null;
//        else throw error;
//    });
//}