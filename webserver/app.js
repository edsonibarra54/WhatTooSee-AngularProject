const http = require("http");

http.createServer( (req, res) => {
    if(req.method == "GET")
        res.write("Hola a todos");
    else if(req.method == "POST")
        res.write("Hola mundo");
    res.end();
} ).listen(8080);
