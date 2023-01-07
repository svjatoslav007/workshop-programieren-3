


let matrix = [
    [0, 0, 1, 0, 0],
    [1, 4, 0, 0, 0],
    [0, 1, 0, 3, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 5, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 0]
 ];

let fr = 5;
let side = 10;

// Lebewesen
// Liste mit Grass-Objekten
let grassArr = [];
// Liste mit Grassfresser-Objekten
let grazerArr = [];
let predatorArr =[];
let toadstoolArr=[];
let kannibaleArr=[];

function getRandMatrix(cols, rows){
    let matrix = [];
    for(let y = 0; y < rows; y++){
        matrix[y] = []; // Zeilenarray
        for(let x = 0; x < cols; x++){
            matrix[y][x] = Math.round(random(0,1));
        }
    }
    return matrix;
}

// Funktion, die wird einmal ausgefÃ¼hrt bei Programmstart
function setup(){

    matrix =getRandMatrix(50,50);
    
    for(let i=0; i <= 30; i++){
        let y = i *3;
        if(y >= 38) {y =26;}
        let x = i *2;
        if(x >= 45){ x = 12;}

        matrix[y][x]=4;

    }for(let i=0; i <= 20; i++){
        let y = i *3;
        if(y >= 50) {y =43;}
        let x = i *2;
        if(x >= 50){ x = 20;}
        matrix[y][x]=2;
    }
   
    for(let i=0; i <= 18; i++){
        let y = i *2;
        if(y >= 45) {y =42;}
        let x = i *2;
        if(x >= 20){ x = 45;}
        matrix[y][x]=5;

        matrix[10][10]=4;
        matrix[20][25]=4;
        matrix[30][20]=4; 
        matrix[40][35]=4;
        matrix[1][1]=1;
        
        matrix[48][1]=1; 
        matrix[39][38]=3;
        matrix[35][34]=3;
        matrix[10][40]=5;

        
        

    }
    for(let i=0; i <= 20; i++){
        let y = i *3;
        if(y >= 48) y =45;
        let x = i *2;
        if(x >= 48) x = 37;
        matrix[y][x]=3;
    }
  
    createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
    background("#acacac");
    // noStroke();
    frameRate(fr);

    // Testobjekt erstellen
    // let grassObj1 = new Grass(1, 2);
    // console.log(grassObj1);
    // console.log(grassObj1.chooseFields(0));

    // durch Matrix laufen und Lebewesen erstellen
    for(let y in matrix){
        y = parseInt(y);
        for(let x in matrix[y]){
            x = parseInt(x);
            // wenn der Wert 1, dann Grass-Objekt erstellen
            if(matrix[y][x] == 1){
                let grassObj = new Grass(x,y);
                grassArr.push(grassObj);
            }else if(matrix[y][x] == 2){
                let grazerObj = new Grazer(x,y);
                grazerArr.push(grazerObj);
            }else if(matrix[y][x] == 3){
                let predatorObj = new Predator(x,y);
                predatorArr.push(predatorObj);
            }else if(matrix[y][x] == 4){
                let toadstoolObj = new Toadstool(x,y);
                toadstoolArr.push(toadstoolObj);
            }else if(matrix[y][x] == 5){
                let kannibaleObj = new Kannibale (x,y);
                kannibaleArr.push(kannibaleObj);
            }
            
        }
    }
    console.log(kannibaleArr);
 }

// Funktion wiederholend ausgefÃ¼hrt
function draw(){
   
    // alle Grassobjekte updaten
    for(let i = 0; i < grassArr.length; i++){
        let grassObj = grassArr[i];
        grassObj.mul();
    }

    for(let i = 0; i < grazerArr.length; i++){
        let grazerObj = grazerArr[i];
        grazerObj.eat();
        grazerObj.mul();

    }
    for(let i = 0; i < predatorArr.length; i++){
        let predatorObj = predatorArr[i];
        predatorObj.eat();
        predatorObj.mul();

    }
    for(let i = 0; i < toadstoolArr.length; i++){
        let toadstoolObj = toadstoolArr[i];
        toadstoolObj.eat();
        

    }
    for(let i = 0; i < kannibaleArr.length; i++){
        let kannibaleObj =kannibaleArr[i];
        kannibaleObj.eat_predator();
        kannibaleObj.eat_grazer();
        kannibaleObj.mul();

        

    }
    for(let y in matrix){
        y = parseInt(y);
        for(let x in matrix[y]){
            x = parseInt(x);
            let farbWert = matrix[y][x];
            fill("#ffffff");
            // Wert 0 - Weiss
            if(farbWert === 1){
                // Wert 1 - GrÃ¼n
                fill("#00ff00");
            }else if(farbWert === 2){
                // Wert 2 - Gelb
                fill("#ffff00");
            }else if(farbWert === 3){
                // Wert 3 = Rot
                fill("#ff0000");
            }else if(farbWert === 4){
                // Wert 3 = Rot
                fill("#826E40");
            }else if(farbWert === 5){
                // Wert 3 = Rot
                fill("#FF6800");
            }
            rect(x * side, y *side, side, side);
        }
    }
}