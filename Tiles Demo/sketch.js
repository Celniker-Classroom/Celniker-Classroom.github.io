let bricks, tilesGroup, block, player, black, blook;
let playerimg,brickimg
function preload(){
	playerimg = loadImage ('Images/cannon.png')
	brickimg = loadImage ('Images/bricked.png')
}
function setup() {
	new Canvas(600,600);
	bricks = new Group();
	bricks.w = 25;
	bricks.h = 10;
	bricks.img = brickimg;
	// bricks.color = 'red';
	bricks.tile = '=';
	block = new Group();
	block.width = 25;
	block.height = 10;
	block.tile = '~';
	block.color = 'orange';
	black = new Group();
	black.w = 25;
	black.h = 10;
	black.color = 'black';
	black.tile = '+';
	blook = new Group();
	blook.w = 25;
	block.h = 10;
	blook.color = 'blue';
	blook.tile = '|';
	tilesGroup = new Tiles (
		[
			'====~====~====~====|===',
			'=======~=======~=======',
			'~~~~~~~~~~~~~~+||~~~~~~',
			'~=~=~=~=~=~=~=~=~=~=~=~',
			'=~~=~~=~~=~~=~~=~~=~~=~',
			'=======================',
			'~~=================|====',
			'====~====~====~========',
			'=======~=======~=======',
			'~~~~~~~++~~~~~~~~~~~~~~',
			'~=~=~=~=~=~=~=~=~=~=~=~',
			'=~~=~~=~~=~~=~~=~~=~~=~',
			'=======================',
			'~~======================',
			'====~====~====~========',
			'=======~=======~=======',
			'~~~~~~~~~~~~~~~~~~~~~~~',
			'~=~=~=~=~=~=~=~=~=~=~=~',
			'=~~=~~=~~=~~=~~=~~=~~=~',
			'=======================',
			'~~======================',
			'====~====~====~========',
			'=======~=======~=======',
			'~~~~~~~~~~~~~~~~~~~~~~~',
			'~=~=~=~=~=~=~+~=~=~=~=~',
			'=~~=~~=~~=~~=~~=~~=~~=~',
			'=======================',
			'~~======================',
			'====~====~====~========',
			'=======~=======~=======',
			'~~~~~~~~~~~~~~~~~~~~~~~',
			'~=~=~=~=~=~=~=~=~=~=~=~',
			'=~~=~~=~~=~~=~~=~~=~~=~',
		], 
		100,
		40, 
		25,10
	)
	player = new Sprite()
	player.img = playerimg
	player.x = 300
	player.y = 400
	player.size = 100
}

function draw() {
	clear();
	background('white')
}