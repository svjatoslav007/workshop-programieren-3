
let side = 10;
let matrixSize = 50;
let isRaining = false;
let socket =null

function main() {
     socket = io();
    socket.on("send matrix", drawMatrix);
    socket.on("isRaining",rainHandler);
    let myKillBtn =document.getElementById("killButton");
    myKillBtn.addEventListener("click",klickHandler)
}
function rainHandler(data){
    console.log("regnet es; ",data)
    isRaining=data;



}
function klickHandler(event){
    console.log("kill Buttom gekiliclkt")
}

// Funktion, die wird einmal ausgefÃ¼hrt bei Programmstart
function setup() {
    createCanvas(matrixSize * side + 1,matrixSize * side + 1);
    background("#acacac");
}

// Funktion wiederholend ausgefÃ¼hrt
function drawMatrix(matrix) {

    for (let y in matrix) {
        y = parseInt(y);
        for (let x in matrix[y]) {
            x = parseInt(x);
            let farbWert = matrix[y][x];
            fill("#ffffff");
            // Wert 0 - Weiss
            if (farbWert === 1) {
                if(isRaining){
                    fill("blue")
                }
                // Wert 1 - GrÃ¼n
                fill("#00ff00");
            } else if (farbWert === 2) {
                // Wert 2 - Gelb
                fill("#ffff00");
            } else if (farbWert === 3) {
                // Wert 3 = Rot
                fill("#ff0000");
            } else if (farbWert === 4) {
                // Wert 3 = Rot
                fill("#826E40");
            } else if (farbWert === 5) {
                // Wert 3 = Rot
                fill("#FF6800");
            }
            rect(x * side, y * side, side, side);
        }
    }
}

window.onload = main;