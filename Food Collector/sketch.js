let ground;
let platform;
let hungryYou; //emoji movable with mouse click
let food; //sprites that you collect 
let wall; //left wall
let wall2; //right wall
let wall3; //ceiling
let sun; //sun
let direction; //text


function setup() {
	let foodX = random(0, 800); //randomizes where food generates
	let foodY = random(0, 600);

	new Canvas(800, 800);
	world.gravity.y = 10;

	wall = new Sprite(0, 300, 5, 800); //wall on right
	wall.collider = 's';
	wall.color = 'Tomato';

	wall2 = new Sprite(800, 300, 5, 800); //wall on left
	wall2.collider = 's';
	wall2.color = 'Tomato';

	wall3 = new Sprite(400, 0, 800, 5); //ceiling 
	wall3.collider = 's';
	wall3.color = 'Tomato';

	ground = new Sprite(400, 750, 800, 100); //ground
	ground.color = "Green";
	ground.collider = 's';

	platform = new Sprite(400, 675, 80, 30); //platform where smiley face starts
	platform.color = "DarkGoldenRod";
	platform.collider = 's';

	hungryYou = new Sprite(400, 630, 40); //movable emoji
	hungryYou.image = '😛';

	food = new Sprite(foodX, foodY, 50, 50); //food you collect
	food.collider = 's';
	food.image = random(['🍖', '🍣', '🍰', '🌽', '🍩', '🥐', '🥪', '🌮']);

	direction = new Sprite(400, 750, 50, 50);
	noStroke();
	direction.collider = 's';
	direction.color = 'Green';
	direction.text = "Emoji will move where mouse clicks. Collide to food to collect it. Don't let the sun take over the screen."
	direction.textSize = 15;

}

function draw() {
	background('skyblue');
	let foodX = random(0, 800); //randomizes where food generates
	let foodY = random(0, 600);
	let sunX = random(0, 800);
	let sunY = random(0, 500);

	if (mouse.presses()) { //code that moves face with mouse click
		hungryYou.moveTowards(
			mouse.x + hungryYou.mouse.x,
			mouse.y + hungryYou.mouse.y,
			1
		);
		hungryYou.speed = 25;
		sun = new Sprite(sunX, sunY, 50, 50);
		sun.image = '🌞';
		sun.collider = 's';
		platform.remove();
	}


	if (hungryYou.overlaps(food)) { //regenerates food in random place when face overlaps
		food.remove();
		food = new Sprite(foodX, foodY, 50, 50);
		food.collider = 's';
		food.image = random(['🍖', '🍣', '🍰', '🌽', '🍩', '🥐', '🥪', '🌮']);
		sun.remove();
	}

	

}
