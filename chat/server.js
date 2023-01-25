const express = require("express");

const app = express();
let httpserver = require("http").Server(app);

let { Server } = require("socket.io");
const io = new Server(httpserver);

app.use(express.static("./"));
app.get("/", function (req, res) {
    res.redirect("index.html")
})

httpserver.listen(3000, function () {
    console.log("server gestartet -hört auf port 3000")
});

let messages =[];

//ws handlung
io.on("connection", function (socket) {
    console.log("ws connection established")

    for (let i = 0; i < messages.length; i++) {
        socket.emit("display message",messages[i]);

    }
    socket.emit("display message",msg);

    socket.on("send message",function(data){
        messages.push(data);
        //sendet alle client
        io.emit("display message",data);
        console.log(messages);

    })
    socket.on("disconnect",function (reason) {
        console.log("disconnect because of:",reason);
        
    })
});