// Loot Runner Sketch.js

function setup() {

// Misc
new Canvas(1920,1080,'fullscreen');
background(0);
frameRate(244);
world.gravity.y = 500

// Perks

	// Double Jump
	dJump = new Sprite();
	dJump.image = 'Assets/potion.gif';
	dJump.y = 260;
	dJump.x = 2200;
	dJump.collider = 'k';
	dJump.direction = 'left';
	dJump.speed = 25;
	dJump.image.scale = .05

	// Power Jump
	pJump = new Sprite();
	pJump.image = 'Assets/frog2.gif';
	pJump.y = 500;
	pJump.x = 3100;
	pJump.collider = 'k';
	pJump.direction = 'left';
	pJump.speed = 25;
	pJump.image.scale = .25

// Keys

	// Chest 1 Access Key
	k1 = new Sprite();
	k1.image = 'Assets/key.gif';
	k1.y = 500;
	k1.x = 2200;
	k1.collider = 'k';
	k1.direction = 'left';
	k1.speed = 25;
	k1.image.scale = .045;

// Chests

	// Chest 1
	c1 = new Sprite();
	c1.image = 'Assets/chest.gif';
	c1.y = 250
	c1.x = 3300
	c1.collider = 'k';
	c1.direction = 'left';
	c1.speed = 25;
	c1.image.scale = .07;

// Trophy

	// Trophy Image
	t = new Sprite();
	t.image = 'Assets/trophy.gif'
	t.y = 315
	t.x = 4100
	t.collider = 'k';
	t.direction = 'left';
	t.speed = 25;
	t.scale = .045;



// Player Character

	//Knight
	knight = new Sprite;
	knight.image = 'Assets/Knight.gif';
	knight.size = 30
	knight.y = 512.5;
	knight.x = 400;
	knight.collider = 'd';
	knight.friction = 0
	knight.image.scale = .2
	knight.image.offset.y = -120
	knight.direction = 'right'
	knight.speed = 5


// Monsters

	// Babizilla
	m1 = new Sprite;
	m1.image = 'Assets/dinomon.gif';
	m1.size = 30;
	m1.y = 512.5;
	m1.x = 1800;
	m1.collider = 'k';
	m1.direction = 'left';
	m1.speed = 32.5;
	m1.image.scale = .35
	m1.image.offset.y = -30

	// Babizilla 2
	m2 = new Sprite;
	m2.image = 'Assets/dinomon.gif';
	m2.size = 30;
	m2.y = 382.5;
	m2.x = 3100;
	m2.collider = 'k';
	m2.direction = 'left';
	m2.speed = 32.5;
	m2.image.scale = .35
	m2.image.offset.y = -30	

// Floor

	// Grass
	ground = new Sprite;
	ground.x = 960;
	ground.y = 810;
	ground.h = 540;
	ground.w = 10000;
	ground.color = '#547038';
	ground.collider = 's';
	ground.friction = 0

// Obstacles

	// Obstacle 1
	o1 = new Sprite;
	o1.x = 1800;
	o1.w = 500;
	o1.y = 425;
	o1.h = 30;
	o1.collider = 'k';
	o1.direction = 'left';
	o1.speed = 25;
	o1.color = '#4f3f2f';

	// Obstacle 2
	o2 = new Sprite;
	o2.x = 2600;
	o2.w = 500;
	o2.y = 425;
	o2.h = 30;
	o2.collider = 'k';
	o2.direction = 'left';
	o2.speed = 25;
	o2.color = '#4f3f2f';

	// Obstacle 3
	o3 = new Sprite;
	o3.x = 3100;
	o3.w = 500;
	o3.y = 295;
	o3.h = 30;
	o3.collider = 'k';
	o3.direction = 'left';
	o3.speed = 25;
	o3.color = '#4f3f2f';

	// Obstacle 4
	o4 = new Sprite;
	o4.x = 3900;
	o4.w = 500;
	o4.y = 360;
	o4.h = 30;
	o4.collider = 'k';
	o4.direction = 'left';
	o4.speed = 25;
	o4.color = '#4f3f2f';

}

function draw () {

// Backdrop
background(171, 205, 217);

//Inputs

	// Jump Input
	if(kb.pressed('space')) {
		knight.speed = 48
		knight.direction = 'up'
	}

	// Power Jump Input
	if(kb.held('space')) {
		knight.speed = 58
	 	knight.direction = 'up'
	}

	// Player Roation Lock
	if(knight.rotation != 0) {
		knight.rotation = 0
	}

	// Power Jump Input

	if(knight.overlaps(pJump)) {

		pJump.remove();

	}

	// Double Jump Input

	if(knight.overlaps(dJump)) {

		dJump.remove();

	}

	// Key Input

	if(knight.overlaps(k1)) {

		k1.remove();

	}

	// Chest Input

	if(knight.overlaps(c1)) {

		c1.remove();

	}

	// Trophy Input

	if(knight.overlaps(t)) {

		t.remove();
		knight.speed += 20
		knight.direction = 'right'

	}

	// Death Input

	if(m1.overlaps(knight)) {

		knight.remove();

	}

	if(m2.overlaps(knight)) {

		knight.remove();

	}
	
}