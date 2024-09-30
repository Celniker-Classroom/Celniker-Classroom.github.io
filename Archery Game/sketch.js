let target;
let bow;
let arrows; // Renamed to plural for clarity
let score = 0; // Initialize score
let timeLimit = 30; // Time limit in seconds
let timeRemaining; // Time remaining
let complete = false;
let instructions = text("Press space to shoot arrows!", 100, 50);

function setup() {
    new Canvas(500, 500);
    resetGame();


    // Bow
    bow = new Sprite();
    bow.x = 42; // Set initial position
    bow.y = 250;
    bow.image = '🏹';
    bow.rotate(45, 99999999);


    // Arrows
    arrows = new Group(); // Changed from 'arrow' to 'arrows'
}


function resetGame() {
    createNewTarget();
    score = 0;
    timeRemaining = timeLimit; // Reset time
}


function createNewTarget() {
    target = new Sprite();
    target.diameter = 50;
    target.x = 450;
    target.y = random(50, 450);
    target.color = 'red';
    target.collider = 'static';
}


function draw() {
    background('orange');
     


    // Update bow position
    bow.x = 42;
    bow.y = 250;


    // Firing arrow
    if (kb.pressed(' ')) {
        let arrow1 = new Sprite(); // Create a new Sprite for the arrow
        arrow1.x = 42; // Starting position
        arrow1.y = 250;
        arrow1.opacity = 1;
        arrow1.image = '➟';
        arrow1.rotationLock = true;
        arrows.add(arrow1); // Add the arrow to the arrows group
        
        // Move the arrow towards the target
        arrow1.moveTo(target.x, target.y, 5);
    }


    // Update arrow positions
    arrows.update();


    // Check for collisions
    for (let arrow of arrows) {
        if (arrow.collides(target)) {
            arrows.remove(arrow); // Remove the arrow on hit
            
            // Increment score
            score += 1;
            console.log("Score: " + score); // Log score to console
            arrow.remove();
            // Create a new target
            target.remove();
            createNewTarget();
            break; // Exit loop after collision
        }
    }



    // Update and display time remaining
    if (timeRemaining > 0) {
        timeRemaining -= deltaTime / 1000; // Decrement time
    } else {
        // Time's up! Reset the game or end the challenge
        fill('red');
        textSize(30);
        text("Time's Up!", 150, 250);
        text("Score: " + score, 170, 280);
        bow.remove();
        target.remove();
        arrows.remove();
        instructions.remove();
        return; // Exit draw function
    }


    // Display score and time
    textSize(20);
    fill('black');
    text("Score: " + score, 10, 30);
    text("Time: " + Math.ceil(timeRemaining), 10, 60);
}





