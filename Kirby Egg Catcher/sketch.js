let items, player, cannon, shooting, countdownText, seizure, bombAnim, roundsGone, ground, eating, scoreCounter, score, trick, eggBombAnim;

//sizes are in pixels
let groundSize = 125;
let spritePixelDiameter = 64;

let maxSpeed = 400; //in ms between shots
let startSpeed = 800; //in ms
let shotsBeforeFirstTrick = 30; //number of shots before the FIRST TRICK BOMB OR EGG can appear by chance
let speedIncreaseMultiple = 7; //the number multiplying the gone rounds to be added to the current speed

let countdownLength = 5;

let rainbowBackground = false; //not recommended
let instructiontext = "Hold space to open your mouth and eat eggs! Don't eat bombs.\nCareful! Some eggs and bombs might try to trick you..."

//load animations
function preload() {
	bombAnim = loadAni('image/bomb.png', { frameSize: [64, 64], frames: 6 });
	eggBombAnim = loadAni('image/eggbomb.png', { frameSize: [64, 64], frames: 6 });
}

function setup() {
	new Canvas(1024, 768, 'fullscreen'); //set res to 4:3 black bars and ensure everything scales

	frameRate(60);

	shooting = false;
	score = 0;
	world.gravity.y = 10;

	//set everything up
	scoreCounter = new Sprite(canvas.w / 2, 100, 0, 0, "s");
	scoreCounter.text = instructiontext+"\nScore: " + score;
	scoreCounter.textSize = 30;
	scoreCounter.textColor = "white";
	scoreCounter.textStroke = "black";
	scoreCounter.textStrokeWeight = 2;

   
	// ground creation
	ground = new Sprite(canvas.w / 2, canvas.h - groundSize / 2, canvas.w, groundSize, "s")

	//cannon is brick
	cannon = new Sprite(canvas.w - 50, canvas.h / 2, 30, 60);
	cannon.collider = "none";

	player = new Sprite(200, canvas.h - groundSize - spritePixelDiameter / 2);
	player.diameter = spritePixelDiameter;
	player.scale.diameter = 1;
	player.collider = "k";
	player.color = "pink";

	player.image = "image/kirbyidle.png";
	player.image = "image/kirbyidle.png";


	//setup group for eggs and bombs
	items = new Group();
	items.x = cannon.x;
	items.y = cannon.y - cannon.h / 2;
	items.color = "white";
	items.diameter = 64;
	items.collider = "d";
	items.friction = 0.01;
	items.rotationDrag = 0.1;

	eating = false;
	roundsGone = 0;

	//create function that detects bomb and player collisions
	player.collides(items, interact);

	//initiate game
	countdown(countdownLength,true);
	shootBalls();
}

function interact(player, item) {

	//check if hit is a bomb or egg, if so, award or subtract score
	if (eating && !item.grounded) {
		if (item.isBomb) {
			score -= 500; //subtract score if eaten
			if (item.isTrick) {
				score /= 2; //subtract more if is a trick
			}
		} else {
			score += 25; //if normal egg eaten
			if (item.isTrick) {
				score += 1000
			}
		}
		
		item.remove();
	} else if (!item.isBomb && !item.grounded) {
		score -= 250; //if collided with player and is a normal egg (failed to eat)
		if (item.isTrick) {
			score /= 2; //if missed trick egg
			score = round(score);
		}
	}
	item.grounded = true;
}

//creates its own countdown text so it could theoretically be reused infinitely
async function countdown(duration,beignGame) {
	countdownText = new Sprite(canvas.w/2,canvas.h/2,0,0,"none");
	countdownText.text = duration;
	countdownText.textColor = "white";
	countdownText.textSize = 80;
	countdownText.textStroke = "black";

	for (let i=duration;i>0;i--) { //this for loop counts DOWN with i--
		countdownText.text = duration;
		duration--;
		await delay(1000);
	}
	countdownText.remove(); //ensure no copies exist after creating a new countdown
	if (beignGame) {
		shooting = true;
	}
	
}

async function shootBalls() {
	if (shooting) {
		let bomb = random(1, 4);

		let isTrick = false; //gauge whether or not item is a trick item
		let trickTick = random(1,50);
		if (trickTick > 49) {
			isTrick = true;
		}
		
		if (roundsGone < shotsBeforeFirstTrick) {
			isTrick = false; //ensure no tricks appear before shotsBeforeFirstTrick items are shot
		}
		
		let ball = new items.Sprite();
		ball.direction = 220;
		ball.speed = 10;
		ball.rotationSpeed = random(-3, 3);
		ball.life = 60 * 3; //to make disappear after 4 seconds at 60fps
		ball.grounded = false;


		if (bomb < 2) {
			if (isTrick) {
				ball.addAni(eggBombAnim)
				ball.isTrick = true;
			} else {
				ball.addAni(bombAnim)
				ball.isTrick = false;
			}
			ball.isBomb = true;
			ball.color = "black"; //fallback in case the image or animation fails for some reason
			
		} else {
			if (isTrick) {
				ball.image = "image/bombegg.png";
				ball.isTrick = true;
			} else {
				ball.image = "image/egg.png";
				ball.isTrick = false;
			}
			ball.color = "white"; //also a fallback
			ball.isBomb = false; //the "egg" state is just !ball.isBomb
		}
		roundsGone ++; //add to the round counter for tracking how many items have been on the screen
	}
	let percentSpeed = (startSpeed - (roundsGone*speedIncreaseMultiple))/maxSpeed; //get the percent value btween 0 and 1 to apply to the max speed
	console.log(percentSpeed)
	if (percentSpeed<1) {percentSpeed = 1;} //make sure speed is no less than 100% of the max
	await delay(maxSpeed*percentSpeed); //apply calculated percent
	shootBalls(); //loop by calling the function again
	
}


function draw() {
	if (seizure) {
		seizure.remove()
	}
	clear();
	background("skyblue");
	if (rainbowBackground) { //set background to a random color every frame
	seizure = new Sprite(canvas.w/2,canvas.h/2,canvas.w,canvas.h,"none")
	seizure.layer = -1;  //back layer
	}

	//eat visibility
	if (kb.pressing('space')) {
		eating = true;
	} else {
		eating = false;
	}
	//determine animation independent from keypress in case I want to adjust the value some other way
	if (eating) {
		player.image = "image/kirby-eat.png";
	} else {
		player.image = "image/kirbyidle.png";
	}

	if (score < 0) {
		score = 0; //prevent score from going below 0
	}
	scoreCounter.text = instructiontext+"\nScore: " + score; //set score counter text at the end of the function to ensure none of the behind the scenes is shown 
}
