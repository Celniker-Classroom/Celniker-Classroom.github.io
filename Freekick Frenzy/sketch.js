let floor, man, ball, beginningScreen, score, goalPost, goalCrossbar, inPlay, kicking, goal, scoreboard, cooldown, lives, livesCounter, gameOver, specialGuest, highScore, highScoreCounter;

//Sprites for the man
let kickingMan = `
.....bbb..
....bbbbb.
....bbbbb.
....bbbbb.
.....bbb..
......b...
.....bbb..
....bbbbb.
...bb.b.bb
...b..b..b
...b..b..b
......b...
......b...
...bbb.b..
.bbb...bb.
bb......b.
.........b
`

let idleMan = `
..bbb..
.bbbbb.
.bbbbb.
.bbbbb.
..bbb..
...b...
..bbb..
.bbbbb.
bb.b.bb
b..b..b
b..b..b
...b...
..b.b..
.bb.bb.
.b...b.
.b...b.
.b...b.
`


function setup() {
	new Canvas(1000, 600);
	floor = new Sprite(500, 590, 1000, 30, 'static');
	floor.color = '#009e1a'
	//the floor 
	inPlay = 0;
	//says the ball is ready for play at the beginning

	goalPost = new Sprite(215, 460, 30, 230, 'none');
	goalPost.color = '#404040';

	//Some basic variables that must be assigned before the program runs
	kicking = 0;
	score = 0;
	lives = 3;
	highScore = 0;

	cooldown = 0;
	//world gravity
	world.gravity.y = 8;

	//sets up scoreboard and lives counter
	scoreboard = new Sprite(60, 200, 100, 30, 'none');
	scoreboard.text = "Score: " + score;
	livesCounter = new Sprite(60, 250, 100, 30, 'none');
	highScoreCounter = new Sprite(900, 50, 100, 30, 'none');
	scoreboard.color = '#a3a3a3';
	livesCounter.color = '#a3a3a3';
	highScoreCounter.color = '#a3a3a3';


	//Creating the man 
	man = new Sprite(580, 540, 30, 100, 'd');
	man.img = spriteArt(idleMan, 6);
	man.mass = 50;



	//Creation of the ball
	ball = new Sprite(2000, 100, 30, 'k');
	ball.img = 'images/football.png';
	ball.image.scale = 0.025;

	//Creation of the goal
	goal = new Sprite(50, 475, 300, 200, "none");
	goal.color = 'lightGreen';
	goal.opacity = 0.5;
	goal.img = 'images/net texture.jpg'
	goal.image.scale = 0.6;
	goal.image.offset.y = -15;
	goalCrossbar = new Sprite(80, 350, 300, 30, 'none');
	goalCrossbar.color = '#404040';

	//Creation of the game over screen
	gameOver = new Sprite(1500, 300, 1000, 600, 'none');
	gameOver.color = 'red';
	gameOver.opacity = 0.5
	gameOver.text = 'Game over!\n Click to start a new game.';
	gameOver.textSize = 50;
	gameOver.textColor = 'black';

	//Creating beginning screen
	beginningScreen = new Sprite (500, 300, 800, 400, 'none');
	beginningScreen.text = 'Welcome to Freekick Frenzy\nClick to begin. Then, click to kick.'
	beginningScreen.textSize = 40;
	beginningScreen.color = '#878787';
	beginningScreen.opacity = 0.9;

	//easter egg
	specialGuest = new Sprite(800, 300);
	specialGuest.opacity = 0;
}

function draw() {
	//background
	background('skyblue');
	//Scoreboard handlers
	livesCounter.text = "Lives: " + lives;
	scoreboard.text = "Score: " + score;
	highScoreCounter.text = 'High score: ' + highScore;
	//Easy high score determiner
	if (score > highScore){
		highScore = score;
	} 

	//instead of creating a new ball, ball is  transported 
	if (inPlay == 0) {
		if (mouse.presses()) {
			lives = 3;
			score = 0;
			gameOver.x = 1500;
			beginningScreen.x = 1500;
			specialGuest.opacity = 0;
			ballGo();
		}
		if (ball.speed > 0) {
			inPlay = 1;
		}
	}

	//If you have lives
	if (lives > 0) {
		if (inPlay == 1) { //If the game is in play

			if (cooldown == 0) { //If you aren't in cooldown
				if (kicking < 0.3) {//If you have been kicking for less than the maximum time

					if (mouse.pressing()) {//If mouse is pressing
						kicking += 0.01;//Triggers kicking state
						man.img = spriteArt(kickingMan, 6);//Changes sprite for man
					}
					else {
						kicking = 0;//No kicking
						man.img = spriteArt(idleMan, 6);//Norman sprite for man
					}
				} else {//If you've been kicking for more than the maximum time
					cooldown = 3;//Cooldown 
					kicking = 0;//Kicking back to 0
					man.img = spriteArt(idleMan, 6);
				}
			}
			
			//Handles cooldown
			if (cooldown > 0) {
				cooldown -= 0.05;
			} else if (cooldown < 0) {
				cooldown = 0;
			}
			
			//Handles movement of the ball when kicking
			if (ball.colliding(man) && kicking > 0) {
				ball.speed = 0;
				ball.direction = 210;
				ball.speed = random (10, 13);
			}

		}

		//If ball is colliding with floor (not in goal), handles losing a life and resetting the ball
		if ((ball.x >= 800 && ball.y >= 559) || (ball.x <= 300 && ball.y >= 559)) {
			ball.speed = 0;
			if (ball.colliding(floor) > 120) {
				lives--;
				if (lives > 0) {
					ballGo();
				} else {
					ball.x = 2000;
					ball.y = 100;
					ball.collider = 'k';
					gameOver.x = 500;
					inPlay = 0;
				}
			}
		}


		//GOAALLLLLLL
		if (ball.x < -20) {
			score++;
			ball.x = 50;
			ball.y = 50;
			ball.speed = 6;
			ball.direction = 0;
		}
	}

	//Easter egg 🤫
	if (score == 30){
		specialGuest.img = 'images/aura.png';
		specialGuest.image.scale = 0.2;
		specialGuest.opacity = 1;

	} else if (score == 20){
		specialGuest.img = 'images/cold.png';
		specialGuest.image.scale = 0.3;
		specialGuest.opacity = 1;

	} else {
		specialGuest.opacity = 0;
	}


	//Handler for resetting the ball
	function ballGo() {
		inPlay = 1;
		ball.y = 50;
		ball.x = 50;
		ball.collider = 'd';
		ball.speed = 6;
	}

}