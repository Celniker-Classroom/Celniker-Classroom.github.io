let prowlers, randomSpawn, levelNumb, prowlerNumb, 
	kbTime, targetZone, activeZone, charge, wall, wallR, border, 
	prowlQuad, lights, scoreboard, score, quads, fullCharged, 
	timeLeft, timer, playing, endScreen, instuctions, discalmer;
levelNumb = 1; prowlerNumb = 0; kbTime = 0; 
activeZone = 1; charge = 0; prowlQuad = 0; 
score = 0; fullCharged = false; timeLeft = 1800; playing = true;
function setup() {
	new Canvas(1920, 1080, 'fullscreen')
	frameRate(30);

	prowlers = new Group(); //group for ennemys
	prowlers.color = 'darkRed';
	prowlers.diameter = 20;
	prowlers.layer = 1;

	targetZone = new Sprite(500, 500, canvas.hw, canvas.hh, 'none'); //selected area
	targetZone.color = 'blue';
	targetZone.opacity = 0.5;
	targetZone.layer = 2;

	wall = new Group() //walls
	wall.y = canvas.hh;
	wall.w = 50;
	wall.h = canvas.h;
	wall.color = 'grey';
	wall.collider = 'n'
	wall.layer = 3;

	wallR = new wall.Sprite();
	wallR.x = 25;
	wallL = new wall.Sprite();
	wallL.x = canvas.w - 25;
	wallM = new wall.Sprite();
	wallM.x = canvas.hw;

	border = new Group()
	border.x = canvas.hw;
	border.w = canvas.w;
	border.h = 50;
	border.color = 'grey';
	border.collider = 'n'
	border.layer = 3;

	borderT = new border.Sprite()
	borderT.y = 25;
	borderM = new border.Sprite();
	borderM.y = canvas.hh;
	borderB = new border.Sprite();
	borderB.y = canvas.h - 25;

	lights = new Group(); //bulbs
	lights.d = 20;
	lights.color = 'white'; //start off
	lights.x = 25;
	lights.collider = 'n';
	lights.layer = 4;

	for (i = 0; i < 10; i++){
		light = new lights.Sprite();
		light.y = 50+i*1/10*canvas.h;
	}

	quads = [1, 2, 3, 4]; //used for prowler spawn randomization

	scoreboard  = new Sprite(canvas.w-100, 25, 200, 50, 'none'); //counts the score
	scoreboard.colour = 'white';
	scoreboard.textSize = 40;
	scoreboard.text = "Score: " + score;

	timer = new Sprite(canvas.w-100, canvas.h-25, 200, 50, "none");
	timer.color='white'
	timer.textSize = 25;
	timer.text = "Time Left: " + timeLeft;

	endScreen = new Sprite(canvas.hw,canvas.hh,canvas.w,canvas.h,'none')
	endScreen.color = 'black';
	endScreen.textColour = "White";
	endScreen.textSize = 75;
	endScreen.text = "Thanks for playing Night Watch. Your Score is: " + score;
	endScreen.layer = 6;
	endScreen.opacity = 0;

	instuctions = new Sprite(600, canvas.h-25, 200, 50, "none");
	instuctions.colour = "grey"
	instuctions.textSize = 25;
	instuctions.text = "Press Space to select, hold to charge zap. zap as many dots as possible in the time to win."

	discalmer = new Sprite (500, 25, 200, 50, "none");
	discalmer.color = "gray";
	discalmer.textSize = 25;
	discalmer.text = "Warning: I ran out of time to fix the zapping system. Sorry that its broken";
}	

function draw() {
	background('darkGrey');

	randomSpawn = random(0, 50); //randomized spawing //spawn 1 in 5

	//spawns in random  pos
	if (randomSpawn > 49 && prowlerNumb < levelNumb && playing == true) {
		text('found', 100, 100);
		prowlQuad = random(quads) //chose quadrant

		if (prowlQuad == 1) {
			let prowler = new prowlers.Sprite();
			prowler.x = random(60, canvas.hw-25);
			prowler.y = random(60, canvas.hh-25);
		} else if (prowlQuad == 2) {
			let prowler = new prowlers.Sprite();
			prowler.x = random(canvas.hw+35, canvas.w-60);
			prowler.y = random(60, canvas.hh-35);
		} else if (prowlQuad == 3) {
			let prowler = new prowlers.Sprite();
			prowler.x = random(60, canvas.hw-35);
			prowler.y = random(canvas.hh+35, canvas.h-35)
		} else if (prowlQuad == 4) {
			let prowler = new prowlers.Sprite();
			prowler.x = random(canvas.hw+35, canvas.w-60);
			prowler.y = random(canvas.hh+35, canvas.h-35)
		} 

		prowlerNumb++; //counts # of prowlers
	}

	if (kb.pressing() && playing == true) {
		kbTime++;
	}

	if (kb.pressing(' ') && kbTime > 5 && playing == true) {
		charge = kbTime / 10; //long charge
	} else if (kb.pressed(' ') && kbTime <= 5 && playing == true) {
		if (activeZone != 4) { //moves quad
			activeZone++;
		} else activeZone = 1;
	}

	//actual zone moves
	if (activeZone == 1) {
		targetZone.x = canvas.w / 4;
		targetZone.y = canvas.h / 4;
	} else if (activeZone == 2) {
		targetZone.x = canvas.w * 3 / 4;
		targetZone.y = canvas.h / 4;
	} else if (activeZone == 3) {
		targetZone.x = canvas.w / 4;
		targetZone.y = canvas.h * 3 / 4;
	} else if (activeZone == 4) {
		targetZone.x = canvas.w * 3 / 4;
		targetZone.y = canvas.h * 3 / 4;
	}

	if (charge >= 1) { //turns on 1 by 1.
		lights[9].color = 'blue';
	}
	if (charge >= 2) {
		lights[8].color = 'blue';
	}
	if (charge >= 3) {
		lights[7].color = 'blue';
	}
	if (charge >= 4) {
		lights[6].color = 'blue';
	}
	if (charge >= 5) {
		lights[5].color = 'blue';
	}
	if (charge >= 6) {
		lights[4].color = 'blue';
	}
	if (charge >= 7) {
		lights[3].color = 'blue';
	} 
	if (charge >= 8) {
		lights[2].color = 'blue';
	}
	if (charge >= 9) {
		lights[1].color = 'blue';
	}
	if (charge >= 10) {
		lights[0].color = 'blue';
	}
	if (kb.released(' ') && charge >= 10) { //zaps
		text('test', 200, 400);
		charge = 0;
		targetZone.overlaps(prowlers, remover) 
	}

	if (kb.released(' ')) { //turns lights off
		kbTime = 0;
		lights.color = 'white';
		charge = 0;
	}

	if (timeLeft > 0) {
		timeLeft--;
	}

	if (timeLeft == 0) {
		playing = false;
		endScreen.opacity = 100;
		endScreen.text = "Thanks for playing Night Watch. Your Score is: " + score;
	}

	scoreboard.text = "Score: " + score; //update score
	timer.text = "Time Left: " + Math.round(timeLeft/30);
	// debugText();
}

function remover(targetZone, prowler){
	// if (charge >= 10) {
	prowler.remove();
	score++;
	prowlerNumb--;
	text('test',200,200);
	// }
}

function debugText() {
	text(randomSpawn, 60, 70);
	text(kb.space, 60, 90);
	text(kbTime, 90, 90);
	text(charge, 60, 110);
	text(prowlQuad, 60, 130);
	text(activeZone, 60, 150);
	text(score, 60, 170);
	text(prowlerNumb, 60, 190);
	text(levelNumb, 60, 210);
	text(fullCharged, 60, 230);
} 