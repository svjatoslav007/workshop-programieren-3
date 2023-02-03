let matrix = [[]]
let matrixSize = 50;
let side = 10;
let socket = io();

//Tipp localhost:ist auf port 3001


function main() {

    socket.on('send matrix', drawMatrix);

    socket.on('isRaining', rainHandler);

    let myKillButton = document.getElementById('killButton');
    myKillButton.addEventListener('click', killHandler);

    let myNewGameButton = document.getElementById('newGame');
    myNewGameButton.addEventListener('click', newGameHandler);

    // let KillAllGrassButton = document.getElementById("killAllGrass")
    // KillAllGrassButton.addEventListener("click", killAllGrassHandler)

    // function killAllGrassHandler() {
    //     console.log("kill all grass")
    //     socket.emit("killAllGrass")
    // }
    function newGameHandler() {
        console.log("neues Spiel");
        socket.emit('newGame',25);
    }


    function rainHandler(data) {
        console.log("Regnet es: ", data);
        isRaining = data;
    }
    
    
    
    function killHandler() {
        console.log("Kill Button geklickt...");
        // send webSocket Nachricht an Server
        socket.emit('Kill', 10)
    }


    
}



// Funktion, die wird einmal ausgefÃ¼hrt bei Programmstart
function setup() {
    createCanvas(matrixSize * side + 1, matrixSize * side + 1);
    background('#acacac');
}



function drawMatrix(matrix) {
    // Zeichen des Spielfeldes
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            // farbe festlegen
            if (matrix[y][x] == 0) {
                fill('white');
            } else if (matrix[y][x] == 1) {
                fill('green');
                if (isRaining == true) {
                    fill('blue');
                }
            } else if (matrix[y][x] == 2) {
                fill(247, 255, 28);
                if (isRaining == true) {
                    fill(100, 93, 3);
                }
            } else if (matrix[y][x] == 3) {
                fill('red');
                if (isRaining == true) {
                    fill(118, 24, 0);
                }
            } else if (matrix[y][x] == 4) {
                fill('grey');
                if (isRaining == true) {
                    fill(74, 67, 65);
                }
            } else if (matrix[y][x] == 5) {
                fill('orange');
                if (isRaining == true) {
                    fill(146, 63, 7);
                }
            }
            //zeichne rect
            rect(x * side, y * side, side, side)
        }
    }
}





window.onload = main;

let buttonClick = document.getElementById('addGrazer')








