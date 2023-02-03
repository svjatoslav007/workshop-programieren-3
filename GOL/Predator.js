const LivingCreature = require ("./LivingCreature")
module.exports = class Predator extends LivingCreature{
    constructor(x, y){
   super(x,y)
   this.energy = 10;
   this.notEaten =5;
   
   
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

eat(){
   // suchen nach Grasobjekten in der Nachbarschaft
   let grazerFields = this.chooseFields(2);
   // ist Grass vorhanden wÃ¤hle zufÃ¤llig eines aus
   if(grazerFields.length > 0 && this.energy>0){
    let theChosenField = grazerFields[Math.floor(Math.random() * grazerFields.length)]
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
        
    this.multiply++;
    if(isRaining){
        if(this.multiply >= 10){
            let  emptyFields = this.chooseFields(0);
            if( emptyFields.length > 0){
                let theChosenField =  emptyFields[Math.floor(Math.random() *  emptyFields.length)] 
                let newX = theChosenField[0];
                let newY = theChosenField[1];
                let predatorObj = new  Predator(newX, newY);
                predatorArr.push( predatorObj);
                matrix[newY][newX] = 2;
            }
  
            this.multiply = 0;
        }
    }
    else{
        if(this.multiply >= 5){
            let  emptyFields = this.chooseFields(0);
            if( emptyFields.length > 0){
                let theChosenField =  emptyFields[Math.floor(Math.random() *  emptyFields.length)] 
                let newX = theChosenField[0];
                let newY = theChosenField[1];
                let  predatorObj = new  Predator(newX, newY);
                predatorArr.push( predatorObj);
                matrix[newY][newX] = 2;
            }
  
            this.multiply = 0;
        }
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