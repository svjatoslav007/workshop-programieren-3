class Grass extends LivingCreature {

    constructor(x, y){
        super()
        // RundenzÃ¤hler
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