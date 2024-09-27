let aboba;

function setup() {
	new Canvas(600, 500);
	world.gravity.y = 100
	aboba = new Sprite(); //main sprite 
		aboba.diameter = 60;
		aboba.x = 150
		aboba.image = 'image/aboba.png';

	platform = new Sprite (); //platform under aboba
		platform.w = 50
		platform.h = 20
		platform.x = 150
		platform.y = 325
		platform.color = 'white';
		platform.collider = 'static'

	water = new Sprite (); //bottom water sprite, if aboba touches it he dies
		water.w = 600
		water.h = 100
		water.x = 300
		water.y = 500
		water.collider = 'static';
		water.color = 'darkblue';
		water.stroke = 'white';
		water.overlaps (aboba); //water will hide aboba when he falls/drowns

		redBlock = new Group (); //tall red block
		redBlock.w = 10
		redBlock.h = 500
		redBlock.x = () => random (300, 80000)
		redBlock.amount = 100
		redBlock.y = 60
		redBlock.color = 'red';
		redBlock.stroke = 'white';
		redBlock.collider = 'k';
		
		blueBlock = new Group(); //square blue block
		blueBlock.w = 40;
		blueBlock.h = 40;
		blueBlock.x = () => random(300, 70000);
		blueBlock.y = 280
		blueBlock.amount = 100
		blueBlock.color = 'blue';
		blueBlock.stroke = 'white';
		blueBlock.collider = 'k';

		taco = new Group(); //coin/taco
		taco.diameter = 30;
		taco.x = () => random(300, 50000);
		taco.y = 270
		taco.image = '🌮';
		taco.amount = 100
		taco.collider = 'k';
}
function draw() {
	background('black');
	if (mouse.presses()) { //makes aboba jump
		aboba.vel.y = -20;
	}

	if (mouse.pressing()) { //makes aboba overlap/go through the red block
		aboba.overlaps (redBlock);
	} else {
		aboba.collides (redBlock);
	}

	//makes the sprites move from right to left
	taco.direction = 'left';
	taco.speed = 4
	redBlock.direction = 'left';
	redBlock.speed = 4
	blueBlock.direction = 'left';
	blueBlock.speed = 4;
	
	aboba.overlaps(taco, collect); //makes aboba collect taco

}

function collect (aboba, taco) { //collect --> remove/collect taco
	taco.remove();
}
