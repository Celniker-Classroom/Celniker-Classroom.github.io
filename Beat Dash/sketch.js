//declare variables

let bar, zone, beats, rand, beat;
let cooldown = 0;
let right = 0;
let score = 0;
let i = 0;
let music;
let speed = 7;
let timer = 0;
let endCanvas;

function preload() {
	music = loadSound("cis.mp3");
}

function setup() {
	new Canvas(500, 800);

	//primary bar 

	bar = new Sprite(250, 650, 450, 20);
	bar.color = ("#4c00ff");
	bar.stroke = "black";
	bar.color.setAlpha(200);

	//secondary bar

	zone = new Sprite(250, 650, 450, 100);
	zone.color = ("#4c00ff");
	zone.stroke = "black";
	zone.color.setAlpha(50);

	//beat group

	beats = new Group();
	beats.x = 250;
	beats.y = -500;
	beats.width = 100;
	beats.height = 10;
	beats.color = ("#ffe100");
	beats.stroke = "black";
	beats.vel.y = speed;

	//loading the sound

	beats.overlaps(bar);
	beats.overlaps(zone);
	bar.overlaps(zone);


	music.play();
}


function draw() {
	background('skyblue');
	stroke("black");
	fill("black");

	if (timer < 7200) {
		textSize(50);
		text('Score: ' + score, 150, 70);
		textSize(10);
		text('Press space when the notes hit the bar to score points! ', 110, 760);
		text('Try to get as many points as possible before the song ends! ', 100, 780);

		rand = floor(random(0, 50));
		if (rand == 1 && cooldown == 0) {
			beat = new beats.Sprite();
			cooldown = 1;
			sleep(300).then(function () {
				cooldown = 0;
			})
		}

		//detect collisions

		if (kb.presses("space") && right == 0) {
			//changing bar color
			right = 1;
			if (bar.overlapping(beats)) {
				score += 2;
				bar.color = ("#FFD700");
			} else if (zone.overlapping(beats)) {
				score++;
				bar.color = ("#00f2ff");

			} else {
				bar.color = ("#abfff7");
			}

			sleep(150).then(function () {
				bar.color = ("#4c00ff");
				right = 0;
			})

			speed += 0.05;


		}
		beats.vel.y = speed;
		timer++;
	} else{
		endCanvas = 
		textSize(30);
		text('Final Score: ' + score + ". Good Job!", 10, 400);
	}


}

