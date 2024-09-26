let hitbox, ground, spikes, startScreen, player;
let gameStarted = false;
let gameEnded = false;
let score = 0;
let lastSpawned = performance.now();

function setup() {
	new Canvas(500, 500, "fullscreen");

	world.gravity.y = 5;

	hitbox = new Sprite(50, 300, 32, 32); //creates the player hitbox
	hitbox.bounciness = 0;
	hitbox.visible = false;

	player = new Sprite(50, 300, 32, 32); //creates the player hitbox
	player.collider = "none";
	player.image = "playerImage.png";
	player.scale = 0.1;

	ground = new Sprite(250, 400, 500, 200); //creates the ground
	ground.collider = "static";

	spikes = new Group(); //spikes group is made
	spikes.w = 32;
	spikes.h = 32;
	spikes.image = "enemyImage.png";
	spikes.scale = 0.1;

	startScreen = new Sprite(250, 250, 400, 400); //startscreen is made
	startScreen.text = "CUBE DASH! PRESS SPACE TO START. SURVIVE AS LONG AS POSSIBLE. AVOID ANGRY FACES.";
	startScreen.textSize = 8;
	startScreen.collider = "none";
	startScreen.color = "white";
}

function draw() {
	background('skyblue');

	if (performance.now() > lastSpawned && gameStarted && !gameEnded) { //every few seconds a new spike appears
		let spike = new spikes.Sprite();
		spike.x = 550;
		spike.y = 285;
		spike.collider = "none";

		spike.velocity.x = -5;

		lastSpawned = performance.now() + random(1200, 2400);

		score += 1; //score is increased every spike
	}

	for (let i = 0; i < spikes.length; i++) {//game ends when you hit a spike
		if (spikes[i].overlaps(hitbox)) {
			gameOver()
		}
	}

	if (kb.presses(" ") && hitbox.y >= 280) {
		if (!gameStarted) {
			gameStarted = true; //start the game if not started
			startScreen.remove();
		} else {
			if (!gameEnded) {
				hitbox.velocity.y = -3; //jump when space is pressed
				player.rotate(90, 5);
			}
		}
	}

	hitbox.x = 50;
	player.x = hitbox.x;
	player.y = hitbox.y;

	text("SCORE: " + score.toString(), 30, 30)
}

function gameOver() { //creates a game over screen
	gameEnded = true;

	let endScreen = new Sprite(250, 250, 400, 400);
	endScreen.text = "GAME OVER! SCORE: " + score.toString() + "  PRESS ctrl + r TO RESTART!";
	startScreen.textSize = 8;
	endScreen.collider = "none";
	endScreen.color = "white";
}
