const MAX_FISH = 5;
const TIMER = 5;
const SPEED = 31;
const EACH_FISH_LIVES = 1;

let leftWall,
	rightWall,
	fishes = [],
	fishes_lives_left = [],
	fishes_left = MAX_FISH,
	button,
	timer,
	stop = false,
	mirror = true;

function setup() {
	createCanvas(400, 400);
	//mouse dissapear
	noCursor();

	fishes_left = MAX_FISH;
	timer = TIMER;

	//left wall
	leftWall = new Sprite(0, 400, 20, 800);
	leftWall.collider = "s";

	//right wall
	rightWall = new Sprite(400, 400, 20, 800);
	rightWall.collider = "s";

	//target
	//loop
	for (i = 0; i < MAX_FISH; i++) {
		fishes[i] = new Sprite();
		fishes[i].img = '🐟';
		fishes[i].x = i * 40 + 100;
		fishes[i].y = i * 60 + 50;
		fishes[i].velocity.x = i * -SPEED + 10;

		fishes_lives_left[i] = EACH_FISH_LIVES;
	}

	button = createButton("Play again");
	button.position(170, 370);
	button.mousePressed(restart);
	button.hide();

}

function restart() {
	allSprites.remove();
	setup();
	stop = false;
}

function draw() {
	background("lightblue");

	//lives left system and the crosshair

	textSize(20);
	text("+", mouseX, mouseY);

	for (i = 0; i < MAX_FISH; i++) {

		if (fishes[i].mouse.pressed()) {
			fishes_lives_left[i]--;
			if (fishes_lives_left[i] == 0) {
				fishes[i].remove();
				fishes_left--;
			}

			if (fishes_lives_left[i] == 1) {
				fishes[i].Image = '🐠';
			}

			//colliding system
			if (fishes[i].collides(leftWall)) {
				fishes[i].mirror.x = true;
				fishes[i].velocity.x = i * SPEED + 10;
			}

			if (fishes[i].collides(rightWall)) {
				fishes[i].mirror.x = false;
				fishes[i].velocity.x = i * -SPEED + 10;
			}
		}
	}

	textSize(10);
	text(fishes_left + " fishes left", 60, 20);
	text("Shoot the fish!(click)", 60, 40);
	textAlign(CENTER, CENTER);
	text(timer, 200, 150);

	//game over screen with timer
	if (frameCount % 60 == 0 && timer > 0 && stop == false) {
		timer--;
	}
	if (timer == 0 && fishes_left >= 0) {
		text("GAME OVER", 200, 230);
		text("You starved!", 200, 250);
		text("Tip: Try aiming for the center of the fish!", 200, 270);
		text("BETTER LUCK NEXT TIME ;)", 200, 300);
		end_game_stuff();
	}

	//win screen
	else if (fishes_left == 0) {
		text("You Win!", 200, 250);
		text("You didn't starve this time!", 200, 300);
		end_game_stuff();
		stop = true

	}
}

function end_game_stuff() {
	for (i = 0; i < MAX_FISH; i++)
		fishes[i].remove();



	button.show();
	cursor();
}