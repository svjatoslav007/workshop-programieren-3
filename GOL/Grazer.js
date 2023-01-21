const LivingCreature = require ("./LivingCreature")
module.exports = class Grazer extends LivingCreature{
    constructor(x, y){
        //Position
        super(x,y)
        this.eatCount = 0;
        this.energy =5;
        
        // Sicht auf die Nachbarfelder
    
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

    

    // weiteres Verhalten
    eat(){
        // suchen nach Grasobjekten in der Nachbarschaft
        let grassFields = this.chooseFields(1);
        // ist Grass vorhanden wÃ¤hle zufÃ¤llig eines aus
        if(grassFields.length > 0 && this.energy>0){
            let theChosenField = grassFields[Math.floor(Math.random() * grassFields.length)]
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
            let theChosenField = emptyFields[Math.floor(Math.random() * emptyFields.length)]
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
            // Array mit 2 element - x und y
            let theChosenField = emptyFields[Math.floor(Math.random() * emptyFields.length)]
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