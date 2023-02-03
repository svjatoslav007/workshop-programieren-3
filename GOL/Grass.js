
const LivingCreature = require ("./LivingCreature")
module.exports = class Grass extends LivingCreature{
    


    constructor(x, y){
        super(x,y)
        // RundenzÃ¤hler
        // Sicht auf die Nachbarfelder
        
    }

    

    mul(){
        
        this.multiply++;
        if(isRaining){
            if(this.multiply >= 12){
                let  emptyFields = this.chooseFields(0);
                if( emptyFields.length > 0){
                    let theChosenField =  emptyFields[Math.floor(Math.random() *  emptyFields.length)] 
                    let newX = theChosenField[0];
                    let newY = theChosenField[1];
                    let grassObj = new Grass(newX, newY);
                    grassArr.push(grassObj);
                    matrix[newY][newX] = 1;
                }
      
                this.multiply = 0;
            }
        }
        else{
            if(this.multiply >= 6){
                let  emptyFields = this.chooseFields(0);
                if( emptyFields.length > 0){
                    let theChosenField =  emptyFields[Math.floor(Math.random() *  emptyFields.length)] 
                    let newX = theChosenField[0];
                    let newY = theChosenField[1];
                    let grassObj = new Grass(newX, newY);
                    grassArr.push(grassObj);
                    matrix[newY][newX] = 1;
                }
      
                this.multiply = 0;
            }
        }
       
    }
}