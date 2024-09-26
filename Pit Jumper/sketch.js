let block, bottom, bottoms, platforms, text, grade, text1, text2;
let jump = 0;
let xloc = 1247.5;
let yloc = 1100;
let jCheck = 0;
let gameEnd = 0;
let renderx = 0;
let jumpSize = -6.05;

function setup() {
	new Canvas('fullscreen');
	world.gravity.y = 10;
	block = new Sprite(400, 875, 50, 50);// makes player
	block.strokeColor = block.color;
	platforms = new Group();// makes object player stands on
	platforms.color = 'black'; 
	platforms.collider = 's';
	platforms.friction = 0.0003;
	let base = new platforms.Sprite();
	base.y = 1100;
	base.x = -500
	base.w = 3500;
	base.h = 400;
	bottoms = new Group;
	bottom = new bottoms.Sprite(0, 1300, grade, 's');
	bottom.color = 'skyblue';
	block.rotationLock = true
	frameRate = 30;
	text = new Sprite(400, -200, 0, 0, 'n');
	text.text = 'Game Over';// makes text displayed when players lose or win
	text.textSize = 100;
	text1 = new Sprite(400, -200, 0, 0, 'n');
	text1.text = 'You Win';
	text1.textSize = 130;
	text2 = new Sprite(400, 500, 0, 0, 'n');
	text2.text = 'press space to play, overcome all 11 jumps to win, press 1 for easy mode(inceases jump height), 2 for hard mode';
	text2.textSize = 30;
	camera.x = block.x; //centers player on screen
	camera.y = block.y - 200;
	allSprites.autoCull = false; // makes platforms not disipear when the player is far away
}

function draw() {
	clear();
	background('skyblue');
	if (gameEnd == 1) {
		block.velocity.x = 5;
		if (block.collides(platforms)) {// resets player jump
			jumpe = 2;
		} else if (block.colliding(platforms)) {
			jump = 2;
		} else if (jump == 2) {//makes it so if you run of a platform without jumping you lose one jump
			jump = 1;
		}
		if (jump > 0 && kb.presses(' ')) {//makes player jump
			block.velocity.y = jumpSize;
			jump -= 1;
		}
		if (block.collides(bottoms)) {//checks if you lost
			gameEnd = 0;
			block.velocity.x = 0;
			block.velocity.y = 0;
			block.x = 400;
			block.y = 875;
			text.y = 400
			text2.y = 500
		}
		if (block.x >= xloc) {//checks if you won
			gameEnd = 0;
			block.velocity.x = 0;
			block.velocity.y = 0;
			block.x = 400;
			block.y = 875;
			text1.y = 400
			text2.y = 500
		}
		camera.x = block.x; //keeps player on screen
		camera.y = block.y - 200;
	} else if (kb.presses(' ')) {// restarts game
		gameEnd = 1;
		text.y = -200;
		text1.y = -200;
		text2.y = -200;
		platforms.remove();
		let base = new platforms.Sprite();
		base.y = 1100;
		base.x = -500
		base.w = 3500;
		base.h = 400;
		xloc = 1247.5;
		yloc = 1100;
		grade = [[1350, 0]];
		bottoms.remove();
		grade = [[1350, 0]];
		for (let i = 0; i < 10; i++) {//cretes random obstacles
			let obstacle = random(0, 3);
			if (obstacle >= 2) {
				challenge1();
			} else if (obstacle >= 1) {
				challenge2();
			} else if (obstacle >= 0) {
				challenge3();
			}
		}
		//  creates a final obstacle
		let platform = new platforms.Sprite(xloc + 50, yloc, 100, 400);//creates platform you walk on
		xloc += 100;
		let platform2 = new platforms.Sprite(xloc + 325, yloc + 205, 251, 200, 'n');
		let platform1 = new platforms.Sprite(xloc + 325, yloc - 145, 250, 600);
		let platform3 = new platforms.Sprite(xloc + 825, yloc + 555, 1250, 600);
		xloc += 800;
		grade.push([0, 655]);//creates game over line
		grade.push([1450, 0]);
		let bottom1 = new bottoms.Sprite(0, 1300, grade, 's');
		bottom1.color = 'skyblue';

	} else if (kb.presses('1')) {//changes difficulity
		jumpSize = -6.2
	} else if (kb.presses('2')) {//changes difficulity
		jumpSize = -6.05
	}
}

function challenge1() {//  creates a obstacle
	let platform = new platforms.Sprite(xloc + 50, yloc, 100, 400);//creates platform you walk on
	xloc += 100;
	let platform1 = new platforms.Sprite(xloc + 325, yloc - 100, 250, 600);
	xloc += 450;
	yloc -= 200;
	grade.push([550, 0]);//creates game over line
	grade.push([0, -200]);
}
function challenge2() {//  creates a obstacle
	let platform = new platforms.Sprite(xloc + 50, yloc, 100, 400);//creates platform you walk on
	xloc += 100;
	let platform1 = new platforms.Sprite(xloc + 1000, yloc + 80, 380, 400);
	xloc += 1190;
	yloc += 80;
	grade.push([0, 80]);
	grade.push([1290, 0]);//creates game over line
}
function challenge3() {//  creates a obstacle
	let platform = new platforms.Sprite(xloc + 50, yloc, 100, 400);//creates platform you walk on
	xloc += 100;
	let platform1 = new platforms.Sprite(xloc + 800, yloc - 50, 300, 500);
	xloc += 950;
	yloc -= 100;
	grade.push([1050, 0]);//creates game over line
	grade.push([0, -100]);
}