

class Toadstool extends LivingCreature {
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

    

