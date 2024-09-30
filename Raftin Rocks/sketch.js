let cube;
let floor;
let killblock, killblocks;
let jump = 50;
let winblock;
let deathanimation;
let lives;
function setup() {
	killblocks = new Group()
	killblocks.collider = 's';
	new Canvas(3000, 1200);
	// movement code
	world.gravity.x = 5;
	cube = new Sprite();//cube code
	cube.w = 50;
	cube.l = 50;
	cube.h = 100;
	cube.x = 50;
	cube.y = 50;
	cube.image = 'Sprites/BOAT.gif';
	cube.collider = 'd';
	winblock = new Sprite();//winblock code
	winblock.x = 2500;
	winblock.y = 600;
	winblock.w = 350;
	winblock.h = 1800;
	winblock.l = 100;
	winblock.color = 'green';
	winblock.collider = 's';
	for (let i = 0; i < 5; i++) {//spawns rocks
		let killblock = new killblocks.Sprite()
		killblock.x = random(400, 2700);
		killblock.y = random(50, 1250);
		killblock.w = random(50, 400);
		killblock.l = random(50, 400);
		killblock.h = random(50, 200);
		killblock.color = 'grey'
		killblock.life = 290
		
		killblock.image = 'Sprites/FINALROCK.png'

		
	}

}

function draw() {
	background('blue');//movement code
	if (mouse.pressed()) {
		cube.y = mouseY
		
	}
	
if (cube.colliding (killblocks) )//lose code
	{
		cull.cube
		lives = 0
	}
if (cube.colliding (winblock))//next level/stage code
	for (let i = 0; i < 5; i++) {
		let killblock = new killblocks.Sprite()
		killblock.x = random(400, 2700);
		killblock.y = random(50, 1250);
		killblock.w = random(50, 400);
		killblock.l = random(50, 400);
		killblock.h = random(50, 200);
		killblock.color = 'grey'
		cube.x = 50
		cube.y = random (0,1200)
		killblock.life = random (250, 265)//rock despawn code
		world.gravity.x = random (8, 11)
		cube.speed = 0
		killblock.image = 'Sprites/FINALROCK.png'

}

}
