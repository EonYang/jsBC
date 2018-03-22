var http = require("http");

http.createServer(
    function(req, res) {
        res.end("hello i'm a cool app built via VIM");
        console.log("new connection");
    }).listen(6666);
