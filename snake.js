
let inputDir = { x: 0, y: 0 };

const foodsound = new Audio("food sound.wav")
const gameoversound = new Audio("game over sound.wav")
const movesound = new Audio("game sound.wav")
const startingsound = new Audio("game begining sound.wav")

let speed = 13;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [   // initial coordinate of snake  
    {x: 13, y: 15}
];

food = {x: 6, y: 7}; // initial cordinate of food

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){ // TO MANAGE FPS || SPEED OF SNAKE
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) { // TRUE MEANS COLLIDED || FALSE MEANS NOT COLLIDED

    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food

    if(isCollide(snakeArr)){  // TO CHECK FOR COLLISION EITHER WITH WALL OR BODY
        gameoversound.play();
         movesound.pause();
        inputDir =  {x: 0, y: 0}; 
        snakeArr = [{x: 13, y: 15}];
        alert("YOUR SCORE : "+ score);
        scorebox.innerHTML = "Score: 0";
        score = 0; 

    }

    // If you have eaten the food, increment the score and regenerate the food

    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){ // IF FOOD COORDINATES EQUAL TO SNAKE HEAD COORDINATES
         foodsound.play();
         score += 1;
     
        scorebox.innerHTML = "Score: " + score;
       
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 1;
        let b = 17;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())} // TO GENERATE RANDOM FOOD
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) {  // WE ARE MOVING EVERY BLOCK ONE STEP FORWARD
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;  // WE ARE MAKING CLONE OF HEAD AND MVINF IT ALSO ONE BLOCK FORWARD
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake

    board.innerHTML = ""; // INITITAL OUR BOARD SHOULD BE EMPTY
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snakebody');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

    


}


// // Main logic starts here


window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
     movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp"); // If arrowup means x coordinate will remain constant and y coordinate will decrease by 1
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown"); // If arrowup means x coordinate will remain constant and y coordinate will increase by 1
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});