let player, floor, mainFloor, backgrd;
let canJump, overalltimer, wide, laughtimer;
let currentTerrain, terrain, terrainChooser, terrainCounter, spikes, spike;
let song, pstarlaugh, pstar, backgroundimg;
let playerWidthPos, playerScore, lastScore, jumptimer, jumpspeed;

function preload() {
	//preloads all images and sounds before setup
	song = loadSound('songs/stereomadness.mp3');
	pstarlaugh = loadSound('songs/patricklaugh.mp3');
	deathsound = loadSound('songs/diesound.mp3');
	pstar = loadImage('images/pstar1.png');
	backgroundimg = loadImage('images/newbackground.jpg');
}

function setup() {
	//normal setup things
	new Canvas(2400, 1191); //approximate canvas size in partial-fullscreen
	frameRate(60);
	rectMode(CENTER);
	world.gravity.y = 20;

	floor = new Group(); //floor & terrain groups
	spikes = new Group();
	terrain = new Group();
	terrain.bounciness = 0;

	spike = new spikes.Sprite(); //spikes
	spike.w = 2;
	spike.h = 2;
	spike.y = 0;
	spike.collider = 's';

	mainFloor = new floor.Sprite(); //the big beige block on the bottom
	mainFloor.w = 2 * width;
	mainFloor.h = 100;
	mainFloor.x = width/2;
	mainFloor.y = height - mainFloor.h/2;
	mainFloor.bounciness = 0;

	var u = color(252, 251, 194); //the color of the big block in rgb
	mainFloor.stroke = u;
	mainFloor.color = u;
	mainFloor.collider = 's';

	player = new Sprite(); //player!
	player.height = 90;
	player.width = 60;
	player.x = 80;
	player.y = height - mainFloor.h - player.h/2 - 1;
	player.image = pstar;
	player.bounciness = 0;
	player.drag = 0;

	canJump = true; //this section is a list of variables that needed to be initialized to be used later on
	terrainCounter = 200;
	wide = width;
	overalltimer = 0;
	playerScore = 0;
	laughtimer = 0;
	jumptimer = 0;
	jumpspeed = -10;

	song.play(); //this plays stereo madness
}

function draw() {
	background(backgroundimg); //calling every function !
	textSize(50);
	text("Current Score: " + playerScore, 100, 100); //SUPPOSED to show score on screen, background overlaps it :C
	if (lastScore > -1) {
		text("Last Score: " + lastScore, 100, 175);
	}
	text("Use your spacebar to jump!", 1700, 100);
	keyBind();
	defineGround();
	cameraPos();
	playerMovement();
	terrainCounter += 1; //generates a new terrain section every 6 seconds
	if (terrainCounter == 360) {
		generateTerrain();
		terrainCounter = 0;
	}
	overalltimer ++; //runs the kill function if its been over 5/6 of a second
	if (overalltimer > 50) {
		playerKill();
	}

	
	playerWidthPos = player.x; //to help with death. if the x is the same for too long it kills

	laughtimer ++; //plays patrick's laugh (mp3) every 10 seconds c:
	if (laughtimer >= 600) {
		pstarlaugh.play();
		laughtimer = 0;
	}
}

function keyBind() { //space (held and pressed)
	if (kb.presses(" ")) {
		if (canJump == true) {
			player.velocity.y = jumpspeed;
		}
	}
	if (kb.pressing(" ") ) {
		if (canJump == true) {
			jumptimer ++;
			if (jumptimer >= 8) {
				player.velocity.y = jumpspeed;
				jumptimer = 0;
			}
		}
	}
	else {
		jumptimer = 0;
	}
}

function defineGround() { //determines when the player can jump
	if (terrain.colliding(player) || player.colliding(mainFloor)) {
		canJump = true;
	}
	else {
		canJump = false;
	}
}

function cameraPos() { //adjusts the camera pos and background to the position of the moving player
	if (player.x >= width/2) {
		camera.x = player.x;
		mainFloor.x = player.x;
	}
}

function playerKill() { //kills the player if either the x pos stays stationary for too long or they touch a spike
	if (round(player.x, 2) == round(playerWidthPos, 2) || player.collides(spikes)) {
		song.stop();
		player.remove();
		terrain.remove();
		spikes.remove();
		lastScore = playerScore;
		setup();
		deathsound.play();
	}
}

function playerMovement() { //movement forward :)
	player.velocity.x = 4;
	player.rotation = '0';
}

function generateTerrain() { //generates terrain... alot of terrain.
	terrainChooser = random(1, 5);
	var terrainXpos = 735;
	playerScore ++;

	if (terrainChooser >= 1 && terrainChooser < 2) {
		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 115;
		currentTerrain.h = 30;
		currentTerrain.x = player.x + terrainXpos + 50 + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2 - 85;
		currentTerrain.collider = 's';

		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 115;
		currentTerrain.h = 30;
		currentTerrain.x = player.x + terrainXpos + 250 + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2 - 170;
		currentTerrain.collider = 's';

		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 115;
		currentTerrain.h = 30;
		currentTerrain.x = player.x + terrainXpos + 450 + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2 - 255;
		currentTerrain.collider = 's';
		
		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 445;
		currentTerrain.h = 335;
		currentTerrain.x = player.x + terrainXpos + 555 + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2;
		currentTerrain.collider = 's';

		//bonus 2 platforms
		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 115;
		currentTerrain.h = 30;
		currentTerrain.x = player.x + terrainXpos + 1000 + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2 - 440;
		currentTerrain.collider = 's';

		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 115;
		currentTerrain.h = 30;
		currentTerrain.x = player.x + terrainXpos + 1200 + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2 - 545;
		currentTerrain.collider = 's';
	}

	if (terrainChooser >= 2 && terrainChooser < 3) {
		//floor
		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 115;
		currentTerrain.h = 115;
		currentTerrain.x = player.x + terrainXpos + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2;
		currentTerrain.collider = 's';
		
		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 115;
		currentTerrain.h = 230;
		currentTerrain.x = player.x + terrainXpos + 200 + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2;
		currentTerrain.collider = 's';

		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 115;
		currentTerrain.h = 115;
		currentTerrain.x = player.x + terrainXpos + 400 + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2;
		currentTerrain.collider = 's';
		
		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 115;
		currentTerrain.h = 230;
		currentTerrain.x = player.x + terrainXpos + 600 + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2;
		currentTerrain.collider = 's';

		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 115;
		currentTerrain.h = 115;
		currentTerrain.x = player.x + terrainXpos + 800 + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2;
		currentTerrain.collider = 's';

		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 115;
		currentTerrain.h = 230;
		currentTerrain.x = player.x + terrainXpos + 1000 + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2;
		currentTerrain.collider = 's';

		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 115;
		currentTerrain.h = 115;
		currentTerrain.x = player.x + terrainXpos + 1200 + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2;
		currentTerrain.collider = 's';


		//roof
		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 115;
		currentTerrain.h = 230;
		currentTerrain.x = player.x + terrainXpos + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2 - 400;
		currentTerrain.collider = 's';
		
		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 115;
		currentTerrain.h = 115;
		currentTerrain.x = player.x + terrainXpos + 200 + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2 - (400 + currentTerrain.h);
		currentTerrain.collider = 's';

		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 115;
		currentTerrain.h = 230;
		currentTerrain.x = player.x + terrainXpos + 400 + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2 - 400;
		currentTerrain.collider = 's';
		
		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 115;
		currentTerrain.h = 115;
		currentTerrain.x = player.x + terrainXpos + 600 + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2 - (400 + currentTerrain.h);
		currentTerrain.collider = 's';

		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 115;
		currentTerrain.h = 230;
		currentTerrain.x = player.x + terrainXpos + 800 + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2 - 400;
		currentTerrain.collider = 's';
		
		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 115;
		currentTerrain.h = 115;
		currentTerrain.x = player.x + terrainXpos + 1000 + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2 - (400 + currentTerrain.h);
		currentTerrain.collider = 's';

		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 115;
		currentTerrain.h = 230;
		currentTerrain.x = player.x + terrainXpos + 1200 + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2 - 400;
		currentTerrain.collider = 's';

		//roof's roof
		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 1400;
		currentTerrain.h = 50;
		currentTerrain.x = player.x + terrainXpos - 643 + currentTerrain.w;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2 - 630;
		currentTerrain.collider = 's';
	}

	if (terrainChooser >= 3 && terrainChooser < 4) {
		//floor
		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 800;
		currentTerrain.h = 115;
		currentTerrain.x = player.x + terrainXpos + currentTerrain.w - 300;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2;
		currentTerrain.collider = 's';

		//floor spikes
		spike = new spikes.Sprite(player.x + terrainXpos + 480, height - mainFloor.h - 130, 50, 'triangle', 's');
		spike = new spikes.Sprite(player.x + terrainXpos + 530, height - mainFloor.h - 130, 50, 'triangle', 's');

		spike = new spikes.Sprite(player.x + terrainXpos + 730, height - mainFloor.h - 130, 50, 'triangle', 's');
		spike = new spikes.Sprite(player.x + terrainXpos + 780, height - mainFloor.h - 130, 50, 'triangle', 's');

		spike = new spikes.Sprite(player.x + terrainXpos + 1180, height - mainFloor.h - 15, 50, 'triangle', 's');
		spike.rotation = '0';
		spike = new spikes.Sprite(player.x + terrainXpos + 1230, height - mainFloor.h - 15, 50, 'triangle', 's');
		spike.rotation = '0';

		//roof
		currentTerrain = new terrain.Sprite();
		currentTerrain.w = 400;
		currentTerrain.h = 115;
		currentTerrain.x = player.x + terrainXpos + currentTerrain.w + 650;
		currentTerrain.y = height - mainFloor.h - currentTerrain.h/2 - 300;
		currentTerrain.collider = 's';

		//roof spikes
		spike = new spikes.Sprite(player.x + terrainXpos + 980, height - mainFloor.h - 285, 50, 'triangle', 's');
		spike.rotation = '180';
		spike = new spikes.Sprite(player.x + terrainXpos + 1030, height - mainFloor.h - 285, 50, 'triangle', 's');
		spike.rotation = '180';
	}

	if (terrainChooser >= 4 && terrainChooser < 5) {
		var spikeX = 430;
		//floor spikes
		for (var i = 0; i < 4; i++) {
			spike = new spikes.Sprite(player.x + terrainXpos + spikeX, height - mainFloor.h - 15, 50, 'triangle', 's');
			spike = new spikes.Sprite(player.x + terrainXpos + spikeX + 50, height - mainFloor.h - 15, 50, 'triangle', 's');
			spikeX += 250;
		}
	}
}
