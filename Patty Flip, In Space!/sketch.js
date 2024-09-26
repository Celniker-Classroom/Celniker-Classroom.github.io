let player, potAlien, lasers, floor, wall, sprites, txt, crater, winTxt;

function setup() {
	new Canvas(1000, 1000);

	txt = new Sprite(285, 25, 0, 0, 'n');
	txt.text = 'Click to flip and shoot to defeat the evil Pot-Alien!'
	txt.textColor = 'white'
	txt.textSize = 25
	//text on top left

	world.gravity.y = 2;

	sprites = new Group();

	floor = new sprites.Sprite(); //floor
	floor.w = 1000;
	floor.y = 850;
	floor.h = 250;
	floor.color = '#5a5a5a';
	floor.collider = 's';
	floor.strokeWeight = 0;

	potAlien = new sprites.Sprite(500, 800); //enemy you shoot at
	potAlien.image = 'images/potalien.png' //enemy image
	potAlien.x = 100;
	potAlien.y = 700;
	potAlien.d = 70;

	wall = new sprites.Group(); //wall
	wall.collider = 's';
	wall.color = '#5a5a5a'
	wall.strokeWeight = 0
	let walls = new wall.Sprite(500, 500, 150, 15);
	//centermost horizontal wall
	let walls1 = new wall.Sprite(425, 620, 15, 250);
	//wall between PotAlien and BurgerPlayer
	let walls2 = new wall.Sprite(0, 500, 15, 1000);
	//leftmost barrier wall
	let walls3 = new wall.Sprite(1000, 500, 15, 1000);
	//rightmost barrier wall
	let walls4 = new wall.Sprite(500, 0, 1000, 15);
	//roof
	let walls5 = new wall.Sprite(425, 220, 15, 225);
	//highest vertial wall
	let walls6 = new wall.Sprite(270, 325, 325, 15);
	//floor connected to previous sprite
	let walls7 = new wall.Sprite(850, 250, 300, 15);
	//rightmost floor
	let walls8 = new wall.Sprite(575, 420, 15, 175);

	lasers = new Group(); //the projectile you shoot out
	lasers.image = 'images/OneButtonLaser.png';

	player = new Sprite(800, 700);
	player.d = 60;
	player.image = 'images/Burger Player.png'; //player image
	player.friction = 10;
}

function draw() {
	background(10, 10, 10);

	if (mouse.presses()) {
		if (player.rotation >= 180) {
			player.direction = player.rotation - 180;
			player.speed = 4;
		}
		if (player.rotation < 180) {
			player.direction = player.rotation + 180;
			player.speed = 4;
		}
	}
	//makes it so that when you click you get shot backwards

	if (mouse.presses()) {
		let laser = new lasers.Sprite(player.x, player.y, 50, 20, 'none')
		laser.rotation = player.rotation
		laser.direction = player.rotation
		laser.speed = 8
	}
	//makes it so that when you click a laser spawns
	lasers.overlaps(sprites, destroy)
	//makes lasers disappear when they collide with anything
	lasers.overlaps(potAlien, win)
}

function destroy(allsprite, laser) {
	lasers.remove();
}
//function that is summoned to remove lasers when they collide

function win(potatoalien, laser) {
	potAlien.remove();

	winTxt = new Sprite(500, 400, 0, 0)
	winTxt.text = 'You Win!'
	winTxt.textColor = 'white'
	winTxt. collider = 'n'
	winTxt.textSize = 50
}
//function that removes the PotAlien when shot