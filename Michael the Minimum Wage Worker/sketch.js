
//Variables
let allowedMove = 'yes';
let start = 'no';
let tutorial = 0;
let bg;

function setup() {
	//Basic Setup
	new Canvas(2000, 1000);
	world.gravity.y = 20;
	bg = loadImage('SpriteImages/Table2.png');

	//Floor Sprites
	floor = new Sprite();
	floor.x = 0;
	floor.y = 800;
	floor.w = 1000;
	floor.h = 500;
	floor.collider = 'static';
	floor.image = 'SpriteImages/floor2.png';

	floor2 = new Sprite();
	floor2.x = 1250;
	floor2.y = 800;
	floor2.w = 1000;
	floor2.h = 500;
	floor2.collider = 'static';
	floor2.image = 'SpriteImages/floor2.png';

	floor3 = new Sprite();
	floor3.x = 2500;
	floor3.y = 800;
	floor3.w = 1000;
	floor3.h = 500;
	floor3.collider = 'static';
	floor3.image = 'SpriteImages/floor2.png';

	floor4 = new Sprite();
	floor4.x = 3750;
	floor4.y = 800;
	floor4.w = 1000;
	floor4.h = 500;
	floor4.collider = 'static';
	floor4.image = 'SpriteImages/floor2.png';

	floor5 = new Sprite();
	floor5.x = 5000;
	floor5.y = 800;
	floor5.w = 1000;
	floor5.h = 500;
	floor5.collider = 'static';
	floor5.image = 'SpriteImages/floor2.png';

	floor6 = new Sprite();
	floor6.x = 6250;
	floor6.y = 800;
	floor6.w = 1000;
	floor6.h = 500;
	floor6.collider = 'static';
	floor6.image = 'SpriteImages/floor2.png';

	floor7 = new Sprite();
	floor7.x = 7500;
	floor7.y = 800;
	floor7.w = 1000;
	floor7.h = 500;
	floor7.collider = 'static';
	floor7.image = 'SpriteImages/floor2.png';

	floor8 = new Sprite();
	floor8.x = 8750;
	floor8.y = 800;
	floor8.w = 1000;
	floor8.h = 500;
	floor8.collider = 'static';
	floor8.image = 'SpriteImages/floor2.png';

	floor9 = new Sprite();
	floor9.x = 10000;
	floor9.y = 800;
	floor9.w = 1000;
	floor9.h = 500;
	floor9.collider = 'static';
	floor9.image = 'SpriteImages/floor2.png';

	//Warning Cone Sprites
	warningCone = new Sprite();
	warningCone.x = 3500;
	warningCone.y = 0;
	warningCone.w = 100;
	warningCone.h = 100;
	warningCone.image = 'SpriteImages/WarningCone.gif';

	warningCone2 = new Sprite();
	warningCone2.x = 7250;
	warningCone2.y = 0;
	warningCone2.w = 100;
	warningCone2.h = 100;
	warningCone2.image = 'SpriteImages/WarningCone.gif';

	warningCone3 = new Sprite();
	warningCone3.x = 6500;
	warningCone3.y = 0;
	warningCone3.w = 100;
	warningCone3.h = 100;
	warningCone3.image = 'SpriteImages/WarningCone.gif';

	warningCone4 = new Sprite();
	warningCone4.x = 6250;
	warningCone4.y = 0;
	warningCone4.w = 100;
	warningCone4.h = 100;
	warningCone4.image = 'SpriteImages/WarningCone.gif';

	warningCone5 = new Sprite();
	warningCone5.x = 2500;
	warningCone5.y = 0;
	warningCone5.w = 100;
	warningCone5.h = 100;
	warningCone5.image = 'SpriteImages/WarningCone.gif';

	//Coffee Sprites
	spilledCoffee = new Sprite();
	spilledCoffee.x = 4000;
	spilledCoffee.y = 0;
	spilledCoffee.w = 100;
	spilledCoffee.h = 175;
	spilledCoffee.image = 'SpriteImages/Coffee.gif';

	spilledCoffee2 = new Sprite();
	spilledCoffee2.x = 1000;
	spilledCoffee2.y = 0;
	spilledCoffee2.w = 100;
	spilledCoffee2.h = 175;
	spilledCoffee2.image = 'SpriteImages/Coffee.gif';

	//Old Lady Sprites
	oldLady = new Sprite();
	oldLady.x = 7500;
	oldLady.y = 0;
	oldLady.w = 100;
	oldLady.h = 150;
	oldLady.image = 'SpriteImages/OldLady.gif';

	oldLady2 = new Sprite();
	oldLady2.x = 1500;
	oldLady2.y = 0;
	oldLady2.w = 100;
	oldLady2.h = 150;
	oldLady2.image = 'SpriteImages/OldLady.gif';

	oldLady3 = new Sprite();
	oldLady3.x = 1700;
	oldLady3.y = 0;
	oldLady3.w = 100;
	oldLady3.h = 150;
	oldLady3.image = 'SpriteImages/OldLady.gif';

	//Rabid Children Sprites
	rabidChildren = new Sprite();
	rabidChildren.x = 2750;
	rabidChildren.y = 0;
	rabidChildren.w = 300;
	rabidChildren.h = 225;
	rabidChildren.image = 'SpriteImages/rabidchildren.gif';

	rabidChildren2 = new Sprite();
	rabidChildren2.x = 5250;
	rabidChildren2.y = 0;
	rabidChildren2.w = 300;
	rabidChildren2.h = 225;
	rabidChildren2.image = 'SpriteImages/rabidchildren.gif';

	rabidChildren3 = new Sprite();
	rabidChildren3.x = 5500;
	rabidChildren3.y = 0;
	rabidChildren3.w = 300;
	rabidChildren3.h = 250;
	rabidChildren3.image = 'SpriteImages/rabidchildren.gif';

	//Player-controlled worker
	worker = new Sprite();
	worker.x = 250;
	worker.y = 250;
	worker.w = 100;
	worker.h = 225;
	worker.image = 'SpriteImages/MichaelRight.gif';

	//Tutorial slides
	tutorial2 = new Sprite();
	tutorial2.x = canvas.w / 2 - 750;
	tutorial2.y = canvas.h / 2;
	tutorial2.w = 2000;
	tutorial2.h = 1000;
	tutorial2.image = 'SpriteImages/tutorial2.gif';
	tutorial2.collider = 'none';

	tutorial1 = new Sprite();
	tutorial1.x = canvas.w / 2 - 750;
	tutorial1.y = canvas.h / 2;
	tutorial1.w = 2000;
	tutorial1.h = 1000;
	tutorial1.image = 'SpriteImages/tutorial1.gif';
	tutorial1.collider = 'none';


	//Start Button
	startButton = new Sprite();
	startButton.x = canvas.w / 2 - 750;
	startButton.y = canvas.h / 2;
	startButton.w = 2000;
	startButton.h = 1000;
	startButton.image = 'SpriteImages/MTMWW.gif';
	startButton.collider = 'none';

}

function draw() {
	//This is for the tutorials and the START button.
	if (mouse.presses() && start == 'no') {
		startButton.remove();
		if (tutorial == 2) {
			start = 'yes';

			tutorial2.remove();
			tutorial++;
		}
		if (tutorial == 1) {

			tutorial1.remove();
			tutorial++;
		}
		if (tutorial == 0) {
			tutorial++
		}

	}



	//Causes of game death.
	if (worker.y >= 1000 || worker.y <= 0) {
		allowedMove = 'no';
		lose = new Sprite();
		lose.collider = 'none';
		lose.x = canvas.w / 2 - 750;
		lose.y = canvas.h / 2;
		lose.w = 2000;
		lose.h = 1000;
		lose.image = 'SpriteImages/5d.gif';
		worker.remove();
	}

	//The collisions cause the end of the game.
	if (worker.collided(warningCone) || worker.collided(warningCone2) || worker.collided(warningCone3) || worker.collided(warningCone4) || worker.collided(warningCone5) || worker.collided(spilledCoffee) || worker.collided(spilledCoffee2) || worker.collided(oldLady) || worker.collided(oldLady2) || worker.collided(oldLady3) || worker.collided(rabidChildren) || worker.collided(rabidChildren2) || worker.collided(rabidChildren3)) {
		allowedMove = 'no';
		lose = new Sprite();
		lose.collider = 'none';
		lose.x = canvas.w / 2 - 750;
		lose.y = canvas.h / 2;
		lose.w = 2000;
		lose.h = 1000;
		worker.remove();

		if (worker.collided(warningCone) || worker.collided(warningCone2) || worker.collided(warningCone3) || worker.collided(warningCone4) || worker.collided(warningCone5)) {
			lose.image = 'SpriteImages/ConeDeath.gif';
		}


		if (worker.collided(spilledCoffee) || worker.collided(spilledCoffee2)) {
			lose.image = 'SpriteImages/CoffeeDeath.gif';

		}


		if (worker.collided(oldLady) || worker.collided(oldLady2) || worker.collided(oldLady3)) {
			lose.image = 'SpriteImages/OldLadyDeath.gif';
		}


		if (worker.collided(rabidChildren) || worker.collided(rabidChildren2) || worker.collided(rabidChildren3)) {
			lose.image = 'SpriteImages/ChildrenDeath.gif';

		}


	}


	//This is the movement for the player.
	if (mouse.presses() && (allowedMove == 'yes') && (start == 'yes') && (tutorial == 3)) {

		if (worker.x > 9000) {
			win = new Sprite();
			win.collider = 'none';
			win.x = canvas.w / 2 - 750;
			win.y = canvas.h / 2;
			win.w = 2000;
			win.h = 1000;
			win.image = 'SpriteImages/Success.gif';
			worker.remove();

		}

		worker.vel.y = -10;
		worker.vel.x = 10;



	}

	//This determines the camera location.
	camera.x = worker.x;

	background(bg);

}

