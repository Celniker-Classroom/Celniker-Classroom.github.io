let bat;
let ball;
let flags;
let score = 0;
let highScore = 0;
let lives = 3;
let ground;
let flying = false;
let clouds;
let hit = false;
let spawner,spawner2; 


function setup() {
	//Create window
	new Canvas(800, 600);

	//initzalize text size to be 22px
	textSize(22);

	//set the defualt world gravity.
	world.gravity.y = 10;

	//BALL STUFF
	//create the first ball.
	ball = new Sprite(400, 100, 30);
	ball.visible = false;




	//BAT STUFF
	//create the wireframe for the hitbox of the bat
	bat = new Sprite(160, 250, [
		[0, -25],
		[-100, 12.5],
		[0, 25],
		[100, 12.5],
		[0, -25]
	], 'k');


	//set the bat image to the picture of the bat.
	bat.image = 'images/bat-removebg-preview.png'


	//create hitbox for bat
	bat.addCollider(-60, 0, 25);
	bat.addCollider(40, 0, 50);


	//set the "hinge" of the bat, so it knows which axis to rotate on.
	bat.offset.x = -40;
	bat.rotation = 30;

	//change this to true to see wireframe hitbox (the shape of the sprite behind the image). Setting this to true also alerts when a boosted hit is hit (dinger)
	bat.debug = false;

	//CLOUD STUFF
	//initalize the cloud group
	clouds = new Group();
	
	//create 3 clouds that all have locations and cloud pngs.
	for (let i = 0; i < 3; i++) {
		let cloud = new clouds.Sprite();
		cloud.image = "images/cloud.png";
		cloud.x = 400 + i * 300;

		cloud.y = 100;
		cloud.collider = "none";
		cloud.layer = -1;
	}


	//ground sprite
	ground = new Sprite(400, 650, 2000, 300, "static")
	ground.color = 130;

	//FLAG STUFF
	//create the flag group
	flags = new Group();
	
	//make the flag collider "none" which makes each flag essentially an image.
	flags.collider = "none";

	//BALL MACHINE STUFF
	//init sprites to be drawn to create the floating ball launcher
	//gray bigger box
	spawner = new Sprite(400,100,60,60,"none");
	spawner.color = 150
	//black muzzle
	spawner2 = new Sprite(370,100,60,30,"n");
	spawner2.color = 0;
	//put the ball launcher in front of everything
	spawner2.layer = -1;
	spawner.layer = -1;

}

function draw() {
	//reset the canvas each frame
	background('skyblue');

	//set the camera to on, everything past this line will not move with the camera.
	camera.on();

	//check for mouse input, if the mouse has inputted, rotate the bat along its rotation axis.
	if (mouse.presses()) {
		bat.rotateTo(170, 9 + random(0,4));
	}
	//if the mouse is releaed, put the bat back to its reseting place
	if (mouse.released()) {
		bat.rotateTo(30, -8);
	}


	//create a new ball sprite in the ball spanwer after a ball has hit the ground and the game ha ended
	if (ball.collided(ground) || ball.y > 800) {

		ball = new Sprite(400, 100, 30);
		ball.direction = 180;
		ball.speed = 9 + random(-2, 2);
		delay(6000);
	}

	//check to see if the ball is moving through the air after being hit by the bat, if it is, set the flying boolean
	if (ball.x > 600) {

		flying = true;
	}

	//have the camera track the ball
	if (flying) {
		camera.x = ball.x - 200;

	}


	//if the ball has hit the bat, have a random chance that the bat will bost its speed to 40
	if (ball.collided(bat)) {
		if (random() < .03) {
			ball.speed = 40;
			console.log("RAHHHHHHH ");
			if(bat.debug){
				alert("Dinger");
			}
		}
		//set the hit boolean to true after the bat has collided with the ball.
		hit = true;
	}

	//checks to see if the ball has hit the ground, ending the game. The contents of this if statemnt is the process of resetting the game and setting score ECT when the game ends.
	if (ground.collides(ball) || ball.y > 800) {
		flying = false;
		
		//this console log will tell us which statement triggered this block of code.
		console.log(ground.collides(ball));
		
		//reset camera
		camera.x = 400;

		//high score set system, if a highscore is reached, place a flag at the high score and turn all other flags into "past" highscore flags.
		if (score > highScore) {
			highScore = score;
			for (let i = 0; i < flags.length; i++) {
				flags[i].image = "images/flag.png";
			}
			let flag = new flags.Sprite();
			flag.image = "images/highscoreflag.png";
			flag.x = score + 400;
			flag.y = 420;
			flag.scale = 2;
		}

		//reset cloud locations
		for (let i = 0; i < clouds.length; i++) {
			clouds[i].x = 400 + i * 300;
		}
		
		//remove the ball that hit the ground from the screen.
		ball.remove();
		hit = false;
		sleep(6000);
		
		//end of reset if statement
	}

	//have the clouds move by making them re generate in front of the camera every time they leave the frame.
	for (let i = 0; i < clouds.length; i++) {
		if (clouds[i].x < camera.x - 500) {
			clouds[i].x = camera.x + 500;
		}
	}

	//place high score number above highest scoring flag.
	if (highScore > 1) {
		text(highScore, highScore + 345, 350);
	}

	
	//CAMERA OFF STATEMENT, EVERYTHING AFTER THIS LINE WILL MOVE WITH THE CAMERA, giving the affect of GUI.
	camera.off();

	//makes the ground move with the camera, giving the affect of an infinate ground.
	ground.x = 400 + camera.x;

	//get the score
	score = Math.floor((camera.x - canvas.w / 2));

	//scoreboard text
	text("score: " + score, 200, 50);
	text("HIGH SCORE: " + highScore, 400, 52)

	//speed indicater with colors indicating how well the ball was hit.
	if (hit) {
		if (ball.speed < 10) {
			fill("red");
		}
		else if (ball.speed < 16) {
			fill("orange");
		}
		else {
			fill("green");
		}
		text("SPEED: " + Math.floor(ball.speed), 30, 50);
		fill(0);
	}






}
