
function setup() {
	new Canvas(1903, 952);
	world.gravity.y = 10
	lWall = new Sprite(550, 475, 3, 800, 's'); //left wall
	lWall.color = 'white'
	rWall = new Sprite(1350, 575, 3, 600, 's'); //right wall
	rWall.color = 'white'
	tWall = new Sprite(950, 75, 800, 3, 'static'); //roof
	tWall.color = 'white'
	bWall = new Sprite(950, 875, 800, 3, 'static'); //ground
	bWall.color = 'white'
	fWallB = new Sprite(1500,275,300,3,'s'); //finish area base
	fWallB.color = 'white'
	fWallT = new Sprite(1500,74,300,3,'s'); //finish area roof
	fWallT.color = 'white'
	fWallR = new Sprite(1650,175,3,200,'s'); //finish area right wall
	fWallR.color = 'white'
	b1 = new Sprite(1252, 837, 200, 80, 's'); //first platform
	b1.color = 'black'
	b1T = new Sprite(1252, 797, 200, 3, 's'); //top of first platform
	b1T.color = 'black'
	b2 = new Sprite(647, 700, 200, 40, 's'); //second platform
	b2.color = 'black'
	b3 = new Sprite(1200, 600, 200, 20, 's'); //third platform
	b3.color = 'black'
	b4 = new Sprite(800, 500, 200, 20, 's'); //fourth platform
	b4.color = 'black'
	b5 = new Sprite(1000, 350, 250, 20, 's'); //fifth platform
	b5.color = 'black'
	
	player = new Sprite(575, 850, 40, 'd');  //player sprite and some properties
	player.color = 'black'
	player.vel.x = 7;
	player.img = 'image/running.png';

	crown = new Sprite(1550,255,40,'d')
	crown.img = 'image/crown.png'

	player.overlaps(crown, collect);
}
function collect(player,crown){
	crown.remove();
	player.img = 'image/victory.png'
	

}
function draw() {
	background('#2b2b2b');
	//code to make player move back and forth and mirror when it hits a wall.
	if (player.collides(rWall)) {
		player.vel.x = -7
		player.mirror.x = true;
	}
	if (player.collides(lWall)) {
		player.vel.x = 7
		player.mirror.x = false;
	}
	if (player.collides(b1)) {
		player.vel.x = -7
		player.mirror.x = true;
	}

	//code to reset the image of the sprite to running instead of jumping
	if(player.collides(bWall)){
		player.img='image/running.png'
	}
	if (player.collides(b1T)) {
		player.img = 'image/running.png';
	}
	if (player.collides(b2)) {
		player.img = 'image/running.png';
	}
	if (player.collides(b3)) {
		player.img = 'image/running.png';
	}
	if (player.collides(b4)) {
		player.img = 'image/running.png';
	}
	if (player.collides(b5)) {
		player.img = 'image/running.png';
		player.vel.x = 7
	}
	//code that makes the sprite jump
	if (kb.pressed('space')) {
		player.vel.y = -6
		player.img = 'image/jumping.png'
	}
	//code to prevent the sprite from spinning weirdly
	if (player.rotation != 0) {
		player.rotation = 0
	}
	//white backgrounds that you see
	noStroke();
	fill('white')
	rect(550, 75, 800)
	rect(1350, 74, 300,200)

	fill('black');
	textSize(100);
	text('YOU WIN!',400,400);
	
}

