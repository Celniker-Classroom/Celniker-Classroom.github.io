// Declare sprites and groups
let player;
let floor;
let floor2;
let ceiling;
let ceiling2;
let clouds;
let enemyParticles;
let airplanes;
let grass;

// Initialize vars
let points = 0;
let StartPos;
let highscore = 0;

// Initialize fonts
let NotoSans;

// Initialize camera logic
let cameraFocus = {};
let cameraRenderPoint = { x: 0, y: 0 };
let cameraOffset = { x: 0, y: 0 };
let startingPoint = {};
let cameraShake = 0;

// Initialize game variables
let playerLost = false;
let playerHitCeiling = false;
let cloudsGenerated = false;

// Initialize mobile controls
let touchFrames = 0;
let isTouching = false;
let ua = navigator.userAgent;
let isMobile = /Mobi|Android/i.test(ua);

// Initialize control logic
let pressFrameCount = 8;
let lossFrame = 0;

let Cookies = {};

// Initialize image database
let imageDatabase = {};

let spriteArtDatabase = {
	"cloud": `..........bbbb
........bbwwwwbb
.......bwwwwwwwwb
.......bwwwwwwwwb...bbb
......bwwwwwwwwwwb.bwwwb
..bbb.bwwwwwwwwwwwbwwwwwb
.bwwwbwswwwwwwwwwswwwwwwwb
bswwwwwwswwwwwwwswwwwwwwsb
bsswwwwwsswwwwwsswwwwwwssb
bssssssssssssssssssssssssb
.bbbbbbbbbbbbbbbbbbbbbbbb`,
	"enemyFaceRight": `bbbbbbbbbbbb
brrrrrrrrrrb
brrrrrrrbrrb
brrrrrrrrbrb
brrrrrrrrrrb
brrrrrrbbbrb
brrrrrrbbbrb
brrrrrrbbbrb
brrrrrrrrrrb
brrrrbbbbbbb
brrrrrrrrrrb
bbbbbbbbbbbb`,
	"enemyFaceLeft": `bbbbbbbbbbbb
brrrrrrrrrrb
brrbrrrrrrrb
brbrrrrrrrrb
brrrrrrrrrrb
brbbbrrrrrrb
brbbbrrrrrrb
brbbbrrrrrrb
brrrrrrrrrrb
bbbbbbbrrrrb
brrrrrrrrrrb
bbbbbbbbbbbb`,
	"airplane": `....................bb
...................bwwb
..................bwwwb
...bbbbbbbbbbbbbbbwwwwb
..bwwwwwwwwwwwwwwwbbbb
.bbbbwbwbwbwbwbwwwbwwb
bbwwwwwwwwwwwwwwwb.bb
bbwwwwwwbbbbbbwwb
bbbbbbbbbwwwwbbb
.........bwwwb
..........bwwb
...........bb`,
	"grass": `......gg
......gg
......gg
..g...gg
..g...gg
..g...ggg
..g...ggg
..gg..ggg.gg
..ggg.ggg.gg
..ggg.ggg.gg
..ggg.ggg.gg
..gg..ggg.ggg
.ggg..gg..ggg
.ggg.ggg..ggg
.ggg.ggg.gggg
.ggg.ggg.ggg
.ggg.ggg.gggg
.gggggggggggg
.gggggggggggg
ggggggggggggg
ggggggggggggg`,
	"player": `bbbbbbbbbbbb
bwwwwwwwwwwb
bwwwwwwwwwwb
bwwwbbwwbbwb
bwwwbbwwbbwb
bwwwwwwwwwwb
bwwwwwwwwwwb
bwwwbbbbbbbb
bwwwbbbbbbbb
bwwwwwwwwwwb
bwwwwwwwwwwb
bbbbbbbbbbbb`
};

let tips = [
	"Do not go to outer space as you will die from asphyxiation.",
	"You can rest on clouds, but not the ground.",
	"Avoid red enemies. Be careful not to collide with planes, too.",
	"Your secret weapon is your courage and determination.",
	"Keep persevering and you'll beat the world one day.",
	"Hold down the spacebar (or tap + hold) to travel faster and higher.",
	"Can you try and beat my high score of 1147030?"
];
let tip;

let backgroundMultiplier;

function preload() {
	NotoSans = loadFont('Fonts/Noto_Sans/NotoSans-VariableFont_wdth,wght.ttf');

	// Images
	imageDatabase.explosion = loadImage('Images/explosion.png');
	imageDatabase.enemyRight = spriteArt(spriteArtDatabase.enemyFaceRight, 2);
	imageDatabase.enemyLeft = spriteArt(spriteArtDatabase.enemyFaceLeft, 2);
}

function setup() {
	new Canvas(windowWidth, windowHeight, 'pixelated x8');

	//GetCookies();

	world.gravity.y = 10;

	floor = new Sprite();
	floor.collider = 'k';
	floor.y = windowHeight + 500;
	floor.h = 1000;
	floor.w = windowWidth * 2;
	floor.color = 'green';

	floor2 = new Sprite();
	floor2.collider = 'k';
	floor2.y = windowHeight + 500;
	floor2.h = 1000;
	floor2.w = windowWidth * 2;
	floor2.color = 'green';

	ceiling = new Sprite();
	ceiling.collider = 'n';
	ceiling.y = -7500;
	ceiling.h = 1000;
	ceiling.w = windowWidth * 2;
	ceiling.color = color(0, 0, 0);

	ceiling2 = new Sprite();
	ceiling2.collider = 'n';
	ceiling2.y = -7500;
	ceiling2.h = 1000;
	ceiling2.w = windowWidth * 2;
	ceiling2.color = color(0, 0, 0);

	clouds = new Group();
	clouds.collider = 'k';

	enemyParticles = new Group();
	enemyParticles.w = 24;
	enemyParticles.h = 24;
	enemyParticles.color = 'red';
	enemyParticles.collider = 'd';

	airplanes = new Group();
	airplanes.w = 8 * 23;
	airplanes.h = 8 * 12;
	airplanes.img = spriteArt(spriteArtDatabase.airplane, 8);
	airplanes.collider = 'k';
	airplanes.vel.x = -3;

	// grass = new Group();
	// grass.x = 0;
	// grass.y = windowHeight - (21 * 4);
	// grass.collider = 'n';
	// grass.img = spriteArt(spriteArtDatabase.grass, 4);

	// for (let i = 0; i < 4000; i+= (13 * 4)) {
	// 	let grassSprite = new grass.Sprite();
	// 	grassSprite.x = (grass.x + (13 * 2)) + i;
	// 	grassSprite.y = (grass.y + (21 * 2));
	// }

	player = new Sprite();
	player.w = 48;
	player.h = 48;
	player.y = (floor.y - (floor.h / 2)) + 24;
	startingPoint.x = player.x;
	startingPoint.y = player.y;
	player.color = color(255, 255, 255);
	StartPos = player.x;
	player.rotationLock = true;
	player.img = spriteArt(spriteArtDatabase.player, 4);

	allSprites.autoCull = false;
	allSprites.pixelPerfect = true;
	tip = random(tips);
}

function RectScale(x, y, w, h) {
	return rect(windowWidth * x, windowHeight * y, windowWidth * w, windowHeight * h);
}

function UpdateCookies() {
	document.cookie = JSON.stringify(Cookies);
}

function GetCookies() {
	if (document.cookie != "") {
		Cookies = JSON.parse(document.cookie);
		return Cookies;
	}
}

function draw() {
	if (!playerLost) {
		backgroundMultiplier = ((7500 + player.y) / 7500);
	}

	if (playerHitCeiling) {
		backgroundMultiplier = 0;
	}

	background(135 * backgroundMultiplier, 206 * backgroundMultiplier, 235 * backgroundMultiplier);

	ceiling.color = color(135 * backgroundMultiplier, 206 * backgroundMultiplier, 235 * backgroundMultiplier);
	ceiling2.color = color(135 * backgroundMultiplier, 206 * backgroundMultiplier, 235 * backgroundMultiplier);

	if (kb.space % Math.round(pressFrameCount) == 1 || touchFrames % Math.round(pressFrameCount) == 1) {
		if (playerLost && (kb.presses() || touchFrames == 1) && frameCount >= lossFrame + 30) {
			tip = random(tips);

			playerHitCeiling = false;
			playerLost = false;
			initializePlayer();
			points = 0;

			clouds.removeAll();
			enemyParticles.removeAll();
			airplanes.removeAll();

			cameraRenderPoint.x = startingPoint.x;
			cameraRenderPoint.y = startingPoint.y;
		} else {
			if (player.vel.y > -1) {
				player.vel.y = -7;
			} else {
				player.vel.y = player.vel.y * 1.3;
			}

			if (player.vel.x <= Math.abs(player.vel.y)) {
				player.vel.x = Math.abs(player.vel.y) * 2;
			}

			if (pressFrameCount > 3) {
				pressFrameCount -= 1;
			}
		}
	} else {
		pressFrameCount = 8;
	}

	// Random obstacle generation
	if ((points % 4000 >= 1 && points % 4000 <= 100)) {
		if (!cloudsGenerated) {
			cloudsGenerated = true;

			// Clouds
			for (let i = 1; i <= 4; i++) {
				let cloud = new clouds.Sprite();
				cloud.x = random(player.x + 1000, player.x + 7000);
				cloud.y = random(-750, -200);
				cloud.w = 26 * 8;
				cloud.h = 1 * 8;
				cloud.img = spriteArt(spriteArtDatabase.cloud, 8);

				if (cloud.overlapping(clouds)) {
					cloud.remove();
				}
			}

			// Enemies
			for (let i = 1; i <= 20; i++) {
				let enemy = new enemyParticles.Sprite();
				enemy.x = random(player.x + 1000, player.x + 7000);
				enemy.y = random(-7300, 400);
				enemy.img = imageDatabase.enemyRight;
				enemy.rotationLock = true;
			}

			// Airplanes
			if (Math.round(random(1, 3)) == 1) {
				let randNumber = Math.round(random(2, 4));

				for (let i = 1; i <= randNumber; i++) {
					let plane = new airplanes.Sprite();
					plane.x = random(player.x + 1000, player.x + 7000);
					plane.y = random(-3500, -200);
				}
			}
		}
	} else {
		cloudsGenerated = false;
	}

	if (!playerLost) {
		cameraFocus.x = player.x;
		cameraFocus.y = player.y;
		if (points < (player.x - StartPos)) {
			points = Math.round(player.x - StartPos);
		}

		if (points < 0) {
			points = 0;
		}

		if (highscore < points) {
			highscore = points;
		}
	}

	for (let i of airplanes) {
		if (i.colliding(player) || i.colliding(enemyParticles)) {
			i.img = imageDatabase.explosion;
			i.vel.x = 0;
		}
	}

	for (let i of enemyParticles) {
		if (Math.sqrt(Math.pow(i.x - player.x, 2) + Math.pow(i.y - player.y, 2)) < 1500) {
			i.attractTo(player, 15);
		} else {
			i.sleeping = true;
		}

		if (i.vel.x > 0) i.img = imageDatabase.enemyRight;
		else if (i.vel.x < 0) i.img = imageDatabase.enemyLeft;

		if (Math.abs(i.x - camera.x) > 6000) {
			i.remove();
		}

		if (i.colliding(airplanes)) {
			i.remove();
		}
	}

	for (let i of clouds) {
		i.vel.x = 1;

		if (Math.abs(i.x - camera.x) > 6000) {
			i.remove();
		}
	}

	if ((player.colliding(floor) && points > 50) || player.overlapping(ceiling) || player.overlapping(enemyParticles) || player.colliding(airplanes)) {
		playerLost = true;
		lossFrame = frameCount;
		cameraShake = 100;

		if (player.overlapping(ceiling)) playerHitCeiling = true;

		for (let i = 0; i < 20; i++) {
			let newObject = new Sprite();
			newObject.x = player.x;
			newObject.y = player.y;
			newObject.w = 4;
			newObject.h = 4;
			newObject.color = player.color;
			newObject.speed = random(5, 20);
			newObject.direction = random(0, 359);
			newObject.life = 180;
		}

		player.remove();
	}

	floor.w = windowWidth * 2;

	floor.x = cameraFocus.x;
	floor2.x = camera.x;

	ceiling.x = cameraFocus.x;
	ceiling2.x = camera.x;

	cameraRenderPoint.x = lerp(cameraRenderPoint.x, cameraFocus.x, 0.2);
	cameraRenderPoint.y = lerp(cameraRenderPoint.y, cameraFocus.y, 0.2);

	if (cameraShake >= 1) {
		cameraOffset.x = random(-Math.round(cameraShake), Math.round(cameraShake));
		cameraOffset.y = random(-Math.round(cameraShake), Math.round(cameraShake));
	} else {
		cameraOffset.x = 0;
		cameraOffset.y = 0;
	}

	cameraShake = lerp(cameraShake, 0, 0.125);

	camera.off();

	camera.x = cameraRenderPoint.x + cameraOffset.x;
	camera.y = cameraRenderPoint.y + cameraOffset.y;

	camera.on();

	strokeWeight(1);
	allSprites.draw();

	camera.off();

	update();

	camera.on();

	if (isTouching) {
		touchFrames += 1;
	} else {
		touchFrames = 0;
	}

	if (isTouching) {
		isMobile = true;
	} else if (kb.pressing('space')) {
		isMobile = false;
	}
}

// Update UI
function update() {
	textSize(75);
	fill(255, 255, 255);
	textAlign(CENTER, CENTER)
	textFont(NotoSans);
	textStyle(BOLD);
	strokeWeight(3);
	stroke(0, 0, 0);
	text(points, windowWidth / 2, 50);
	strokeWeight(0);

	if (playerLost) {
		textSize(50);
		strokeWeight(3);
		if (isMobile) text("Click/tap anywhere to replay", windowWidth / 2, 125);
		else text("Press [SPACE] to replay", windowWidth / 2, 125);
		textSize(40);
		text("Best score: ".concat(highscore), windowWidth / 2, 175);
		textSize(25);
		text("Just keep trying. You'll beat the world record one day.", windowWidth / 2, windowHeight - 50);
		strokeWeight(0);
	} else if (points == 0) {
		textSize(50);
		strokeWeight(3);
		if (isMobile) text("Click/tap anywhere to jump", windowWidth / 2, 125);
		else text("Press [SPACE] to jump", windowWidth / 2, 125);

		if (highscore > 0) {
			textSize(40);
			text("Best score: ".concat(highscore), windowWidth / 2, 175);
		}

		textSize(25);
		text("Pro Tip: ".concat(tip), windowWidth / 2, windowHeight - 50);
		strokeWeight(0);
	}
}

// Mobile touch logic
function touchStarted() {
	isTouching = true;
}

function touchEnded() {
	isTouching = false;
}

// Initialize player
function initializePlayer() {
	player = new Sprite();
	player.w = 48;
	player.h = 48;
	player.x = startingPoint.x;
	player.y = startingPoint.y;
	player.color = color(255, 255, 255);
	player.rotationLock = true;
	player.img = spriteArt(spriteArtDatabase.player, 4);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}