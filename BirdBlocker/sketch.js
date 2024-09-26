// import { Score } from "p5";

let line, plane, bird;
let i;
let diffuculty = 100;
let time = -1;
let score = 0;
let number = 0;
let boarder;
let life = 3;
let lives;
let lose;
let win;
let randomX;
let randomY;
let right;
let left;
let speed = 0;
let instructiions;
function setup() {
	new Canvas(600, 900);
	i = 60//declares that i is 60 once which helps fix a glitch in the game

	line = new Sprite(300, 850, 500, 10);//makes line at the bottom
	line.stroke = 'red';
	line.fill = 'red';
	line.collider = 'static'

	boarder = new Sprite(300, 950, 1000, 10);//makes bottom boarder
	boarder.collider = 'static'

	score = new Sprite(520, 17, 10, 10)//makes socre
	score.textSize = 30
	score.collider = 'no'
	score.color = 'skyblue'
	score.stroke = 'skyblue'

	right = new Sprite(460, 15, 10, 10)//makes socre text
	right.text = 'Score:'
	right.textSize = 30
	right.collider = 'no'
	right.color = 'skyblue'
	right.stroke = 'skyblue'


	lives = new Sprite(100, 16, 10, 10)//makes lifes text
	lives.textSize = 30
	lives.collider = 'no'
	lives.color = 'skyblue'
	lives.stroke = 'skyblue'

	left = new Sprite(50, 15, 10, 10)//makes lifes
	left.text = 'Lives: '
	left.textSize = 30
	left.collider = 'no'
	left.color = 'skyblue'
	left.stroke = 'skyblue'
}

async function draw() {
	background('skyblue');
	score.text = number
	lives.text = life
	randomY = random(200, 850)

	// if(time == 1){//makes line's y random
	// 	line.y = randomY
	// }


	if (kb.presses(' ')) {//makes it so that if you hold the space bar it makes the line intangable
		line.collider = 'no'
	}

	if (kb.presses(' ')) {//makes it so that if you hold the space bar it makes the line green
		line.stroke = 'green'
		line.fill = 'green'
	}

	if (kb.releases(' ')) {//makes it so that if you hold the space bar it makes the line red
		line.stroke = 'red'
		line.fill = 'red'
	}



	if (time == -1) {//makes instructiions
		instructiions = new Sprite();
		instructiions.collider = 'no'
		instructiions.d = 1
		instructiions.stroke = 'skyblue'
		instructiions.text = 'Hold the Space Bar When There is a Bird and Release When There is a Plane to Get a Higher Score'
		instructiions.textSize= 12
}


	if (time == 99) {//makes instructiions disapeer
		instructiions.x = 100000
	}


	if (kb.releases(' ')) {//makes it   so the bar is static when released
		line.collider = 'static'
	}
	time += 1

	if (time == 101) {
		time = 0
	}



	if (time == 100) {//makes something spawn after a set amount of time

		
		randomX = random(100, 500)




		if (i <= 40) {//makes a 40% chance of a plane(enemy) spawing at the top
			plane = new Sprite(randomX, -30, 50)
			plane.fill = 'skyblue'
			plane.stroke = 'skyblue'
			plane.text = '‍✈️'
			plane.textSize = 50
			plane.velocity.y = 25 + speed
		};


		if (i >= 41) {//makes a 60% chance of a bird spawing at the top
			bird = new Sprite(randomX, -30, 50)
			bird.fill = 'skyblue'
			bird.stroke = 'skyblue'
			bird.text = '🦅'
			bird.textSize = 50
			bird.velocity.y = 25 + speed
		};
		i = random(diffuculty);
	}



	if (bird.collided(boarder)) {//makes bird dissapear when hit the boarder
		bird.x = 10000
	}


	if (bird.collided(boarder)) {//makes score increase when bird hits the boarder
		number += 1
	}


	if (bird.collided(line)) {//removes a life if a bird hits the line
		life -= 1
	}

	if (bird.collided(line)) {//removes bird if hits the line
		bird.x = 10000
	}

	if (plane.collided(boarder)) {//removes a life if plane hits the line
		life -= 1
	}


	if (life == 0) {// show you lose when you get 0 lives
		lose = new Sprite(300, 450, 10, 10)
		lose.text = 'You Lose'
		lose.textSize = 30
		lose.collider = 'no'
		lose.color = 'skyblue'
		lose.stroke = 'skyblue'

	}
	if (plane.collided(line)) {//makes score increase if  plane hits the line
		number += 1
	}



	if (plane.collided(line)) {//makes plane collide if hits the line
		plane.x = 10000
	}

	if (life == 0) {
		time = 102
	}



	if (plane.collided(boarder)) {//makes plane collide if hits the boarder
		plane.x = 1000
	}



	if (life <= 0) {//keeps score from messing up if you lose
		life = 0
	}


	if (number == 1000) {// show you win when you get 1000 score
		win = new Sprite(300, 450, 10, 10)
		win.text = 'You Win'
		win.textSize = 30
		win.collider = 'no'
		win.color = 'skyblue'
		win.stroke = 'skyblue'
	}
	if(number == 1001){
		win.x= 10000
	}
	// if (number == 1000){//stops the game if you get 1000 points
	// 	time = 102
	// }

	// if(number >= 1000){
	// 	number = 1000
	// }



	if (number == 10) {//speeds up the plane and bird when reach a certain score
		speed += .01
	}



	if (number == 15) {//speeds up the plane and bird when reach a certain score
		speed += .01
	}



	if (number == 25) {//speeds up the plane and bird when reach a certain score
		speed += .01
	}



	if (number == 30) {//speeds up the plane and bird when reach a certain score
		speed += .01
	}



	if (number == 35) {//speeds up the plane and bird when reach a certain score
		speed += .01
	}

	if (number == 40) {//speeds up the plane and bird when reach a certain score
		speed += .01
	}



	if (number == 45) {//speeds up the plane and bird when reach a certain score
		speed += .01
	}



	if (number == 50) {//speeds up the plane and bird when reach a certain score
		speed += .01
	}



	if (number == 55) {//speeds up the plane and bird when reach a certain score
		speed += .01
	}



	if (number == 60) {//speeds up the plane and bird when reach a certain score
		speed += .01
	}

	if (number == 65) {//speeds up the plane and bird when reach a certain score
		speed += .01
	}



	if (number == 70) {//speeds up the plane and bird when reach a certain score
		speed += .01
	}



	if (number == 75) {//speeds up the plane and bird when reach a certain score
		speed += .01
	}



	if (number == 80) {//speeds up the plane and bird when reach a certain score
		speed += .01
	}



	if (number == 85) {//speeds up the plane and bird when reach a certain score
		speed += .01
	}

	if (number == 90) {//speeds up the plane and bird when reach a certain score
		speed += .01
	}

	if (number == 95) {//speeds up the plane and bird when reach a certain score
		speed += .01
	}
}
