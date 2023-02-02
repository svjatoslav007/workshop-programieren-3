const Grass = require("./grass.js")
const Grazer = require("./grazer.js")
const Kannibale = require("./kannibale.js")
const Predator = require("./predator.js")
const Toadstool = require("./Toadstool.js")

const express = require("express");
const app = express();
let httpserver = require("http").Server(app);
let { Server } = require("socket.io");
const io = new Server(httpserver);
app.use(express.static("./"));
app.get("./", function (req, res) {
    res.redirect("index.html")
})





matrix = [
    [0, 0, 1, 0, 0],
    [1, 4, 0, 0, 0],
    [0, 1, 0, 3, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 5, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 0]
];



// Lebewesen
// Liste mit Grass-Objekten
grassArr = [];
// Liste mit Grassfresser-Objekten
grazerArr = [];
predatorArr = [];
toadstoolArr = [];
kannibaleArr = [];

let isRaining = false;


function getRandMatrix(cols, rows) {
    let matrix = [];
    for (let y = 0; y < rows; y++) {
        matrix[y] = []; // Zeilenarray
        for (let x = 0; x < cols; x++) {
            matrix[y][x] = Math.floor(Math.random() * 6);
        }
    }
    return matrix;
}

// Funktion, die wird einmal ausgefÃ¼hrt bei Programmstart
function initGame() {


    matrix = getRandMatrix(50, 50);

    // durch Matrix laufen und Lebewesen erstellen
    for (let y in matrix) {
        y = parseInt(y);
        for (let x in matrix[y]) {
            x = parseInt(x);
            // wenn der Wert 1, dann Grass-Objekt erstellen
            if (matrix[y][x] == 1) {
                let grassObj = new Grass(x, y);
                grassArr.push(grassObj);
            } else if (matrix[y][x] == 2) {
                let grazerObj = new Grazer(x, y);
                grazerArr.push(grazerObj);
            } else if (matrix[y][x] == 3) {
                let predatorObj = new Predator(x, y);
                predatorArr.push(predatorObj);
            } else if (matrix[y][x] == 4) {
                let toadstoolObj = new Toadstool(x, y);
                toadstoolArr.push(toadstoolObj);
            } else if (matrix[y][x] == 5) {
                let kannibaleObj = new Kannibale(x, y);
                kannibaleArr.push(kannibaleObj);
            }

        }
    }

}



function updateGAme() {
    //draw
    for (let i = 0; i < grassArr.length; i++) {
        let grassObj = grassArr[i];
        grassObj.mul();
    }

    for (let i = 0; i < grazerArr.length; i++) {
        let grazerObj = grazerArr[i];
        grazerObj.eat();
        grazerObj.mul();

    }
    for (let i = 0; i < predatorArr.length; i++) {
        let predatorObj = predatorArr[i];
        predatorObj.eat();
        predatorObj.mul();

    }
    for (let i = 0; i < toadstoolArr.length; i++) {
        let toadstoolObj = toadstoolArr[i];
        toadstoolObj.eat();


    }
    for (let i = 0; i < kannibaleArr.length; i++) {
        let kannibaleObj = kannibaleArr[i];
        kannibaleObj.eat_predator();
        kannibaleObj.eat_grazer();
        kannibaleObj.mul();
    }
    //console.log(matrix)
    console.log("send matrix");
    io.emit("send matrix", matrix)
}

io.on("connection", function (socket) {
    console.log("client ws connection established...");
    io.emit("send matrix", matrix)

    socket.on("kill",function(data){
        console.log("client clickt killbutton",data)

    })
    socket.on("newGame", function(data){
        console.log("client wants do add Garzer", data)
        for (let y = 0; y < 50; y++) {
            matrix[y] = []; // Zeilenarray
            for (let x = 0; x < 50; x++) {
                matrix[y][x] = Math.floor(Math.random() * 6);
            }
        }
        data = matrix
    })
})

httpserver.listen(3001, function () {
    console.log("server leuft auf port 3001")

 
    

    initGame()
    setInterval(function () {
        updateGAme();
    }, 1000);

    setInterval(function () {
        isRaining = !isRaining;
        io.emit("isRaining", isRaining);
        console.log("Regnet es ", isRaining);
    }, 5000);


   
});

