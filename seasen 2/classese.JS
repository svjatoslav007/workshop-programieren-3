// Grass
class Grass{

    constructor(x, y){
        //Position
        this.x = x;
        this.y = y;
        // RundenzÃ¤hler
        this.multiply = 0;
        // Sicht auf die Nachbarfelder
        this.directions = [
            [this.x -1, this.y -1],
            [this.x, this.y-1],
            [this.x+1, this.y-1],
            [this.x-1, this.y],
            [this.x+1, this.y],
            [this.x-1, this.y+1],
            [this.x, this.y+1],
            [this.x+1, this.y+1]
        ];
    }

    // Verhalten - Methoden
    chooseFields(character){
        // Array
        let found = [];
        // Liste mit Nachbarfelder
        // fÃ¼r jedes Nachbarfeld
        for(let i in this.directions){
            i = parseInt(i);
            let fieldPos = this.directions[i];
            // Position des jeweiligen Nachbarfeldes auslesen
            let posX = fieldPos[0];
            let posY = fieldPos[1];
            // Wenn innerhalb der Spielfeldgrenzen / Matrix
            if(posX >= 0 && posX < matrix[0].length && posY >= 0 && posY < matrix.length){
                // schau nach, ob es leer ist 
                //- Wert 0 in der Matrix an dieser Pos
                if(matrix[posY][posX] == character){
                    // dann haben wir ein leeres nachbarfeld gefunden
                    // wenn dem so ist, dann merk es Dir
                    found.push(fieldPos);
                }
            }
        }
        return found;
    }

    mul(){
        // rundenzÃ¤hler erhÃ¶hen
        this.multiply++;
        // Vermehrung soll erfolgen wenn RundenzÃ¤hler 6 ist
        if(this.multiply >= 6){
            // finde alle leeren Nachbarfelder
            let emptyFields = this.chooseFields(0);
            if(emptyFields.length > 0){
                // wenn es welche gibt, dann wÃ¤hle eines davon zufÃ¤llig aus
                let theChosenField = random(emptyFields); // Array mit 2 element - x und y
                // Erzeuge neues Grass-Objekt mit Pos des ausgewÃ¤hlten Nachbarfeldes
                let newX = theChosenField[0];
                let newY = theChosenField[1];
                let grassObj = new Grass(newX, newY);
                // zur Grassobj-Liste hinzufÃ¼gen
                grassArr.push(grassObj);
                // Matrix wird an dieser Pos statt der 0 eine 1
                matrix[newY][newX] = 1;
            }
  
            this.multiply = 0;
        }
    }
}

// Grasfresser
class Grazer{
    constructor(x, y){
        //Position
        this.x = x;
        this.y = y;
        // FressenzÃ¤hler
        this.eatCount = 0;
        this.energy =5;
        
        // Sicht auf die Nachbarfelder
        this.directions = [
            [this.x -1, this.y -1],
            [this.x, this.y-1],
            [this.x+1, this.y-1],
            [this.x-1, this.y],
            [this.x+1, this.y],
            [this.x-1, this.y+1],
            [this.x, this.y+1],
            [this.x+1, this.y+1]
        ];
    }

    newDirections(){
        this.directions = [
            [this.x -1, this.y -1],
            [this.x, this.y-1],
            [this.x+1, this.y-1],
            [this.x-1, this.y],
            [this.x+1, this.y],
            [this.x-1, this.y+1],
            [this.x, this.y+1],
            [this.x+1, this.y+1]
        ];
    }

    chooseFields(character){
        this.newDirections();
        let found = [];
        for(let i in this.directions){
            i = parseInt(i);
            let fieldPos = this.directions[i];
            let posX = fieldPos[0];
            let posY = fieldPos[1];
            if(posX >= 0 && posX < matrix[0].length && posY >= 0 && posY < matrix.length){
                if(matrix[posY][posX] == character){
                    found.push(fieldPos);
                }
            }
        }
        return found;
    }

    // weiteres Verhalten
    eat(){
        // suchen nach Grasobjekten in der Nachbarschaft
        let grassFields = this.chooseFields(1);
        // ist Grass vorhanden wÃ¤hle zufÃ¤llig eines aus
        if(grassFields.length > 0 && this.energy>0){
            let theChosenField = random(grassFields);
            let newX = theChosenField[0];
            let newY = theChosenField[1];
            // Grasobjekt fressen: 
            
            // Positionen in der Matrix / Spielfeld aktualisieren
            // neue Pos bekommt Wert 2
            matrix[newY][newX] = 2;
            // alte Pos bekommt Wert 0
            matrix[this.y][this.x] = 0;
           
            // eigene Position updaten
            this.x = newX;
            this.y = newY;

            // Grasobjekt aus GrassArr lÃ¶schen
            // finden in der Liste: Wie?
            for(let i = 0; i < grassArr.length; i++){
                let grassObj = grassArr[i];
                // PrÃ¼fen der Positionswerte
                if(grassObj.x == this.x && grassObj.y == this.y){
                    // lÃ¶schen
                    grassArr.splice(i, 1);
                    break;
                }
            }

            // eatcounter erhÃ¶hen
            this.eatCount += 1;
            this.energy++;
        }else{
            this.eatCount=0;
            this.energy-=1;
            if(this.energy<=0){
                this.die();
            }else{
                this.move();
            }
            
            
        }


    }

    move(){
        let emptyFields=this.chooseFields(0);
        if(emptyFields.length>0){
            let theChosenField =random(emptyFields);
            let newX = theChosenField[0];
            let newY= theChosenField[1];
            matrix[newY][newX]=2;
            matrix[this.y][this.x]=0;
            this.x =newX;
            this.y=newY;

        }

    }
    die(){
        matrix[this.y][this.x]=0;
        for(let i =0;i< grazerArr.length;i++){
            let grazerObj= grazerArr[i];
            if(grazerObj.x==this.x && grazerObj.y==this.y){
                grazerArr.splice(i,1);
                break;
            }
        }
    }
    mul(){
    if(this.eatCount >= 5){
        // finde alle leeren Nachbarfelder
        let emptyFields = this.chooseFields(0);
        if(emptyFields.length > 0){
            // wenn es welche gibt, dann wÃ¤hle eines davon zufÃ¤llig aus
            let theChosenField = random(emptyFields); // Array mit 2 element - x und y
            // Erzeuge neues Grass-Objekt mit Pos des ausgewÃ¤hlten Nachbarfeldes
            let newX = theChosenField[0];
            let newY = theChosenField[1];
            let grazerObj = new Grazer (newX, newY);
            // zur Grassobj-Liste hinzufÃ¼gen
            grazerArr.push(grazerObj);
            // Matrix wird an dieser Pos statt der 0 eine 1
            matrix[newY][newX] = 2;
        }

        this.eatCount = 0;
    }

        
    }
}
class Predator{
     constructor(x, y){
    //Position
    this.x = x;
    this.y = y;
    // FressenzÃ¤hler
    this.multiply=0;
    this.energy = 10;
    this.notEaten =5;
    
    // Sicht auf die Nachbarfelder
    this.directions = [
        [this.x -1, this.y -1],
        [this.x, this.y-1],
        [this.x+1, this.y-1],
        [this.x-1, this.y],
        [this.x+1, this.y],
        [this.x-1, this.y+1],
        [this.x, this.y+1],
        [this.x+1, this.y+1]
    ];
}
newDirections(){
    this.directions = [
        [this.x -1, this.y -1],
        [this.x, this.y-1],
        [this.x+1, this.y-1],
        [this.x-1, this.y],
        [this.x+1, this.y],
        [this.x-1, this.y+1],
        [this.x, this.y+1],
        [this.x+1, this.y+1]
    ];
}


chooseFields(character){
    this.newDirections();
    let found = [];
    for(let i in this.directions){
        i = parseInt(i);
        let fieldPos = this.directions[i];
        let posX = fieldPos[0];
        let posY = fieldPos[1];
        if(posX >= 0 && posX < matrix[0].length && posY >= 0 && posY < matrix.length){
            if(matrix[posY][posX] == character){
                found.push(fieldPos);
            }
        }
    }
    return found;
}

move(){
    let emptyFields=this.chooseFields(0);
    if(emptyFields.length>0){
        let theChosenField =random(emptyFields);
        let newX = theChosenField[0];
        let newY= theChosenField[1];
        matrix[newY][newX]=3;
        matrix[this.y][this.x]=0;
        this.x =newX;
        this.y=newY;

    }

}

eat(){
    // suchen nach Grasobjekten in der Nachbarschaft
    let grazerFields = this.chooseFields(2);
    // ist Grass vorhanden wÃ¤hle zufÃ¤llig eines aus
    if(grazerFields.length > 0 && this.energy>0){
        let theChosenField = random(grazerFields);
        let newX = theChosenField[0];
        let newY = theChosenField[1];
        // Grasobjekt fressen: 
        
        // Positionen in der Matrix / Spielfeld aktualisieren
        // neue Pos bekommt Wert 2
        matrix[newY][newX] = 3;
        // alte Pos bekommt Wert 0
        matrix[this.y][this.x] = 0;
       
        // eigene Position updaten
        this.x = newX;
        this.y = newY;

        // Grasobjekt aus GrassArr lÃ¶schen
        // finden in der Liste: Wie?
        for(let i = 0; i < grazerArr.length; i++){
            let grazerObj = grazerArr[i];
            // PrÃ¼fen der Positionswerte
            if(grazerObj.x == this.x && grazerObj.y == this.y){
                // lÃ¶schen
                grazerArr.splice(i, 1);
                break;
            }
        }

        // eatcounter erhÃ¶hen
        this.eatCount += 1;
        this.energy++;
    }else{
        this.eatCount=0;
        this.energy-=1;
        if(this.energy<=0){
            this.die();
        }else{
            this.move();
        }
        
        
    }
}
mul(){
    if(this.eatCount >= 5){
        // finde alle leeren Nachbarfelder
        let emptyFields = this.chooseFields(0);
        if(emptyFields.length > 0){
            // wenn es welche gibt, dann wÃ¤hle eines davon zufÃ¤llig aus
            let theChosenField = random(emptyFields); // Array mit 2 element - x und y
            // Erzeuge neues Grass-Objekt mit Pos des ausgewÃ¤hlten Nachbarfeldes
            let newX = theChosenField[0];
            let newY = theChosenField[1];
            let predatorObj = new Predator (newX, newY);
            // zur Grassobj-Liste hinzufÃ¼gen
            predatorArr.push(predatorObj);
            // Matrix wird an dieser Pos statt der 0 eine 1
            matrix[newY][newX] = 3;
        }

        this.eatCount = 0;
    }

        
    }
die(){
    matrix[this.y][this.x]=0;
    for(let i =0;i<predatorArr.length;i++){
        let pred= predatorArr[i];
        if(pred.x==this.x&&pred.y==this.y){
            predatorArr.splice(i,1);
            break;
        }
        

    }
}

}


class Toadstool {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    eat() {
        let cells = this.directions
        for(let i in cells) {
            i = parseInt(i);
            let newX = cells[i][0]
            let newY = cells[i][1]
            if (matrix[newY][newX]==1){
                //lÃ¶sche aus grass liste 
                for(let i = 0; i < grassArr.length; i++){
                    let grassObj = grassArr[i];
                    // PrÃ¼fen der Positionswerte
                    if(grassObj.x == newX && grassObj.y == newY){
                        // lÃ¶schen
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }else if (matrix[newY][newX]==2){
                // lÃ¶sche grazer 
                for(let i = 0; i < grazerArr.length; i++){
                    let grazerObj =grazerArr[i];
                    // PrÃ¼fen der Positionswerte
                    if(grazerObj.x == newX && grazerObj.y == newY){
                        // lÃ¶schen
                       grazerArr.splice(i, 1);
                        break;
                    }
                }


            }else if (matrix[newY][newX]==3){
                //lÃ¶sche fleischfresser 
                for(let i = 0; i < predatorArr.length; i++){
                    let predatorObj =predatorArr[i];
                    // PrÃ¼fen der Positionswerte
                    if(predatorObj.x == newX && predatorObj.y == newY){
                        // lÃ¶schen
                      predatorArr.splice(i, 1);
                        break;
                    }
                }
            }else if (matrix[newY][newX]==5){
                //lÃ¶sche fleischfresser 
                for(let i = 0; i < kannibaleArr.length; i++){
                    let kannibaleObj =kannibaleArr[i];
                    // PrÃ¼fen der Positionswerte
                    if(kannibaleObj.x == newX &&kannibaleObj.y == newY){
                        // lÃ¶schen
                      kannibaleArr.splice(i, 1);
                        break;
                    }
                }
            }
            
            
            matrix[cells[i][1]][cells[i][0]] = 0
        }
    }
}

    

    

class Kannibale {
    constructor(x, y){
        //Position
        this.x = x;
        this.y = y;
        // FressenzÃ¤hler
        this.multiply=0;
        this.energy = 15;
        this.notEaten =5;
        
        // Sicht auf die Nachbarfelder
        this.directions = [
            [this.x -1, this.y -1],
            [this.x, this.y-1],
            [this.x+1, this.y-1],
            [this.x-1, this.y],
            [this.x+1, this.y],
            [this.x-1, this.y+1],
            [this.x, this.y+1],
            [this.x+1, this.y+1]
        ];
    }
    newDirections(){
        this.directions = [
            [this.x -1, this.y -1],
            [this.x, this.y-1],
            [this.x+1, this.y-1],
            [this.x-1, this.y],
            [this.x+1, this.y],
            [this.x-1, this.y+1],
            [this.x, this.y+1],
            [this.x+1, this.y+1]
        ];
    }
    
    
    chooseFields(character){
        this.newDirections();
        let found = [];
        for(let i in this.directions){
            i = parseInt(i);
            let fieldPos = this.directions[i];
            let posX = fieldPos[0];
            let posY = fieldPos[1];
            if(posX >= 0 && posX < matrix[0].length && posY >= 0 && posY < matrix.length){
                if(matrix[posY][posX] == character){
                    found.push(fieldPos);
                }
            }
        }
        return found;
    }
    
    move(){
        let emptyFields=this.chooseFields(0);
        if(emptyFields.length>0){
            let theChosenField =random(emptyFields);
            let newX = theChosenField[0];
            let newY= theChosenField[1];
            matrix[newY][newX]=5;
            matrix[this.y][this.x]=0;
            this.x =newX;
            this.y=newY;
    
        }
    
    }
    
    eat_predator(){
        // suchen nach Grasobjekten in der Nachbarschaft
        let predatorFields = this.chooseFields(5);
        // ist Grass vorhanden wÃ¤hle zufÃ¤llig eines aus
        if(predatorFields.length > 0 && this.energy>0){
            let theChosenField = random(predatorFields);
            let newX = theChosenField[0];
            let newY = theChosenField[1];
            // Grasobjekt fressen: 
            
            // Positionen in der Matrix / Spielfeld aktualisieren
            // neue Pos bekommt Wert 2
            matrix[newY][newX] = 5;
            // alte Pos bekommt Wert 0
            matrix[this.y][this.x] = 0;
           
            // eigene Position updaten
            this.x = newX;
            this.y = newY;
    
            // Grasobjekt aus GrassArr lÃ¶schen
            // finden in der Liste: Wie?
            for(let i = 0; i < predatorArr.length; i++){
                let predatorObj = predatorArr[i];
                // PrÃ¼fen der Positionswerte
                if(predatorObj.x == this.x && predatorObj.y == this.y){
                    // lÃ¶schen
                    predatorArr.splice(i, 1);
                    break;
                }
            }
    
            // eatcounter erhÃ¶hen
            this.eatCount += 1;
            this.energy++;
        }else{
            this.eatCount=0;
            this.energy-=1;
            if(this.energy<=0){
                this.die();
            }else{
                this.move();
            }
            
            
        }
    }
   
    eat_grazer(){
        // suchen nach Grasobjekten in der Nachbarschaft
        let grazerFields = this.chooseFields(5);
        // ist Grass vorhanden wÃ¤hle zufÃ¤llig eines aus
        if(grazerFields.length > 0 && this.energy>0){
            let theChosenField = random(grazerFields);
            let newX = theChosenField[0];
            let newY = theChosenField[1];
            // Grasobjekt fressen: 
            
            // Positionen in der Matrix / Spielfeld aktualisieren
            // neue Pos bekommt Wert 2
            matrix[newY][newX] = 5;
            // alte Pos bekommt Wert 0
            matrix[this.y][this.x] = 0;
           
            // eigene Position updaten
            this.x = newX;
            this.y = newY;
    
            // Grasobjekt aus GrassArr lÃ¶schen
            // finden in der Liste: Wie?
            for(let i = 0; i < grazerArr.length; i++){
                let grazerObj = grazerArr[i];
                // PrÃ¼fen der Positionswerte
                if(grazerObj.x == this.x && grazerObj.y == this.y){
                    // lÃ¶schen
                    grazerArr.splice(i, 1);
                    break;
                }
            }
    
            // eatcounter erhÃ¶hen
            this.eatCount += 1;
            this.energy++;
        }else{
            this.eatCount=0;
            this.energy-=1;
            if(this.energy<=0){
                this.die();
            }else{
                this.move();
            }
            
            
        }
    }
    mul(){
        if(this.eatCount >= 5){
            // finde alle leeren Nachbarfelder
            let emptyFields = this.chooseFields(0);
            if(emptyFields.length > 0){
                // wenn es welche gibt, dann wÃ¤hle eines davon zufÃ¤llig aus
                let theChosenField = random(emptyFields); // Array mit 2 element - x und y
                // Erzeuge neues Grass-Objekt mit Pos des ausgewÃ¤hlten Nachbarfeldes
                let newX = theChosenField[0];
                let newY = theChosenField[1];
                let kannibaleObj = new Kannibale (newX, newY);
                // zur Grassobj-Liste hinzufÃ¼gen
                kannibaleArr.push(kannibaleObj);
                // Matrix wird an dieser Pos statt der 0 eine 1
                matrix[newY][newX] = 5;
            }
    
            this.eatCount = 0;
        }
    
            
        }
    die(){
        matrix[this.y][this.x]=0;
        for(let i =0;i<kannibaleArr.length;i++){
            let kannibaleObj= kannibaleArr[i];
            if(kannibaleObj.x==this.x&&kannibaleObj.y==this.y){
                kannibaleArr.splice(i,1);
                break;
            }
            
    
        }
    }
 }
    
    