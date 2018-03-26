const http = require("http");
const request = require("request");
const express = require("express");
const app = express();
const port = 8910;

app.listen(port, () => {
    console.log(`listening port : ${port}`);
});

app.get("/", (req, res) => {
    res.send("Ahahahahaha!");
});
