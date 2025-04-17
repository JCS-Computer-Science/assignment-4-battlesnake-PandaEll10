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
    for (let i=0; i<gameState.snakes; i++){
        for (let i=0; i<gameState.snakes.body.length; i++){
        const enemyBody = gameState.snakes.body[i];
        if(myHead.x+1 == enemyBodyBody.x && myHead.y==enemyBodyBody.y){
                moveSafety.right = false;
            } else if(myHead.x-1==enemyBodyBody.x && myHead.y==enemyBodyBody.y){
                moveSafety.left=false;
            }
            if(myHead.y+1==enemyBodyBody.y && myHead.x==enemyBodyBody.x){
                moveSafety.up=false;
            }else if(myHead.y-1==enemyBodyBody.y && myHead.x==enemyBodyBody.x){
                moveSafety.down=false;
            }
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