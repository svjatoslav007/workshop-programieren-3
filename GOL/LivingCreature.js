class LivingCreature {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.multiply=0;
       
        
       

        
    
           
        
         
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
        ]
        
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
}