let player, holes, ground;
function setup() {
	new Canvas(1899, 899);
	world.grav = 10

	//player
	player = new Sprite();
	player.diameter = 50;
	player.y = 780;
	player.x = 1;
	player.image = '🧍‍♂️';
	//ground
	ground = new Sprite(0, 855);
	ground.color = 'black';
	ground.width = 9999;
	ground.h = 100;
	ground.collider = 'd';

	//holes

	holes = new Group();
	for (i = 0; i < 1; i++) {
		;
		let hole = new holes.Sprite();
		hole.x = random(200, 1900);
		hole.y = 800;
		hole.image = '🕳️';
		hole.collider = 'static';
		hole.d = 10;
	}

}

function draw() {
	background('skyblue');

	//beginning
	text('PRESS ENTER TO START', 10, 10);
	text('CONTROLS: PRESS ENTER TO START AND SPACE TO JUMP', 10, 30);
	text('IF THE PLAYER DISSAPEARS, RELOAD TO RESTART THE GAME', 10, 50);
	if (kb.pressed('enter')) {
		player.vel.x = 5;
	}
	//jump command
	if (kb.presses('space')) {
		player.vel.y = -15;
	}
	else if (player.y < 500) {
		player.vel.y = 15;
	}
	else if (player.y > 771) {
		player.vel.y = 0;
	}
	//reset/boost
	if (player.x > 1900) {
		player.x = 1;
		player.vel.x += 2;
		for (i = 0; i < 1; i++) {
			holes = new Group();
			let hole = new holes.Sprite();
			hole.x = random(200, 1900);
			hole.y = 800;
			hole.image = '🕳️';
			hole.collider = 'static';
			hole.d = 10;
			if (player.overlaps(hole)) {
				player.remove();
			}
			
		}

	}
	if (player.overlaps(holes)) {
		player.remove();
	}
}
