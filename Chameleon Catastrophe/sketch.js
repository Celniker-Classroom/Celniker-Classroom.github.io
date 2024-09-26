let playerColor; //what color is chameleon
let speed = 2; //speed of everything
let timer = 0; //block spawn timer
let clickTime = 0; //time between clicks
let time = 0; //frames elapsed
let score = 0; //amount of score
let lives = 3; //amount of lives
let dead = 0; //yes or no if dead
let scoreInc = 1; //score increase per sec
let hit = 0; //did they take damage
let slashed = 0; //yes or no if slashed
let slashTime = 0; //slashtimer
let blueSpeed = 5; //double click speed

function preload() {
	img = loadImage ('/Images/Jungle.jpg');
	slash = loadImage ('/Images/Slash.png');
}

function setup() {
	frameRate(60);
	new Canvas(500, 750);
	player = new Sprite(250, 600);
	player.image = 'Images/GreenChameleon.png'
	player.scale = 0.5
	player.d = 50;
	player.color = 'green';
	player.collider = 's';
	block = new Group();
	block.collider = 'd';
	block.w = 50;
	block.h = 50;
	block.direction = 90;
	block.y = -25;
	greenB = new block.Group();
	greenB.image = 'Images/GreenLeaf.png';
	greenB.scale = 0.15;
	orangeB = new block.Group();
	orangeB.image = 'Images/OrangeLeaf.png';
	orangeB.scale = 0.15;
	blueB = new block.Group();
	blueB.image = 'Images/BlueLeaf.png';
	blueB.scale = 0.15;
	image (img, 0, 0);
	panther = new Sprite(10, 600);
	panther.rotate(3,10)
	panther.image = 'Images/CalmPanther.png'
	panther.scale = 0.2;
	up = new Sprite();
	up.x = 480;
	up.y = 50;
	up.d = 30;
	up.image = '>';
	down = new Sprite();
	down.x = 345;
	down.y = 50;
	down.d = 30;
	down.image = '<';
	
}

function draw() {
	block.speed = speed;
	timer++;
	time++;
	clickTime++;
	blocks = Math.floor(random(5));
	if (timer >= 240/speed) {
		timer = 0;
		//makes random blocks appear
		if(blocks >= 0 && blocks < 2) {
			blocks = new greenB.Sprite();
		}
		else if(blocks >= 2 && blocks < 4) {
			blocks = new orangeB.Sprite();
		}
		else {
			blocks = new blueB.Sprite();
		}
	}
	
	if (playerColor == 1) { //changes color
		player.image = 'Images/GreenChameleon.png';
	}

	if (playerColor == 2) { //changes color
		player.image = 'Images/OrangeChameleon.png';
	}

	if (playerColor == 3) { //changes color
		player.image = 'Images/BlueChameleon.png';
	}

	if(kb.released(' ')) { //makes releasing also reset time
		clickTime = 0;
	}

	if(kb.pressed(' ')) { //resets time between clicks
		clickTime = 0;
	}

	if(player.collided(greenB) && playerColor > 1) { //detects green collision
		block[block.length - 3].x = 1000;
		lives = lives - 1 + dead;
		hit = 1;
	}

	if(player.collided(blueB) && playerColor < 3) { //detects blue collision
		block[block.length - 3].x = 1000;
		lives = lives - 1 + dead;
		hit = 1;
	}

	if(player.collided(orangeB) && playerColor != 2) { //detects orange collision
		block[block.length - 3].x = 1000;
		lives = lives - 1 + dead;
		hit = 1;
	}

	if(kb.pressing(' ')) { //makes player orange
		playerColor = 2;
		player.collides(greenB);
		player.overlaps(orangeB);
	}

	else { //makes player green
		playerColor = 1;
		player.overlaps(greenB);
		player.collides(orangeB);
		player.collides(blueB);
	}

	if(kb.pressing(' ') && clickTime <= blueSpeed) { //makes player blue
		playerColor = 3;
		player.collides(greenB);
		player.collides(orangeB);
		player.overlaps(blueB);
		clickTime = 0;
	}

	if (time % 60 == 0){ //make score flat number
		score = score + scoreInc;
	}

	if (lives == 0) { //sees if you are dead
		dead = 1;
	}

	image (img, 0, 0, 500, 750);

	if (dead == 1) { //stops blocks from spawning
		scoreInc = 0;
		block.x = 2700;
		textSize(100); 
		text('Game', 110, 250);
		text('over', 150, 310);
		textSize(50);
		text('score: ' + score, 150, 350);
	}
	
	else {
		speed = 2 + time / 800 // changes speed
	}

	textSize(20);
	text('score: ' + score, 25, 35);
	text('lives: ' + lives, 25, 55);
	text('goal: 60', 25, 75)

	fill('green')
	rect(243, 690, 300, 100);

	textSize(15);
	fill('black')
	text('hold space to become orange', 300, 705);
	text('double click space to become blue', 268, 725);
	text('become the same color as the leaves', 249, 745);
	text('double click speed', 350, 54);

	if(dead == 1 && score > 111) { //checks if they beat my score
		textSize(40);
		text('You beat my high score!', 50, 390);
	}

	if(dead == 1 && score == 9) { //checks if they did awful
		textSize(30);
		text('You could not have done worse...', 35, 390);
	}

	if(dead == 1 && score >= 60) { //checks if they did good
		textSize(30);
		text('You did pretty good!', 115, 390);
	}

	if(dead == 1 && score > 9 && score < 60) { //checks if they did okay
		textSize(30);
		text('You did okay...', 155, 390);
	}

	if(up.mouse.pressed()){ //faster click speed
		blueSpeed--;
	}

	if(down.mouse.pressed()){ //slower click speed
		blueSpeed++;
	}

	if(hit == 1) { //tells panther to slash
		slashed = 1;
		hit = 0;
	}

	if(block.x != 250) { //cleans up screen
		block.remove;
	}

	if(block.y >= 800) { //cleans up screen more
		block.remove;
	}
 
	if(slashed == 1 && slashTime <= 10) { //makes panther slash
		slashTime++
		image(slash, 145, 500);
		textSize(100);
		text('!', 20, 500)
	}

	if(slashTime > 10) { //removes panther slash
		slashed = 0;
		slashTime = 0;
	}
	
}