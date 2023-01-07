class Grazer extends Livingcreature {
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