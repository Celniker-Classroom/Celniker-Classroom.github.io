let player, coins;
let obstacles, endWalls;
let coinStoppers;

function setup() {
	new Canvas();
	world.gravity.y = 3;

	// Creates floor as obstacles
	obstacles = new Group();
	obstacles.w = 1010;
	obstacles.h = 10;
	obstacles.x = -0;
	obstacles.collider = 's';

	for (let i = 200; i < 2000; i += 210) {
		let obstacle = new obstacles.Sprite();
		obstacle.y = i;
	}

	// Creates player sprite
	player = new Sprite(249, 50, 30, 30);
	player.color = 'purple';
	player.rotationLock = true;
	player.image = '💀';

	// Creates coins (little yellow squares)
	coins = new Group();
	coins.x = 249;
	coins.w = 10;
	coins.h = 10;
	coins.color = 'yellow';
	coins.collider = 's';

	for (let i = 168; i < 2000; i += 425) {
		let coin = new coins.Sprite();
		coin.y = i;
	}
	
	// Creates final wall. Because of small gap, players can only pass if collected all coins
	endWalls = new Group();
	endWalls.y = 2100;
	endWalls.w = 490;
	endWalls.h = 10;
	endWalls.collider = 's';
	endWalls.collor = (100, 100, 200);

	for (i = -5; i < 1000; i += 507) {
		let endWall = new endWalls.Sprite();
		endWall.x = i;
	}


}

function draw() {
	background('gray');
	textSize (10);
	
	text('Press space to go through walls. You cannot collect coins in this state. Get coins to win'
	, 100, 100);

	// Player sprite overlaps with obstacles and coins when space is pressed
	// Else - player will collide with obstacles and coins.
	if (kb.pressing('space')) {
		text('pressing space', 10, 10);
		player.overlaps(obstacles);
		player.overlaps(coins);
		player.image = '👻';
	}
	else {
		text('not pressing space', 10, 10);
		//death;
		player.collides(obstacles);
		player.collides(coins, collect);
		player.image = '💀';
	}

	// If player hits the floors, returns to start
	if (player.collides(obstacles)) {
		player.y = 50;
	}


	// If player hits the final wall, returns to start
	if (player.collides(endWalls)) {
		player.y = 50;
	}

	// If player passes final obstacle, text appears 'You Win'
	if (player.y > 2110){
		textSize(100);
		text('YOU WIN!', 200, 300);
	}

	// Camera follows player sprite
	camera.x = player.x;
	camera.y = player.y;
}

// When player hits coin, it is collected and player shrinks
function collect(p, c) {
	// If player collides coin, the coin disappears and player shrinks
	c.remove();
	p.w /= 1.2;
	p.h /= 1.2;
}

// function death() {
// 	player.collides(obstacles);
// }                   