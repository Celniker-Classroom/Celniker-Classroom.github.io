let ball;
let gameWin = false;
let gameOver = false;
let stopThat = true;
let iWonSilly = true;

function setup() {
	new Canvas(250, 250, 'pixelated x4');
	
//..placement of the ground
	ground = new Sprite(200, 250, 4000, 50, 's');
	ground.color = '#a95b1c';

//..both players (location, size, and images)
	goodman = new Sprite(30, 200, 1, 1, 's');
	goodman.image = 'images/goodman.png'
	goodman.image.scale.x *= 2
	goodman.image.scale.y *= 2

	MrMean = new Sprite(220, 204, 1, 1, 's');
	MrMean.image = 'images/MrMean.png'
	MrMean.image.scale.x *= 2
	MrMean.image.scale.y *= 2

//..creation of the balls for both player & enemy
	gBall = new Sprite(56, 199, 0, 0);
	gBall.image = 'images/Ball.png'

	bBall = new Sprite(194, 199, 0, 0);
	bBall.image = 'images/Ball.png'

//..random number for light
	rNumber = random(300, 800);

//..preloading animations to use later on
	dance = loadAni(
		'images/Goodman.png',
		'images/sLooking.png',
		'images/Goodman2.png',
		'images/sLooking.png',
	);
	dance.frameDelay = 7;

	bdance = loadAni(
		'images/MrMean.png',
		'images/sLooking2.png',
		'images/MrMean2.png',
		'images/sLooking2.png',
	);
	bdance.frameDelay = 10;
}

function draw() {
	background('skyblue');

//..making of the light, aswell the if statement
	light = new Sprite(125, 50, 20, 20, 's');
	light.color = 'red';
	if (frameCount >= rNumber)	light.color = 'green';

//..throwing ball for player & timer for enemy
	if (frameCount >= rNumber){
		if(mouse.presses()){
			gBall.vel.x = 5;
		}
	}

	if (frameCount >= rNumber + 30){
		bBall.vel.x = -5;
	}

//..animation & winning text
	if (stopThat){
		if (frameCount >= rNumber){
			if(mouse.presses()){
				sleep(80).then(function() {
				gameWin = true;
				});
			}
		}
	}

	if (gameWin){
		animation(dance, 15, 100);
		goodman.y = 300;
		dance.scale = 2;
		MrMean.rotation = 80;
		MrMean.y = 210;
		iWonSilly = false;
	}

//..animation for losing
	if (iWonSilly){
		if (frameCount >= rNumber + 60){
			gameOver = true;
		}
	}
	
	if (gameOver){
		animation(bdance, 110, 102);
		MrMean.y = 300;
		bdance.scale = 2;
		goodman.rotation = -80;
		goodman.y = 210;
		stopThat = false;
	}
}
//function that creates sleep command
function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}
