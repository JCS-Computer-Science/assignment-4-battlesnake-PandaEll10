import e from "express";

export default function move(gameState){
    let moveSafety = {
        up: true,
        down: true,
        left: true,
        right: true
    };
    
    // We've included code to prevent your Battlesnake from moving backwards
    const myHead = gameState.you.body[0];
    const myNeck = gameState.you.body[1];
    
    if (myNeck.x < myHead.x) {        // Neck is left of head, don't move left
        moveSafety.left = false;
        
    } else if (myNeck.x > myHead.x) { // Neck is right of head, don't move right
        moveSafety.right = false;
        
    } else if (myNeck.y < myHead.y) { // Neck is below head, don't move down
        moveSafety.down = false;
        
    } else if (myNeck.y > myHead.y) { // Neck is above head, don't move up
        moveSafety.up = false;
    }
    
    // TODO: Step 1 - Prevent your Battlesnake from moving out of bounds
    // gameState.board contains an object representing the game board including its width and height
    // https://docs.battlesnake.com/api/objects/board
    
    if (myHead.x == 10){
        moveSafety.right = false;
    } else if (myHead.x == 0){
        moveSafety.left = false; 
    }

    if(myHead.y == 0){
        moveSafety.down = false;
    } else if (myHead.y == 10){
        moveSafety.up = false;
    }


    // TODO: Step 2 - Prevent your Battlesnake from colliding with itself
    // gameState.you contains an object representing your snake, including its coordinates
    // https://docs.battlesnake.com/api/objects/battlesnake
    for (let i=0; i<gameState.you.body.length; i++){
const myBody = gameState.you.body[i];
if(myHead.x+1 == myBody.x && myHead.y==myBody.y){
        moveSafety.right = false;
    } else if(myHead.x-1==myBody.x && myHead.y==myBody.y){
        moveSafety.left=false;
    }
    if(myHead.y+1==myBody.y && myHead.x==myBody.x){
        moveSafety.up=false;
    }else if(myHead.y-1==myBody.y && myHead.x==myBody.x){
        moveSafety.down=false;
    }
    }
    
    
    
    
    
    // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
    // gameState.board.snakes contains an array of enemy snake objects, which includes their coordinates
    // https://docs.battlesnake.com/api/objects/battlesnake
    for (let i=0; i<gameState.board.snakes.length; i++){
        for (let j=0; j<gameState.board.snakes[i].body.length; j++){
            let enemyBody = gameState.board.snakes[i].body[j];
            if(myHead.x+1 == enemyBody.x && myHead.y==enemyBody.y){
                    moveSafety.right = false;
                } else if(myHead.x-1==enemyBody.x && myHead.y==enemyBody.y){
                    moveSafety.left=false;
                }
                if(myHead.y+1==enemyBody.y && myHead.x==enemyBody.x){
                    moveSafety.up=false;
                }else if(myHead.y-1==enemyBody.y && myHead.x==enemyBody.x){
                    moveSafety.down=false;
                }
                }
                
            }
            for (let i=0; i<gameState.board.snakes.length; i++){
                let enemyhead = gameState.board.snakes[i].body[0];
                if(myHead.x+1 == enemyhead.x-1 && myHead.y==enemyhead.y){
                    moveSafety.right = false;
                } else if(myHead.x-1==enemyhead.x+1 && myHead.y==enemyhead.y){
                    moveSafety.left=false;
                }
                if(myHead.y+1==enemyhead.y-1 && myHead.x==enemyhead.x){
                    moveSafety.up=false;
                }else if(myHead.y-1==enemyhead.y+1 && myHead.x==enemyhead.x){
                    moveSafety.down=false;
                }
            }
    // Are there any safe moves left?
    
    //Object.keys(moveSafety) returns ["up", "down", "left", "right"]
    //.filter() filters the array based on the function provided as an argument (using arrow function syntax here)
    //In this case we want to filter out any of these directions for which moveSafety[direction] == false
    const safeMoves = Object.keys(moveSafety).filter(direction => moveSafety[direction]);
    if (safeMoves.length == 0) {
        console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
        return { move: "down" };
    }
    
    // Choose a random move from the safe moves
    const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
    
    // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
    // gameState.board.food contains an array of food coordinates https://docs.battlesnake.com/api/objects/board
    
    console.log(`MOVE ${gameState.turn}: ${nextMove}`)
    return { move: nextMove };
}